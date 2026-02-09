#!/usr/bin/env node

import {build} from '@diplodoc/lint/esbuild';

build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    platform: 'node',
    outfile: 'dist/index.js',
});
