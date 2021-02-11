<script lang="ts" context="module">
	import { goto } from '@sapper/app';

	import url from '../url';
	import { onMount } from 'svelte';
	import login from './login.svelte';
	import list from './list.svelte';
	import create from './create.svelte';
</script>

<script lang="ts">
	const queryIndex = $url.hash.indexOf('?');
	const path = $url.hash.substr(2, queryIndex > -1 ? queryIndex : $url.hash.length);
	const query =
		queryIndex === -1
			? []
			: $url.hash
					.substr(queryIndex + 1)
					.split('&')
					.reduce((a, b) => {
						const y = b.split('=');
						const obj = {};
						obj[y[0]] = y[1] ?? true;
						return { ...a, ...obj };
					}, []);

	onMount(() => {
		if (!path) {
			goto('/#/list');
		}
	});
</script>

<svelte:head>
	<title>Handshake Login</title>
</svelte:head>
{#if $url.hash.startsWith('#/login')}
	<svelte:component this={login} {query} />
{:else if $url.hash.startsWith('#/create')}
	<svelte:component this={create} {query} />
{:else if $url.hash.startsWith('#/list')}
	<svelte:component this={list} {query} />
{:else}
	<div />
{/if}
