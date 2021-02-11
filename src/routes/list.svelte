<script lang="ts" context="module">
	import { stores } from '@sapper/app';

	import { onMount } from 'svelte';
	import identityService from '../identity/IdentityService';
	import type { Identity } from '../identity/IdentityModels';
</script>

<script lang="ts">
	const { page } = stores();
	const { host, path, params, query } = $page;
	const atob = (str) => Buffer.from(str, 'base64').toString('binary');

	let identities: Identity[] = [];
	onMount(async () => {
		identities = await identityService.fetchAllIdentityName();
	});
</script>

<div>
	My identities
	{#each identities as identity}
		<div>
			{identity.name}
		</div>
	{/each}
	<div><a href="/#/create">+ new id</a></div>
</div>
