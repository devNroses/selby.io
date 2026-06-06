// This file defines a Zustand store for managing a simple counter state. It includes actions to increment, decrement, and reset the count.
import { create } from 'zustand';

interface StoreState {
    count: number;
    increment: () => void;
    decrement: () => void;
    reset: () => void;
}

export const useMainStore = create<StoreState>((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
    reset: () => set({ count: 0 }),
}));