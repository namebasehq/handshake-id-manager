<script lang="ts" context="module">
  import { Route, Router } from '@Hashbrown';
  import ConfirmCreate from './_create/ConfirmCreate.svelte';
  import CreateEnterDetails from './_create/CreateEnterDetails.svelte';
  import List from './_list/index.svelte';
  import Login from './_login/index.svelte';

  console.info('Handhshake Login v1.0');
</script>

<svelte:head>
  <title>Login with Handshake | Namebase</title>
</svelte:head>

<Router default="/list">
  <Route path="/login">
    <Login />
  </Route>
  <Route path="/create">
    <CreateEnterDetails />
  </Route>
  <Route path="/create/confirm">
    <ConfirmCreate />
  </Route>
  <Route path="/list">
    <List />
  </Route>
</Router>
