## Getting started

### Running the project

Once you have created the project, install dependencies and run the project in development mode:

```bash
npm install # or yarn
npm run dev
```

This will start the development server on [localhost:3000](http://localhost:3000). Open it and click around.

You now have a fully functional Sapper project! To get started developing, consult [sapper.svelte.dev](https://sapper.svelte.dev).

### Using TypeScript

By default, the template uses plain JavaScript. If you wish to use TypeScript instead, you need some changes to the project:

 * Add `typescript` as well as typings as dependences in `package.json`
 * Configure the bundler to use [`svelte-preprocess`](https://github.com/sveltejs/svelte-preprocess) and transpile the TypeScript code.
 * Add a `tsconfig.json` file
 * Update the project code to TypeScript

The template comes with a script that will perform these changes for you by running

```bash
node scripts/setupTypeScript.js
```

`@sapper` dependencies are resolved through `src/node_modules/@sapper`, which is created during the build. You therefore need to run or build the project once to avoid warnings about missing dependencies.

The script does not support webpack at the moment.

## Directory structure

Sapper expects to find two directories in the root of your project —  `src` and `static`.


### src

The [src](src) directory contains the entry points for your app — `client.js`, `server.js` and (optionally) a `service-worker.js` — along with a `template.html` file and a `routes` directory.

