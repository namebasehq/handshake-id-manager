## Getting started

### Running the project

To get started developing, consult [sapper.svelte.dev](https://sapper.svelte.dev).

```bash
npm install # or yarn
npm run dev
```

This will start the development server on [localhost:3000](http://localhost:3000). Open it and click around.

## Handshake login protocol and OIDC implementation

<img style="max-width: 500px;width:100%" src="https://gblobscdn.gitbook.com/assets%2F-MNZhYK2a4LAwJY1run-%2F-MVXMGK7y0Fyg_EtgBfP%2F-MVXMq54Te3Vs9CPTwDM%2FSequence%20diagram.png?alt=media&token=9a8ebb71-f01f-4dca-9d55-953cf62f28e5" alt="Sequence diagram outlining the OIDC Authentication flow with Handshake
">

Sequence diagram outlining the OIDC Authentication flow with Handshake

### Protocol

https://docs.namebase.io/handshake-login/handshake-based-oidc-authentication-protocol

### OIDC Implementation Guide

https://docs.namebase.io/handshake-login/oidc

## Project structure

### Routes - src/routes

- create: generates key pair, stores the identity and helps creating the TXT records

- list: view to manage the identities

- login: handle signing and redirects during the OIDC flow

### Providers | Context - src/providers

- AnnouncementContext: handles banner messaging
- IdentitiesContext: provides interfaces to manipulate identities
- LoadingContext: handles loading bar at the top
- LoginContext: handles metadata during the OIDC flow
- MediaContext: deals with media query

### Services

- IdentityService: provides an easy way to handle indentity by abstracting crypto and storage.

```
// name: handshake name
// hnsRandom: anti replay attack from oidc
signAndGetpublicKey(name: string, hnsRandom: string)
```

- DeviceService: provides an abstraction to handle device specific data.

### Components

- UI Components like navbar, icons, name/, ...

## Join the community

Ask in the Namer Community Discord's
https://discord.com/invite/V3aTrkp
