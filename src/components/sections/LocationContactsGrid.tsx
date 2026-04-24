import Image from 'next/image';
import { getAllLocations } from '@/data/locations';

export function LocationContactsGrid() {
  const locations = getAllLocations();
  return (
    <div className="max-w-[860px] mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      {locations.map((loc) => {
        const name = loc.slug.charAt(0).toUpperCase() + loc.slug.slice(1);
        const phone = loc.contact.cateringPhone || loc.contact.phone;
        const email = loc.contact.cateringEmail || loc.contact.email;
        return (
          <div
            key={loc.slug}
            className="rounded-[8px]"
            style={{ backgroundColor: '#FEFAF5', padding: '24px' }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '36px',
                lineHeight: 1.1,
                fontWeight: 400,
                color: '#903934',
                marginBottom: '12px',
              }}
            >
              {name}
            </h3>
            <Image
              src="/images/catering/line-divider.svg"
              alt=""
              width={340}
              height={1}
              className="block w-full h-[1px] mb-3"
            />
            <div className="flex flex-col gap-1">
              <a
                href={`tel:${phone}`}
                style={{ fontFamily: 'var(--font-body)', fontSize: '18px', lineHeight: '20px', color: '#333333', fontWeight: 400 }}
                className="hover:underline"
              >
                {phone}
              </a>
              <a
                href={`mailto:${email}`}
                style={{ fontFamily: 'var(--font-body)', fontSize: '18px', lineHeight: '20px', color: '#333333', fontWeight: 400 }}
                className="hover:underline"
              >
                {email}
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
