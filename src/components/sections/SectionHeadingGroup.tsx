export function SectionHeadingGroup({
  caption,
  title,
  subtitle,
  titleColor = '#333333',
}: {
  caption?: string;
  title: string;
  subtitle?: string;
  titleColor?: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      {caption && (
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '24px',
            lineHeight: '20px',
            fontWeight: 400,
            color: '#83342F',
            marginBottom: '10px',
          }}
        >
          {caption}
        </p>
      )}
      <h2
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(28px, 3.3vw, 48px)',
          lineHeight: 1,
          fontWeight: 400,
          color: titleColor,
          marginTop: '10px',
          marginBottom: '10px',
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="max-w-[940px]"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(18px, 2.2vw, 32px)',
            lineHeight: 1.15,
            fontWeight: 400,
            color: '#333333',
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
