<script context="module" lang="ts">
	import HandshakeLogoIcon from '@components/HandshakeLogoIcon.svelte';
	import { AnnouncementContextProvider } from '@providers/announcement';
</script>

<AnnouncementContextProvider>
	<main>
		<div class="handshake-logo">
			<HandshakeLogoIcon />
		</div>
		<slot />
	</main>
</AnnouncementContextProvider>

<style>
	main {
		width: 392px;
		margin: 0 auto;
		max-width: 100%;
		position: relative;
		margin-top: 136px;
		padding-left: 16px;
		padding-right: 16px;
	}

	.handshake-logo {
		width: max-content;
		margin: 0 auto;
		padding-bottom: 32px;
	}
</style>
