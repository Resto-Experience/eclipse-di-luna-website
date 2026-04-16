import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Textarea } from '@/components/ui/Textarea';

describe('Textarea', () => {
  it('renders a label linked to textarea via htmlFor/id', () => {
    render(<Textarea label="Message" id="message" />);
    expect(screen.getByText('Message')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'message');
  });

  it('defaults rows to 4', () => {
    render(<Textarea label="Message" id="message" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '4');
  });

  it('accepts custom rows prop', () => {
    render(<Textarea label="Message" id="message" rows={6} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '6');
  });

  it('renders error message', () => {
    render(<Textarea label="Message" id="message" error="Required" />);
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('links error via aria-describedby', () => {
    render(<Textarea label="Message" id="message" error="Error!" />);
    const textarea = screen.getByRole('textbox');
    const errorId = textarea.getAttribute('aria-describedby');
    expect(errorId).toBeTruthy();
    expect(document.getElementById(errorId!)).toHaveTextContent('Error!');
  });

  it('adds asterisk and aria-required when required={true}', () => {
    render(<Textarea label="Message" id="message" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-required', 'true');
  });

  it('applies error border class when error present', () => {
    render(<Textarea label="Message" id="message" error="Error!" />);
    expect(screen.getByRole('textbox').className).toMatch(/border-red/);
  });

  it('renders hint text', () => {
    render(<Textarea label="Message" id="message" hint="Max 500 characters" />);
    expect(screen.getByText('Max 500 characters')).toBeInTheDocument();
  });

  it('merges className on wrapper', () => {
    const { container } = render(<Textarea label="Message" id="message" className="mt-4" />);
    expect((container.firstChild as HTMLElement)).toHaveClass('mt-4');
  });

  it('applies resize-y class', () => {
    render(<Textarea label="Message" id="message" />);
    expect(screen.getByRole('textbox')).toHaveClass('resize-y');
  });
});
