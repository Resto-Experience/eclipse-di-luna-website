import { SectionHeadingGroup } from './SectionHeadingGroup';

export function PrivatePartyInfoCards() {
  return (
    <div className="max-w-[1192px] mx-auto">
      <SectionHeadingGroup
        caption="Celebrate with us"
        title="Find Out More"
        subtitle="Thoughtfully crafted experiences for special moments"
      />
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-[8px] p-6" style={{ backgroundColor: '#FEFAF5' }}>
          <MainHeading>Food &amp; Drinks</MainHeading>

          <SubHeading>Tapas</SubHeading>
          <ListItem>6 items packages</ListItem>
          <ListItem>8 items packages</ListItem>
          <ListItem>10 items packages</ListItem>
          <ListItem>Food only = 2 hours maximum</ListItem>

          <SubHeading>Desserts</SubHeading>
          <ListItem>2 Selections</ListItem>

          <SubHeading>Drink</SubHeading>
          <ListItem>Beer, Wine, Sangria / our selection</ListItem>
          <ListItem>Non-Alcoholic Beverages Only $5 per person</ListItem>
          <ListItem>2:30 hours maximum with food package</ListItem>
        </div>

        <div className="rounded-[8px] p-6" style={{ backgroundColor: '#FEFAF5' }}>
          <MainHeading>Private Rooms &amp; Capacity</MainHeading>

          <SubHeading>Capacity</SubHeading>
          <ListItem>
            Our different venues offer many options for you to enjoy of a more private event, such as a Patio, a Wine room or even the entire restaurant. Each location sets different pricing, capacities, packages and fees. Fill out the form, and we&rsquo;ll happily provide you with a personalized quote in no time!
          </ListItem>
        </div>
      </div>
    </div>
  );
}

function MainHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'clamp(28px, 3vw, 36px)',
        lineHeight: '44px',
        fontWeight: 400,
        color: '#903934',
        borderBottom: '1px solid #000000',
        marginBottom: '10px',
        display: 'inline-block',
        width: 'fit-content',
      }}
    >
      {children}
    </h3>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4
      style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '24px',
        lineHeight: '44px',
        fontWeight: 400,
        color: '#9F5332',
        marginBottom: '0px',
      }}
    >
      {children}
    </h4>
  );
}

function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '18px',
        lineHeight: '20px',
        fontWeight: 400,
        color: '#201814',
        marginBottom: '10px',
      }}
    >
      {children}
    </p>
  );
}
