<script lang="ts" context="module">
	import { goto } from '@sapper/app';
	import { onMount } from 'svelte';
	import DeviceService from '../../device/DeviceService';
	import IdentityService from '../../identity/IdentityService';
</script>

<script lang="ts">
	export let query: Record<string, string>;
	const identityService = IdentityService.InstanceSecure('test');

	onMount(async () => {
		if (!query.id || !query.state || !query.callbackUrl) {
			goto('/#/list');
		}

		HTMLFormElement.prototype.addInput = function (name: string, value: string) {
			const input = document.createElement('input');
			input.setAttribute('type', 'hidden');
			input.setAttribute('name', name);
			input.setAttribute('value', value);
			this.appendChild(input);
		};
		const credentials = await identityService.signAndGetpublicKey(
			atob(query.id),
			atob(query.state),
		);
		if (!credentials) {
			goto('/#/create?redirect=' + btoa(window.location.href));
		}
		const url = new URL(atob(query.callbackUrl));
		const data = {
			publicKey: btoa(credentials.publicKey),
			signed: btoa(credentials.signed),
			domain: btoa(credentials.name),
			deviceId: btoa(DeviceService.getDeviceId()),
		};
		url.hash = btoa(JSON.stringify(data));
		goto(url.toString());
	});
</script>

<div>
	{JSON.stringify(query)}
</div>
