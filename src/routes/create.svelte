<script lang="ts" context="module">
	import { stores } from '@sapper/app';

	import { onMount } from 'svelte';
	import identityService from '../identity/IdentityService';
	import type { Identity } from '../identity/IdentityModels';
</script>

<script lang="ts">
	let name: string = '';
	const atob = (str) => Buffer.from(str, 'base64').toString('binary');

	onMount(async () => {});

	const create = async () => {
		const baseDomain = () => (window as any).baseDomain || 'https://www.namebase.io';

		const identity = await identityService.generateIndentity(name);
		const splitDomain = identity.name.split('.');
		const tld = splitDomain.pop();
		const host = ['_auth', ...splitDomain].join('.');
		const records = [
			{ type: 'TXT', host: host, value: 'authv=0;fingerprint=' + identity.fingerprint, ttl: 60 },
		];
		const redirectUrl =
			window.location.protocol +
			'//' +
			window.location.host +
			'/#/login' +
			'?id=' +
			btoa(identity.name);
		const url = new URL(`${baseDomain()}/next/domain-manager/${tld}/records`);
		url.searchParams.append('records', btoa(JSON.stringify(records)));
		url.searchParams.append(
			'redirect',
			encodeURIComponent(encodeURIComponent(redirectUrl.toString())),
		);
		window.location.href = url.toString();
	};
</script>

<div>
	<input type="text" placeholder="Enter your name" bind:value={name} />
	<input type="button" value="Continue" on:click={create} />
</div>
