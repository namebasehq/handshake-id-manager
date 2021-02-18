<script lang="ts" context="module">
	import { Route, Router } from '@Hashbrown';
	import Create from './create.svelte';
	import List from './list.svelte';
	import Login from './login.svelte';
</script>

<svelte:head>
	<title>Login with Handshake | Namebase</title>
</svelte:head>

<Router default="/list">
	<Route path="/login">
		<Login />
	</Route>
	<Route path="/create">
		<Create />
	</Route>
	<Route path="/list">
		<List />
	</Route>
</Router>
