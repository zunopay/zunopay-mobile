import { Receiver } from '@/model/payment';
import { create } from 'zustand';

type TransferState = {
  receiver: Receiver | null;
  setReceiver: (receiver: Receiver) => void;
  resetReceiver: () => void;
};

export const useTransferStore = create<TransferState>((set) => ({
  receiver: null,
  setReceiver: (receiver) => set({ receiver }),
  resetReceiver: () => set({ receiver: null }),
}));
