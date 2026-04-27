'use client';

import { useState } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { getAllLocations } from '@/data/locations';
import { Field, SelectField, TextareaField, SubmitButton, Honeypot, FormError } from './FormFields';

const EVENT_TYPES = [
  'Birthday', 'Anniversary', 'Wedding / Rehearsal Dinner', 'Corporate Event',
  'Holiday Party', 'Baby Shower', 'Bridal Shower', 'Graduation', 'Retirement',
  'Networking', 'Memorial', 'Fundraiser', 'Other',
];

export function ProposalForm() {
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
      const res = await fetch('/api/proposal', {
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
    <div className="max-w-[1192px] mx-auto rounded-[8px] overflow-hidden grid grid-cols-1 lg:grid-cols-2 bg-white">
      <Reveal variant="fade-up" duration={700} className="h-full">
      <div
        className="relative flex flex-col justify-center items-start p-8 lg:p-10 min-h-[280px] h-full"
        style={{
          backgroundImage: 'url(/images/private-party/proposal-bg.avif)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10">
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(28px, 3.3vw, 48px)',
              lineHeight: '50px',
              fontWeight: 400,
              color: '#FCF0E1',
              marginTop: '20px',
              marginBottom: '10px',
            }}
          >
            Request a Proposal
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(16px, 1.8vw, 24px)',
              lineHeight: 1.4,
              fontWeight: 400,
              color: '#DDC2C0',
              textTransform: 'capitalize',
            }}
          >
            Please provide us with your information. Make sure you choose your preferred location.
          </p>
        </div>
      </div>
      </Reveal>

      <Reveal variant="fade-up" duration={700} delay={200}>
      <form onSubmit={onSubmit} className="px-7 py-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Honeypot />
        <Field label="First Name" name="firstName" required placeholder="First name" />
        <Field label="Last Name" name="lastName" required placeholder="Last name" />
        <Field label="Email" name="email" type="email" required placeholder="Example@mail.com" />
        <Field label="Phone Number" name="phone" type="tel" required placeholder="000-000-0000" />
        <Field label="Date of the event" name="date" type="date" required placeholder="mm/dd/yyyy" />
        <Field label="Time of the event" name="time" type="time" required placeholder="--:--" />
        <SelectField label="Type of Event" name="eventType" required options={EVENT_TYPES} placeholder="Choose an event" />
        <Field label="Number of guests" name="guests" type="number" required placeholder="---" />
        <SelectField
          label="Location"
          name="location"
          required
          options={locations.map((l) => l.slug.charAt(0).toUpperCase() + l.slug.slice(1))}
          placeholder="Select location..."
          full
        />
        <TextareaField label="Additional info" name="message" required placeholder="Your note here" full />
        <FormError message={error} />
        <div className="sm:col-span-2 flex justify-center mt-2">
          <SubmitButton submitted={submitted} loading={loading} />
        </div>
      </form>
      </Reveal>
    </div>
  );
}
