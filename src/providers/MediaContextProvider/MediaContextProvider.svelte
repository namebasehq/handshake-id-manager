<script lang="typescript" context="module">
  import { DeviceService } from '@services/device';
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import type { MediaContext, MediaQueryLists, MediaShape } from './types';

  const INIT_MEDIA_SHAPE: MediaShape = {
    classNames: '',
    matches: { xs: false, sm: false, md: false, lg: false },
  };

  const BREAKPOINTS = {
    lg: `(min-width: ${8 * 110}px)`,
    md: `(max-width: calc(${8 * 110}px - 1px))`,
    sm: `(max-width: calc(${8 * 96}px - 1px))`,
    xs: `(max-width: calc(${8 * 71}px - 1px))`,
  };
</script>

<script lang="typescript">
  const writeableMedia = writable<MediaShape>(INIT_MEDIA_SHAPE, (set) => {
    if (typeof window === 'undefined') return;

    let mediaQueryLists: MediaQueryLists = {};
    let updateMedia = () => set(calculateMedia(mediaQueryLists));

    for (let breakpoint in BREAKPOINTS) {
      let mediaQueryList = window.matchMedia(BREAKPOINTS[breakpoint]);

      mediaQueryLists[breakpoint] = mediaQueryList;
      mediaQueryLists[breakpoint].addListener(updateMedia);
    }

    updateMedia();

    return () => {
      for (let breakpoint in mediaQueryLists) {
        mediaQueryLists[breakpoint].removeListener(updateMedia);
      }
    };
  });

  const calculateMedia = (mqls: MediaQueryLists): MediaShape => {
    let media: MediaShape = INIT_MEDIA_SHAPE;
    let mediaClasses = [];

    for (let name in mqls) {
      if (name === 'xs' || name === 'sm' || name === 'md' || name === 'lg') {
        media.matches[name] = mqls[name].matches;
      }

      if (mqls[name].matches) {
        mediaClasses.push(`media-${name}`);
      }
    }

    media.classNames = mediaClasses.join(' ');
    return media;
  };

  const getDeviceId = () => {
    if (typeof window !== 'undefined') return DeviceService.getDeviceId();
  };

  setContext<MediaContext>('media', {
    media: writeableMedia,
    deviceId: getDeviceId(),
  });
</script>

<slot>
  <!-- children -->
</slot>
