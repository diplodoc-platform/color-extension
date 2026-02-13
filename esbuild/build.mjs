#!/usr/bin/env node

import {build} from '@diplodoc/lint/esbuild';

import tsConfig from '../tsconfig.json' with {type: 'json'};

/** @type {import('esbuild').BuildOptions} */
const common = {
    bundle: true,
    sourcemap: true,
    target: tsConfig.compilerOptions?.target ?? 'es2022',
    tsconfig: './tsconfig.json',
};

build({
    ...common,
    entryPoints: ['src/index.ts'],
    platform: 'node',
    outfile: 'build/index.js',
    minify: true,
});
