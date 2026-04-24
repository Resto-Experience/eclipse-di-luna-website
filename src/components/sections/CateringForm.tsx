'use client';

import { useState } from 'react';
import { getAllLocations } from '@/data/locations';
import { Field, SelectField, TextareaField, SubmitButton } from './FormFields';

const EVENT_TYPES = [
  'Birthday', 'Anniversary', 'Wedding / Rehearsal Dinner', 'Corporate Event',
  'Holiday Party', 'Baby Shower', 'Bridal Shower', 'Graduation', 'Retirement',
  'Networking', 'Memorial', 'Fundraiser', 'Other',
];

export function CateringForm() {
  const [submitted, setSubmitted] = useState(false);
  const locations = getAllLocations();
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-[1192px] mx-auto rounded-[8px] overflow-hidden grid grid-cols-1 lg:grid-cols-2 bg-white">
      <div
        className="relative flex flex-col justify-center items-start p-8 lg:p-10 min-h-[280px]"
        style={{
          backgroundImage: 'url(/images/catering/form-bg.webp)',
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
            Ready to plan your catering?
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(16px, 1.8vw, 24px)',
              lineHeight: 1.4,
              fontWeight: 400,
              color: '#DDC2C0',
            }}
          >
            Tell Us A Bit About It And We&apos;ll Take Care Of The Rest.
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="px-7 py-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="First Name" name="firstName" required placeholder="First name" />
        <Field label="Last Name" name="lastName" required placeholder="Last name" />
        <Field label="Email" name="email" type="email" required placeholder="Example@mail.com" />
        <Field label="Phone Number" name="phone" type="tel" required placeholder="000-000-0000" />
        <Field label="Number of Guests" name="guests" type="number" required placeholder="---" />
        <SelectField label="Type of Event" name="eventType" required options={EVENT_TYPES} placeholder="Choose an event" />
        <SelectField
          label="Location"
          name="location"
          required
          options={locations.map((l) => l.slug.charAt(0).toUpperCase() + l.slug.slice(1))}
          placeholder="Select location..."
          full
        />
        <TextareaField label="Additional Info" name="message" required placeholder="Your note here" full />
        <div className="sm:col-span-2 flex justify-center mt-2">
          <SubmitButton submitted={submitted} />
        </div>
      </form>
    </div>
  );
}
