<script context="module" lang="ts">
  import HandshakeLogoIcon from '@components/HandshakeLogoIcon.svelte';
  import Main from '@components/Main.svelte';
  import { Router } from '@Hashbrown';
  import { AnnouncementContextProvider } from '@providers/announcement';
  import { IdentitiesContextProvider } from '@providers/identities';
  import { LoginContextProvider } from '@providers/loginFlow';
  import { MediaContextProvider } from '@providers/media';
  import GitHubCorner from '../components/GitHubCorner.svelte';
  import LoadingContextProvider from '../providers/LoadingContextProvider/LoadingContextProvider.svelte';
</script>

<GitHubCorner />
<LoadingContextProvider>
  <MediaContextProvider>
    <AnnouncementContextProvider>
      <IdentitiesContextProvider>
        <Router default="/list">
          <LoginContextProvider>
            <Main>
              <div class="handshake-logo">
                <HandshakeLogoIcon />
              </div>
              <slot />
            </Main>
          </LoginContextProvider>
        </Router>
      </IdentitiesContextProvider>
    </AnnouncementContextProvider>
  </MediaContextProvider>
</LoadingContextProvider>

<style>
  .handshake-logo {
    width: max-content;
    margin: 0 auto;
    padding-bottom: 32px;
  }
</style>
