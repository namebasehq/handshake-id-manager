import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import path from 'path';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';
import config from 'sapper/config/rollup.js';
import pkg from './package.json';

const { createPreprocessors } = require('./svelte.config.js');

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const legacy = !!process.env.SAPPER_LEGACY_BUILD;
const sourcemap = dev ? 'inline' : false;
const preprocess = createPreprocessors({ sourceMap: !!sourcemap });

const onwarn = (warning, onwarn) =>
  (warning.code === 'MISSING_EXPORT' && /'preload'/.test(warning.message)) ||
  (warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) ||
  warning.code === 'THIS_IS_UNDEFINED' ||
  onwarn(warning);

const customResolver = resolve({
  extensions: ['.svelte', '.js', '.ts', '.d.ts'],
});
const aliases = alias({
  customResolver,
  entries: [
    { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
    { find: '@Hashbrown', replacement: path.resolve(__dirname, 'src/packages/Hashbrown') },
    { find: '@providers', replacement: path.resolve(__dirname, 'src/providers') },
    { find: '@services', replacement: path.resolve(__dirname, 'src/services') },
  ],
});

export default {
  client: {
    input: config.client.input().replace(/\.js$/, '.ts'),
    output: config.client.output(),
    plugins: [
      commonjs({
        dynamicRequireTargets: 'dns-packet',
      }),
      globals(),
      builtins(),
      aliases,
      replace({
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
      svelte({
        preprocess,
        compilerOptions: { dev, hydratable: true },
      }),
      resolve({ browser: true, dedupe: ['svelte'], preferBuiltins: false }),

      typescript({ sourceMap: !!sourcemap }),
      legacy &&
        babel({
          extensions: ['.js', '.mjs', '.html', '.svelte'],
          babelHelpers: 'runtime',
          exclude: ['node_modules/@babel/**'],
          presets: [['@babel/preset-env', { targets: '> 0.25%, not dead' }]],
          plugins: [
            '@babel/plugin-syntax-dynamic-import',
            ['@babel/plugin-transform-runtime', { useESModules: true }],
          ],
        }),
      !dev && terser({ module: true }),
    ],
    preserveEntrySignatures: false,
    onwarn,
  },

  server: {
    input: { server: config.server.input().server.replace(/\.js$/, '.ts') },
    output: config.server.output(),
    plugins: [
      aliases,
      replace({
        'process.browser': false,
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
      svelte({
        preprocess,
        compilerOptions: { dev, generate: 'ssr', hydratable: true },
        emitCss: false,
      }),
      resolve({ dedupe: ['svelte'], preferBuiltins: false }),
      commonjs(),
      typescript({ sourceMap: !!sourcemap }),
    ],
    external: Object.keys(pkg.dependencies).concat(require('module').builtinModules),
    preserveEntrySignatures: 'strict',
    onwarn,
  },
};
