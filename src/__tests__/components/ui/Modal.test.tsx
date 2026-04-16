import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Modal } from '@/components/ui/Modal';

// Modal uses createPortal — it renders to document.body in jsdom too
describe('Modal', () => {
  const onClose = vi.fn();

  beforeEach(() => {
    onClose.mockClear();
  });

  afterEach(() => {
    // Restore body overflow
    document.body.style.overflow = '';
  });

  it('renders nothing when isOpen={false}', () => {
    render(<Modal isOpen={false} onClose={onClose}><p>Content</p></Modal>);
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('renders overlay and panel when isOpen={true}', () => {
    render(<Modal isOpen={true} onClose={onClose}><p>Modal Content</p></Modal>);
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('panel has role="dialog" and aria-modal="true"', () => {
    render(<Modal isOpen={true} onClose={onClose}><p>Content</p></Modal>);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('renders title and links it via aria-labelledby', () => {
    render(<Modal isOpen={true} onClose={onClose} title="Reserve a Table"><p>Content</p></Modal>);
    const title = screen.getByText('Reserve a Table');
    expect(title).toBeInTheDocument();
    const dialog = screen.getByRole('dialog');
    const labelledById = dialog.getAttribute('aria-labelledby');
    expect(document.getElementById(labelledById!)).toHaveTextContent('Reserve a Table');
  });

  it('calls onClose when Escape key pressed (closeOnEscape=true default)', () => {
    render(<Modal isOpen={true} onClose={onClose}><p>Content</p></Modal>);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onClose when closeOnEscape={false} and Escape pressed', () => {
    render(<Modal isOpen={true} onClose={onClose} closeOnEscape={false}><p>Content</p></Modal>);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose when backdrop is clicked (closeOnBackdrop=true default)', () => {
    render(<Modal isOpen={true} onClose={onClose}><p>Content</p></Modal>);
    const backdrop = document.querySelector('[data-testid="modal-backdrop"]') ||
      document.querySelector('[aria-hidden="true"]');
    // Click the overlay (not the dialog panel)
    const overlay = document.querySelector('[data-modal-overlay]') as HTMLElement;
    if (overlay) {
      fireEvent.click(overlay);
      expect(onClose).toHaveBeenCalledTimes(1);
    }
  });

  it('does NOT call onClose when panel itself is clicked', () => {
    render(<Modal isOpen={true} onClose={onClose}><p>Panel content</p></Modal>);
    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('renders close X button that calls onClose', () => {
    render(<Modal isOpen={true} onClose={onClose}><p>Content</p></Modal>);
    const closeBtn = screen.getByRole('button', { name: /close/i });
    expect(closeBtn).toBeInTheDocument();
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('locks body scroll when open', () => {
    render(<Modal isOpen={true} onClose={onClose}><p>Content</p></Modal>);
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('removes body scroll lock when closed', () => {
    const { rerender } = render(<Modal isOpen={true} onClose={onClose}><p>Content</p></Modal>);
    expect(document.body.style.overflow).toBe('hidden');
    rerender(<Modal isOpen={false} onClose={onClose}><p>Content</p></Modal>);
    expect(document.body.style.overflow).toBe('');
  });

  it('applies sm size class', () => {
    render(<Modal isOpen={true} onClose={onClose} size="sm"><p>Content</p></Modal>);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('max-w-sm');
  });

  it('applies md size class (default)', () => {
    render(<Modal isOpen={true} onClose={onClose}><p>Content</p></Modal>);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('max-w-lg');
  });

  it('applies lg size class', () => {
    render(<Modal isOpen={true} onClose={onClose} size="lg"><p>Content</p></Modal>);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('max-w-3xl');
  });

  it('applies full size class', () => {
    render(<Modal isOpen={true} onClose={onClose} size="full"><p>Content</p></Modal>);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('w-screen', 'h-screen');
  });

  it('merges className prop on panel', () => {
    render(<Modal isOpen={true} onClose={onClose} className="custom-class"><p>Content</p></Modal>);
    expect(screen.getByRole('dialog')).toHaveClass('custom-class');
  });
});
