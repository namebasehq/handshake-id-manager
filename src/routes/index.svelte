<script lang="ts" context="module">
  import { Route, Router } from '@Hashbrown';
  import { onMount } from 'svelte';
  import Create from './_create/index.svelte';
  import List from './_list/index.svelte';
  import Login from './_login/index.svelte';
</script>

<script>
  onMount(async () => {});
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
  <Route path="/">
    <List />
  </Route>
</Router>
