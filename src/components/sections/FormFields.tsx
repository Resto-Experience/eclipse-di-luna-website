const CHEVRON_SVG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%236C4627' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")";

export const FIELD_INPUT_STYLE: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '14px',
  backgroundColor: '#FBFBFB',
  border: '1px solid #E3E1E0',
};
export const FIELD_LABEL_STYLE: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '14px',
  color: '#6C4627',
  fontWeight: 500,
};

export function Field({
  label,
  name,
  type = 'text',
  required,
  placeholder,
  full,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  full?: boolean;
}) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <label htmlFor={name} className="block mb-1" style={FIELD_LABEL_STYLE}>
        {label} {required && <span style={{ color: '#780C06' }}>*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full h-[38px] px-3 rounded-[8px] text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#780C06]/30 placeholder:text-[#99928F]"
        style={FIELD_INPUT_STYLE}
      />
    </div>
  );
}

export function SelectField({
  label,
  name,
  required,
  options,
  placeholder,
  full,
}: {
  label: string;
  name: string;
  required?: boolean;
  options: string[];
  placeholder?: string;
  full?: boolean;
}) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <label htmlFor={name} className="block mb-1" style={FIELD_LABEL_STYLE}>
        {label} {required && <span style={{ color: '#780C06' }}>*</span>}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        defaultValue=""
        className="w-full h-[38px] pl-3 pr-10 rounded-[8px] appearance-none focus:outline-none focus:ring-2 focus:ring-[#780C06]/30 invalid:text-[#99928F] text-[#333333]"
        style={{
          ...FIELD_INPUT_STYLE,
          backgroundImage: CHEVRON_SVG,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 14px center',
          backgroundSize: '12px 8px',
        }}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export function TextareaField({
  label,
  name,
  required,
  placeholder,
  rows = 5,
  full,
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  full?: boolean;
}) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <label htmlFor={name} className="block mb-1" style={FIELD_LABEL_STYLE}>
        {label} {required && <span style={{ color: '#780C06' }}>*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        required={required}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3 py-2 rounded-[8px] text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#780C06]/30 resize-none placeholder:text-[#99928F]"
        style={{ ...FIELD_INPUT_STYLE, height: '150px' }}
      />
    </div>
  );
}

export function SubmitButton({ label = 'Send', submitted }: { label?: string; submitted?: boolean }) {
  return (
    <button
      type="submit"
      className="h-[52px] px-8 rounded-full uppercase cursor-pointer transition-colors duration-200"
      style={{
        fontFamily: 'var(--font-button)',
        fontSize: '16px',
        fontWeight: 600,
        letterSpacing: '0.02em',
        backgroundColor: '#780C06',
        color: '#F4CE9F',
        border: '1px solid #F4CE9F',
        minWidth: '269px',
      }}
    >
      {submitted ? 'Sent!' : label}
    </button>
  );
}
