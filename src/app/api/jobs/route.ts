import { NextResponse } from 'next/server';
import { sendMail, destinationFor, renderSubmission } from '@/lib/mailer';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import {
  collectErrors,
  validateRequired,
  validateEmail,
  validatePhone,
  validateMessage,
  isBot,
} from '@/lib/form-validation';

export const runtime = 'nodejs';

const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB per file
const MAX_TOTAL_BYTES = 15 * 1024 * 1024; // 15 MB total

export async function POST(req: Request) {
  const rl = checkRateLimit(getClientIp(req));
  if (!rl.ok) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429, headers: { 'Retry-After': String(rl.retryAfter) } });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
  }

  if (isBot(formData)) return NextResponse.json({ ok: true });

  const get = (k: string) => {
    const v = formData.get(k);
    return typeof v === 'string' ? v : '';
  };

  const firstName = get('firstName');
  const lastName = get('lastName');
  const email = get('email');
  const phone = get('phone');
  const location = get('location');
  const experience = get('experience');
  const applyingFor = get('applyingFor');
  const coverLetter = get('coverLetter');

  const errors = collectErrors(
    validateRequired(firstName, 'firstName'),
    validateRequired(lastName, 'lastName'),
    validateEmail(email),
    validatePhone(phone),
    validateRequired(location, 'location'),
    validateMessage(experience, 'experience'),
    validateRequired(applyingFor, 'applyingFor'),
  );
  if (errors.length) return NextResponse.json({ error: 'Validation failed', errors }, { status: 400 });

  // Files
  const attachments: { filename: string; content: Buffer; contentType: string }[] = [];
  let total = 0;
  for (const field of ['resume', 'photo'] as const) {
    const f = formData.get(field);
    if (f && f instanceof File && f.size > 0) {
      if (f.size > MAX_FILE_BYTES) {
        return NextResponse.json({ error: `${field} exceeds 5 MB` }, { status: 400 });
      }
      total += f.size;
      if (total > MAX_TOTAL_BYTES) {
        return NextResponse.json({ error: 'Attachments exceed 15 MB total' }, { status: 400 });
      }
      const buf = Buffer.from(await f.arrayBuffer());
      attachments.push({ filename: f.name, content: buf, contentType: f.type || 'application/octet-stream' });
    }
  }

  const fullName = `${firstName} ${lastName}`.trim();
  const { html, text } = renderSubmission('Job application — Eclipse di Luna', {
    Name: fullName,
    Email: email,
    Phone: phone,
    Location: location,
    'Applying For': applyingFor,
    Experience: experience,
    'Cover Letter': coverLetter,
    Attachments: attachments.map((a) => a.filename).join(', ') || '(none)',
  });

  try {
    await sendMail({
      to: destinationFor('jobs'),
      subject: `[Jobs] ${fullName} — ${applyingFor} @ ${location}`,
      replyTo: email,
      text,
      html,
      attachments,
    });
  } catch (err) {
    console.error('jobs mail failed', err);
    return NextResponse.json({ error: 'Mail send failed' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
