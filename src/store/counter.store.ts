import { create, StateCreator } from "zustand";

export interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

//funcion para crear el store
const storeApi: StateCreator<CounterState> = (set) => ({
  count: 1,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: Math.max(1, state.count - 1) })),
});

export const useCounterStore = create<CounterState>()(storeApi);
