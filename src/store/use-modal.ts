// src/stores/modalStore.ts
import { create } from 'zustand';
import React from 'react';

export interface ModalOptions {
  title: string;
  content: React.ReactNode;
  okText?: string;
  cancelText?: string;
  description?: string;
  onOk?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
}

interface ModalState {
  isModalOpen: boolean;
  title: string;
  content: React.ReactNode;
  okText?: string;
  cancelText?: string;
  onOk?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
  description?: string;
  isOkLoading: boolean;
  isCancelLoading: boolean;
  openModal: (options: ModalOptions) => void;
  closeModal: () => void;
  resetModalData: () => void;
  setOkLoading: (isLoading: boolean) => void;
  setCancelLoading: (isLoading: boolean) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isModalOpen: false,
  title: '',
  content: null,
  onOk: undefined,
  onCancel: undefined,
  okText: undefined,
  cancelText: undefined,
  description: undefined,
  isOkLoading: false,
  isCancelLoading: false,
  openModal: ({
    title,
    content,
    onOk,
    onCancel,
    okText,
    cancelText,
    description,
  }) =>
    set(() => ({
      isModalOpen: true,
      title,
      content,
      onOk,
      onCancel,
      okText,
      cancelText,
      description,
      isOkLoading: false,
      isCancelLoading: false,
    })),
  closeModal: () =>
    set(() => ({
      isModalOpen: false,
    })),
  resetModalData: () =>
    set(() => ({
      title: '',
      content: null,
      onOk: undefined,
      onCancel: undefined,
      okText: undefined,
      cancelText: undefined,
      description: undefined,
      isOkLoading: false,
      isCancelLoading: false,
    })),
  setOkLoading: (isLoading) => set(() => ({ isOkLoading: isLoading })),
  setCancelLoading: (isLoading) => set(() => ({ isCancelLoading: isLoading })),
}));
