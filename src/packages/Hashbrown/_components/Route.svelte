<script context="module" lang="ts">
	import { getContext } from 'svelte';
	import type { HashbrownContext, RouteProps } from '../types';
</script>

<script lang="typescript">
	const { path: routerPath } = getContext<HashbrownContext>('router');
	export let path: RouteProps['path'];
</script>

{#if path.substring(1) === $routerPath}
	<slot />
{/if}
