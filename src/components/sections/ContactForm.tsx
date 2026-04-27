'use client';

import { useState } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { getAllLocations } from '@/data/locations';
import { Field, SelectField, TextareaField, SubmitButton, Honeypot, FormError } from './FormFields';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const locations = getAllLocations();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        const fields = data?.errors?.map((e: { field: string; message: string }) => `${e.field}: ${e.message}`).join(' · ');
        throw new Error(fields || data?.error || 'Something went wrong');
      }
      e.currentTarget.reset();
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Reveal variant="fade-up" duration={700}>
        <div className="flex flex-col items-center text-center mx-auto" style={{ marginBottom: '32px' }}>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(32px, 4vw, 48px)',
              lineHeight: '44px',
              fontWeight: 400,
              color: '#333333',
              margin: '0 0 16px',
            }}
          >
            Let&rsquo;s Stay Connected
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(18px, 2.2vw, 32px)',
              lineHeight: '36px',
              fontWeight: 400,
              color: '#333333',
              maxWidth: '528px',
              margin: '0 0 20px',
            }}
          >
            Questions, Plans, Or Just Looking For a Reason To Stop By?
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(16px, 1.6vw, 22px)',
              lineHeight: '30.8px',
              fontWeight: 600,
              color: '#333333',
              maxWidth: '620px',
              margin: 0,
            }}
          >
            Whether you&rsquo;re booking a table, planning an event, or simply curious about what&rsquo;s happening at Eclipse di Luna, we&rsquo;d love to hear from you. Fill out the form and we&rsquo;ll get back to you soon.
          </p>
        </div>
      </Reveal>

      <Reveal variant="fade-up" duration={700} delay={200}>
      <div
        className="mx-auto rounded-[8px] bg-white"
        style={{ maxWidth: '590px', padding: '15px 28px' }}
      >
        <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Honeypot />
          <Field label="First Name" name="firstName" required placeholder="First name" />
          <Field label="Last Name" name="lastName" required placeholder="Last name" />
          <Field label="Email" name="email" type="email" required placeholder="Example@mail.com" />
          <Field label="Phone Number" name="phone" type="tel" required placeholder="000-000-0000" />
          <SelectField
            label="Location"
            name="location"
            required
            options={locations.map((l) => l.slug.charAt(0).toUpperCase() + l.slug.slice(1))}
            placeholder="Select location..."
            full
          />
          <TextareaField label="Message" name="message" required placeholder="Your message here" full />

          <FormError message={error} />
          <div className="sm:col-span-2 flex justify-center mt-2">
            <SubmitButton submitted={submitted} loading={loading} />
          </div>
        </form>
      </div>
      </Reveal>
    </>
  );
}
