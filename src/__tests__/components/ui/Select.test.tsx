import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Select } from '@/components/ui/Select';

const options = [
  { value: 'alpharetta', label: 'Alpharetta' },
  { value: 'beltline', label: 'Beltline' },
  { value: 'buckhead', label: 'Buckhead' },
];

describe('Select', () => {
  it('renders a label linked to select via htmlFor/id', () => {
    render(<Select label="Location" id="location" options={options} />);
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveAttribute('id', 'location');
  });

  it('renders all options', () => {
    render(<Select label="Location" id="location" options={options} />);
    expect(screen.getByRole('option', { name: 'Alpharetta' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Beltline' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Buckhead' })).toBeInTheDocument();
  });

  it('renders placeholder as first disabled option', () => {
    render(
      <Select label="Location" id="location" options={options} placeholder="Select a location" />
    );
    const placeholder = screen.getByRole('option', { name: 'Select a location' });
    expect(placeholder).toBeInTheDocument();
    expect(placeholder).toHaveAttribute('value', '');
    expect(placeholder).toBeDisabled();
  });

  it('renders error message with aria-describedby', () => {
    render(<Select label="Location" id="location" options={options} error="Required" />);
    expect(screen.getByText('Required')).toBeInTheDocument();
    const select = screen.getByRole('combobox');
    const errorId = select.getAttribute('aria-describedby');
    expect(errorId).toBeTruthy();
    expect(document.getElementById(errorId!)).toHaveTextContent('Required');
  });

  it('adds asterisk and aria-required when required={true}', () => {
    render(<Select label="Location" id="location" options={options} required />);
    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-required', 'true');
  });

  it('applies error border class when error present', () => {
    render(<Select label="Location" id="location" options={options} error="Error!" />);
    const select = screen.getByRole('combobox');
    expect(select.className).toMatch(/border-red/);
  });

  it('merges className prop', () => {
    const { container } = render(
      <Select label="Location" id="location" options={options} className="mt-4" />
    );
    expect((container.firstChild as HTMLElement)).toHaveClass('mt-4');
  });

  it('spreads additional props to select', () => {
    render(<Select label="Location" id="location" options={options} disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });
});
