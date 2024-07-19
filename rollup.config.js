import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import postcss from 'rollup-plugin-postcss'
import postcssImport from 'postcss-import'
import autoprefixer from 'autoprefixer'
import terser from '@rollup/plugin-terser'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

const createConfig = (input, output) => ({
  input,
  output,
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      exclude: 'node_modules/**'
    }),
    terser(),
    postcss({
      include: 'src/styles.css',
      extract: 'styles.css',
      minimize: true,
      plugins: [postcssImport(), autoprefixer()]
    }),
    postcss({
      include: 'src/base.css',
      extract: 'base.css',
      minimize: true,
      plugins: [postcssImport(), autoprefixer()]
    })
  ]
})

export default [
  createConfig('src/animations.ts', [
    {
      file: 'dist/animations.js',
      format: 'esm',
      sourcemap: true
    }
  ]),
  createConfig('src/buttons.ts', [
    {
      file: 'dist/buttons.js',
      format: 'esm',
      sourcemap: true
    }
  ]),
  createConfig('src/colors.ts', [
    {
      file: 'dist/colors.js',
      format: 'esm',
      sourcemap: true
    }
  ]),
  createConfig('src/constants.ts', [
    {
      file: 'dist/constants.js',
      format: 'esm',
      sourcemap: true
    }
  ]),
  createConfig('src/form.ts', [
    {
      file: 'dist/form.js',
      format: 'esm',
      sourcemap: true
    }
  ]),
  createConfig('src/icons.ts', [
    {
      file: 'dist/icons.js',
      format: 'esm',
      sourcemap: true
    }
  ]),
  createConfig('src/index.ts', [
    {
      file: 'dist/index.js',
      format: 'esm',
      sourcemap: true
    }
  ]),
  createConfig('src/inputs.ts', [
    {
      file: 'dist/inputs.js',
      format: 'esm',
      sourcemap: true
    }
  ]),
  createConfig('src/types.ts', [
    {
      file: 'dist/types.js',
      format: 'esm',
      sourcemap: true
    }
  ]),
  {
    input: 'dist/types/src/animations.d.ts',
    output: [{ file: 'dist/animations.d.ts', format: 'esm' }],
    plugins: [dts.default()],
    external: [/\.css$/]
  },
  {
    input: 'dist/types/src/buttons.d.ts',
    output: [{ file: 'dist/buttons.d.ts', format: 'esm' }],
    plugins: [dts.default()],
    external: [/\.css$/]
  },
  {
    input: 'dist/types/src/colors.d.ts',
    output: [{ file: 'dist/colors.d.ts', format: 'esm' }],
    plugins: [dts.default()],
    external: [/\.css$/]
  },
  {
    input: 'dist/types/src/constants.d.ts',
    output: [{ file: 'dist/constants.d.ts', format: 'esm' }],
    plugins: [dts.default()],
    external: [/\.css$/]
  },
  {
    input: 'dist/types/src/form.d.ts',
    output: [{ file: 'dist/form.d.ts', format: 'esm' }],
    plugins: [dts.default()],
    external: [/\.css$/]
  },
  {
    input: 'dist/types/src/icons.d.ts',
    output: [{ file: 'dist/icons.d.ts', format: 'esm' }],
    plugins: [dts.default()],
    external: [/\.css$/]
  },
  {
    input: 'dist/types/src/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts.default()],
    external: [/\.css$/]
  },
  {
    input: 'dist/types/src/inputs.d.ts',
    output: [{ file: 'dist/inputs.d.ts', format: 'esm' }],
    plugins: [dts.default()],
    external: [/\.css$/]
  },
  {
    input: 'dist/types/src/types.d.ts',
    output: [{ file: 'dist/types.d.ts', format: 'esm' }],
    plugins: [dts.default()],
    external: [/\.css$/]
  }
]
