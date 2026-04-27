'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { getAllLocations } from '@/data/locations';
import { Field, SelectField, TextareaField, SubmitButton, Honeypot, FormError, FIELD_LABEL_STYLE, FIELD_INPUT_STYLE } from './FormFields';

const POSITIONS = [
  'Assistant Manager', 'General Manager', 'Events Manager', 'Executive Chef',
  'Bartender', 'Kitchen Manager', 'Busser / Bus Person', 'Line Cook',
  'Barback', 'Host / Hostess', 'Dishwasher', 'Sous Chef',
  'Catering Manager', 'Runner', 'Director of Operations', 'Server',
];

export function JobsForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);
  const locations = getAllLocations();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!agreed) return;
    setError(null);
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        body: fd,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || 'Something went wrong');
      }
      e.currentTarget.reset();
      setAgreed(false);
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
        <div
          className="flex flex-col items-center text-center mx-auto"
          style={{ maxWidth: '940px', marginBottom: '60px' }}
        >
          <Image
            src="/images/jobs/join-team-icon.svg"
            alt=""
            width={63}
            height={46}
            style={{ width: '63px', height: '46px' }}
          />
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(32px, 4vw, 48px)',
              lineHeight: '48px',
              fontWeight: 400,
              color: '#3C1816',
              margin: '20px 0 10px',
            }}
          >
            Join Our Team
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(18px, 2.2vw, 32px)',
              lineHeight: '36px',
              fontWeight: 400,
              color: '#333333',
              margin: 0,
            }}
          >
            We are hiring! Apply below to become a part of our awesome team and we&rsquo;ll get back to you ASAP!
          </p>
        </div>
      </Reveal>

      <Reveal variant="fade-up" duration={700} delay={200}>
      <div
        className="mx-auto rounded-[8px] bg-white"
        style={{ maxWidth: '940px', padding: '24px' }}
      >
        <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4" encType="multipart/form-data">
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
        <TextareaField
          label="Service Industry Experience"
          name="experience"
          required
          placeholder="Your note here"
          full
        />
        <SelectField
          label="Applying For"
          name="applyingFor"
          required
          options={POSITIONS}
          placeholder="Applying For"
          full
        />
        <TextareaField label="Cover Letter" name="coverLetter" placeholder="Your note here" full />

        <FileField label="Upload your Resume" name="resume" full />
        <FileField label="Your Photo" name="photo" full />

        <label
          className="sm:col-span-2 flex items-start gap-3 mt-2"
          style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#6C4627', lineHeight: 1.4 }}
        >
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 shrink-0"
          />
          <span>
            I&rsquo;d like to get texts about specials, events, and other exclusive offers and announcements not available to the general public. Privacy Policy, Terms and Conditions Message and data rates may apply. Message frequency varies.
          </span>
        </label>

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

function FileField({ label, name, full }: { label: string; name: string; full?: boolean }) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <label className="block mb-1" style={FIELD_LABEL_STYLE}>
        {label}
      </label>
      <div
        className="rounded-[8px] border-2 border-dashed flex flex-col items-center justify-center py-8 gap-3 cursor-pointer hover:bg-[#F8F4EA]/50 transition-colors"
        style={{ ...FIELD_INPUT_STYLE, borderStyle: 'dashed', borderColor: '#E3E1E0', height: 'auto' }}
        onClick={() => document.getElementById(name)?.click()}
      >
        <input id={name} name={name} type="file" className="hidden" />
        <Image src="/images/jobs/upload-icon.webp" alt="" width={32} height={32} className="w-[32px] h-[32px] opacity-60" />
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#99928F' }}>
          Click or drag a file to this area to upload.
        </p>
      </div>
    </div>
  );
}
