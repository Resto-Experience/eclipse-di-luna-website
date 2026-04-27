'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { OrderOnlineModal, GiftCardModal, ReserveTableModal } from '@/components/sections/HeroModals';

type ModalType = 'reserve' | 'order' | 'gift' | null;

interface ModalContextValue {
  activeModal: ModalType;
  openModal: (type: Exclude<ModalType, null>) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const openModal = useCallback((type: Exclude<ModalType, null>) => {
    setActiveModal(type);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
  }, []);

  return (
    <ModalContext.Provider value={{ activeModal, openModal, closeModal }}>
      {children}
      <ReserveTableModal open={activeModal === 'reserve'} onClose={closeModal} />
      <OrderOnlineModal open={activeModal === 'order'} onClose={closeModal} />
      <GiftCardModal open={activeModal === 'gift'} onClose={closeModal} />
    </ModalContext.Provider>
  );
}

export function useModal(): ModalContextValue {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return ctx;
}
