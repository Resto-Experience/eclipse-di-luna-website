import nodemailer from 'nodemailer';
import type { Attachment } from 'nodemailer/lib/mailer';

let cachedTransport: nodemailer.Transporter | null = null;

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

function getTransport(): nodemailer.Transporter {
  if (cachedTransport) return cachedTransport;
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT || 465);
  cachedTransport = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user: requireEnv('SMTP_USER'),
      pass: requireEnv('SMTP_PASS'),
    },
  });
  return cachedTransport;
}

export type SendArgs = {
  to: string;
  subject: string;
  replyTo?: string;
  text: string;
  html: string;
  attachments?: Attachment[];
};

export async function sendMail({ to, subject, replyTo, text, html, attachments }: SendArgs) {
  const transport = getTransport();
  const from = process.env.SMTP_FROM || requireEnv('SMTP_USER');
  return transport.sendMail({ from, to, replyTo, subject, text, html, attachments });
}

// Resolves the destination per form. Falls back to MAIL_TO_FALLBACK if a per-form var
// is not set so the user can switch destinations from Vercel without redeploying.
export function destinationFor(formKey: 'contact' | 'catering' | 'jobs' | 'proposal'): string {
  const map: Record<string, string | undefined> = {
    contact: process.env.MAIL_TO_CONTACT,
    catering: process.env.MAIL_TO_CATERING,
    jobs: process.env.MAIL_TO_JOBS,
    proposal: process.env.MAIL_TO_PROPOSAL,
  };
  const dest = map[formKey] || process.env.MAIL_TO_FALLBACK;
  if (!dest) throw new Error(`No destination configured for form "${formKey}". Set MAIL_TO_${formKey.toUpperCase()} or MAIL_TO_FALLBACK.`);
  return dest;
}

// Renders a key/value list as a simple HTML table + plaintext fallback.
export function renderSubmission(title: string, fields: Record<string, string | undefined>): { html: string; text: string } {
  const rows = Object.entries(fields)
    .filter(([, v]) => v != null && v !== '')
    .map(([k, v]) => ({ k, v: String(v) }));

  const text = [
    title,
    '─'.repeat(40),
    ...rows.map(({ k, v }) => `${k}: ${v}`),
  ].join('\n');

  const html = `<!doctype html><html><body style="font-family:-apple-system,Helvetica,Arial,sans-serif;color:#1a1a1a;background:#f6f6f6;margin:0;padding:24px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.06)">
      <tr><td style="padding:20px 24px;background:#3C1816;color:#F4CE9F;font-size:16px;font-weight:600">${escapeHtml(title)}</td></tr>
      <tr><td style="padding:20px 24px">
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
          ${rows
            .map(
              ({ k, v }) => `<tr>
              <td style="padding:8px 12px 8px 0;color:#6C4627;font-size:13px;vertical-align:top;width:160px">${escapeHtml(k)}</td>
              <td style="padding:8px 0;color:#1a1a1a;font-size:14px;white-space:pre-wrap;word-break:break-word">${escapeHtml(v)}</td>
            </tr>`
            )
            .join('')}
        </table>
      </td></tr>
    </table>
  </body></html>`;

  return { html, text };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
