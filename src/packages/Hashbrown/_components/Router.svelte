<script context="module" lang="ts">
	import { goto } from '@sapper/app';
	import { onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import type { HashbrownContext } from '../types';
</script>

<script lang="ts">
	let path: string = '';
	const writeablePath = writable<string>(path);

	let hash: string = '';
	const writeableHash = writable<string>(hash);

	let query: Record<string, string> = {};
	const writeableQuery = writable<Record<string, string>>(query);

	onMount(() => {
		if (typeof window !== 'undefined') {
			const originalPushState = history.pushState;
			const originalReplaceState = history.replaceState;

			const updateWriteables = () => {
				const queryIndex = window.location.hash.indexOf('?');

				console.log('updating writeables');

				writeableHash.set(window.location.hash);
				writeablePath.set(
					window.location.hash.substr(
						2,
						queryIndex > -1 ? queryIndex : window.location.hash.length,
					),
				);
				writeableQuery.update(() => {
					if (queryIndex === -1) return {};
					return window.location.hash
						.substr(queryIndex + 1)
						.split('&')
						.reduce((a, b) => {
							const y = b.split('=');
							const obj = {};
							obj[y[0]] = y[1] ?? true;
							return { ...a, ...obj };
						}, []);
				});
			};

			history.pushState = function () {
				originalPushState.apply(this, arguments);
				updateWriteables();
			};
			history.replaceState = function () {
				console.log('here');
				originalReplaceState.apply(this, arguments);
				updateWriteables();
			};

			window.addEventListener('popstate', updateWriteables);
			window.addEventListener('hashchange', updateWriteables);
			updateWriteables();
		}
	});

	$: if (!$writeablePath) {
		if (typeof window !== 'undefined') goto(`/#${$$props.default}`);
	}

	setContext<HashbrownContext>('router', {
		path: writeablePath,
		hash: writeableHash,
		query: writeableQuery,
	});
</script>

<slot />
