<script context="module" lang="ts">
  import type { HashbrownContext } from '@Hashbrown';
  import { getContext, onMount, setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import type { LoginContext, LoginFlowData } from './types';
</script>

<script>
  const STORAGE_KEY_PREFIX: string = 'handshake:login:flow';

  let writableloginFlowData = writable<LoginFlowData>(null, (set) => {
    if (typeof window === 'undefined') return;
    set(<LoginFlowData>JSON.parse(sessionStorage.getItem(STORAGE_KEY_PREFIX) || '{}'));
  });
  writableloginFlowData.subscribe((loginFlowData) => {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem(STORAGE_KEY_PREFIX, JSON.stringify(loginFlowData));
  });
  const hashbrownContext = getContext<HashbrownContext>('router');

  hashbrownContext.query.subscribe((query) => {
    if (!query.id || !query.state || !query.callbackUrl) {
      return;
    }
    writableloginFlowData.set({
      callbackUrl: atob(query.callbackUrl),
      id: atob(query.id),
      state: atob(query.state),
    });
  });

  onMount(() => {});

  setContext<LoginContext>('loginFlow', {
    loginFlowData: writableloginFlowData,
    setName: (name: string) => {
      writableloginFlowData.update((loginFlowData) => {
        loginFlowData.id = name;
        return loginFlowData;
      });
    },
    clearName: () => {
      writableloginFlowData.update((loginFlowData) => {
        if (loginFlowData?.id) {
          delete loginFlowData.id;
        }
        return loginFlowData;
      });
    },
    clear: () => {
      writableloginFlowData.update((_) => {
        return null;
      });
    },
  });
</script>

<slot>
  <!-- children -->
</slot>
