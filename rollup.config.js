import { terser } from 'rollup-plugin-terser';
import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import config from 'sapper/config/rollup.js';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';
import typescript from '@rollup/plugin-typescript';
import path from "path";
const { createPreprocessors } = require('./svelte.config.js');
import pkg from './package.json';

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

const aliases = alias({
	resolve: ['.svelte', '.js', '.ts', '.d.ts'],
	entries: [
		{ find: '@components', replacement: path.resolve(__dirname, 'src/components') },
		{ find: '@Hashbrown', replacement: path.resolve(__dirname, 'src/packages/Hashbrown') },
		{ find: '@providers', replacement: path.resolve(__dirname, "src/providers") },
	],
});

export default {
	client: {
		input: config.client.input().replace(/\.js$/, '.ts'),
		output: config.client.output(),
		plugins: [
			aliases,
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode),
			}),
			svelte({
				preprocess,
				compilerOptions: { dev, hydratable: true },
			}),
			resolve({ browser: true, dedupe: ['svelte'] }),
			commonjs(),
			typescript({ sourceMap: !!sourcemap }),
			legacy && babel({
				extensions: ['.js', '.mjs', '.html', '.svelte'],
				babelHelpers: 'runtime',
				exclude: ['node_modules/@babel/**'],
				presets: [
					[
						'@babel/preset-env',
						{ targets: '> 0.25%, not dead' },
					],
				],
				plugins: [
					'@babel/plugin-syntax-dynamic-import',
					[
						'@babel/plugin-transform-runtime',
						{ useESModules: true },
					],
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
			resolve({ dedupe: ['svelte'] }),
			commonjs(),
			typescript({ sourceMap: !!sourcemap }),
		],
		external: Object.keys(pkg.dependencies).concat(require('module').builtinModules),
		preserveEntrySignatures: 'strict',
		onwarn,
	},
};
