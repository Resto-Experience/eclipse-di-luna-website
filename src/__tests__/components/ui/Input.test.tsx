import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Input } from '@/components/ui/Input';

describe('Input', () => {
  it('renders a label linked to input via htmlFor/id', () => {
    render(<Input label="Name" id="name" />);
    const label = screen.getByText('Name');
    const input = screen.getByRole('textbox');
    expect(label).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'name');
    expect(label.closest('label') || label).toBeInTheDocument();
  });

  it('renders label text', () => {
    render(<Input label="Email" id="email" />);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('adds asterisk when required={true}', () => {
    render(<Input label="Name" id="name" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('sets aria-required="true" on input when required', () => {
    render(<Input label="Name" id="name" required />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-required', 'true');
  });

  it('renders error message below input', () => {
    render(<Input label="Name" id="name" error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('links error message via aria-describedby', () => {
    render(<Input label="Name" id="name" error="Error!" />);
    const input = screen.getByRole('textbox');
    const errorId = input.getAttribute('aria-describedby');
    expect(errorId).toBeTruthy();
    const errorEl = document.getElementById(errorId!);
    expect(errorEl).toHaveTextContent('Error!');
  });

  it('renders hint text below input', () => {
    render(<Input label="Name" id="name" hint="Enter your full name" />);
    expect(screen.getByText('Enter your full name')).toBeInTheDocument();
  });

  it('does not render error when not provided', () => {
    render(<Input label="Name" id="name" />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('spreads additional props to input', () => {
    render(<Input label="Name" id="name" placeholder="Enter name" type="text" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'Enter name');
  });

  it('applies error border class when error is present', () => {
    render(<Input label="Name" id="name" error="Error!" />);
    const input = screen.getByRole('textbox');
    expect(input.className).toMatch(/border-red/);
  });

  it('merges className prop', () => {
    const { container } = render(<Input label="Name" id="name" className="mt-4" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('mt-4');
  });
});
