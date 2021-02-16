<script lang="ts" context="module">
	import { goto } from '@sapper/app';

	import { onMount } from 'svelte';
	import identityService from '../identity/IdentityService';
</script>

<script lang="ts">
	export let query: Record<string, string>;

	onMount(async () => {
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
		const body = document.getElementsByTagName('body')[0];
		const form = document.createElement('form');
		const url = new URL(atob(query.referrer));
		url.pathname = atob(query.action);
		form.setAttribute('action', url.toString());
		form.setAttribute('method', 'GET');
		form.setAttribute('enctype', 'application/x-www-form-urlencoded');
		form.addInput('publicKey', btoa(credentials.publicKey));
		form.addInput('signed', btoa(credentials.signed));
		form.addInput('domain', btoa(credentials.name));

		body.appendChild(form);

		form.submit();
	});
</script>

<div>
	{JSON.stringify(query)}
</div>
