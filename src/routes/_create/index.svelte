<script lang="ts" context="module">
	import { onMount } from 'svelte';
	import DeviceService from '../../device/DeviceService';
	import IdentityService from '../../identity/IdentityService';
</script>

<script lang="ts">
	export let query: Record<string, string>;
	const identityService = IdentityService.InstanceSecure('test');
	let name: string = '';
	onMount(async () => {});

	const create = async () => {
		const baseDomain = () => (window as any).baseDomain || 'https://www.namebase.io';

		const identity = await identityService.generateIndentity(name);
		const splitDomain = `${identity.name}`.split('.');
		const tld = splitDomain.pop();
		const host = [DeviceService.getDeviceId(), '_auth', ...splitDomain].join('.');
		const records = [
			{ type: 'TXT', host: host, value: 'v=0;fingerprint=' + identity.fingerprint, ttl: 60 },
		];
		const redirectUrl = query.redirect
			? atob(query.redirect)
			: window.location.protocol +
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
