<script lang="ts" context="module">
	import { stores } from '@sapper/app';
	import { onMount } from 'svelte';
	import type { Identity } from '../../identity/IdentityModels';
	import IdentityService from '../../identity/IdentityService';
</script>

<script lang="ts">
	const { page } = stores();
	const { host, path, params, query } = $page;
	const identityService = IdentityService.InstanceSecure('test');

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
