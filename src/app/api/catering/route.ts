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

export async function POST(req: Request) {
  const rl = checkRateLimit(getClientIp(req));
  if (!rl.ok) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429, headers: { 'Retry-After': String(rl.retryAfter) } });
  }

  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (isBot(body)) return NextResponse.json({ ok: true });

  const errors = collectErrors(
    validateRequired(body.firstName, 'firstName'),
    validateRequired(body.lastName, 'lastName'),
    validateEmail(body.email),
    validatePhone(body.phone),
    validateRequired(body.guests, 'guests'),
    validateRequired(body.eventType, 'eventType'),
    validateRequired(body.location, 'location'),
    validateMessage(body.message),
  );
  if (errors.length) return NextResponse.json({ error: 'Validation failed', errors }, { status: 400 });

  const fullName = `${body.firstName} ${body.lastName}`.trim();
  const { html, text } = renderSubmission('Catering inquiry — Eclipse di Luna', {
    Name: fullName,
    Email: body.email,
    Phone: body.phone,
    'Number of Guests': body.guests,
    'Event Type': body.eventType,
    Location: body.location,
    'Additional Info': body.message,
  });

  try {
    await sendMail({
      to: destinationFor('catering'),
      subject: `[Catering] ${fullName} — ${body.eventType} @ ${body.location}`,
      replyTo: body.email,
      text,
      html,
    });
  } catch (err) {
    console.error('catering mail failed', err);
    return NextResponse.json({ error: 'Mail send failed' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
