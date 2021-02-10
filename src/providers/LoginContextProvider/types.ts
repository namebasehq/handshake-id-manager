import type { Writable } from 'svelte/store';

export type LoginFlowData = {
  id?: string;
  state?: string;
  callbackUrl?: string;
};

export type LoginContext = {
  loginFlowData: Writable<LoginFlowData>;
  setName: (name: string) => void;
  clearName: () => void;
  clear: () => void;
};
