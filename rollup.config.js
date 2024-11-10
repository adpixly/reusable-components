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
      tsconfig: './tsconfig.build.json',
      exclude: 'node_modules/**'
    }),
    terser(),
    postcss({
      include: 'reusable-components/styles.css',
      extract: 'styles.css',
      minimize: true,
      plugins: [postcssImport(), autoprefixer()]
    }),
    postcss({
      include: 'reusable-components/base.css',
      extract: 'base.css',
      minimize: true,
      plugins: [postcssImport(), autoprefixer()]
    })
  ]
})

export default [
  createConfig('reusable-components/animations.ts', [
    {
      file: 'dist/animations.js',
      format: 'esm',
      sourcemap: true
    }
  ]),
  createConfig('reusable-components/buttons.ts', [
    {
      file: 'dist/buttons.js',
      format: 'esm',
      sourcemap: true
    }
  ]),
  createConfig('reusable-components/colors.ts', [
    {
      file: 'dist/colors.js',
      format: 'esm',
      sourcemap: true
    }
  ]),
  createConfig('reusable-components/constants.ts', [
    {
      file: 'dist/constants.js',
      format: 'esm',
      sourcemap: true
    }
  ]),
  createConfig('reusable-components/form.ts', [
    {
      file: 'dist/form.js',
      format: 'esm',
      sourcemap: true
    }
  ]),
  createConfig('reusable-components/icons.ts', [
    {
      file: 'dist/icons.js',
      format: 'esm',
      sourcemap: true
    }
  ]),
  createConfig('reusable-components/index.ts', [
    {
      file: 'dist/index.js',
      format: 'esm',
      sourcemap: true
    }
  ]),
  createConfig('reusable-components/inputs.ts', [
    {
      file: 'dist/inputs.js',
      format: 'esm',
      sourcemap: true
    }
  ]),
  createConfig('reusable-components/types.ts', [
    {
      file: 'dist/types.js',
      format: 'esm',
      sourcemap: true
    }
  ]),
  {
    input: 'dist/reusable-components/animations.d.ts',
    output: [{ file: 'dist/animations.d.ts', format: 'esm' }],
    plugins: [
      dts.default({
        tsconfig: './tsconfig.build.json'
      })
    ],
    external: [/\.css$/]
  },
  {
    input: 'dist/reusable-components/buttons.d.ts',
    output: [{ file: 'dist/buttons.d.ts', format: 'esm' }],
    plugins: [
      dts.default({
        tsconfig: './tsconfig.build.json'
      })
    ],
    external: [/\.css$/]
  },
  {
    input: 'dist/reusable-components/colors.d.ts',
    output: [{ file: 'dist/colors.d.ts', format: 'esm' }],
    plugins: [
      dts.default({
        tsconfig: './tsconfig.build.json'
      })
    ],
    external: [/\.css$/]
  },
  {
    input: 'dist/reusable-components/constants.d.ts',
    output: [{ file: 'dist/constants.d.ts', format: 'esm' }],
    plugins: [
      dts.default({
        tsconfig: './tsconfig.build.json'
      })
    ],
    external: [/\.css$/]
  },
  {
    input: 'dist/reusable-components/form.d.ts',
    output: [{ file: 'dist/form.d.ts', format: 'esm' }],
    plugins: [
      dts.default({
        tsconfig: './tsconfig.build.json'
      })
    ],
    external: [/\.css$/]
  },
  {
    input: 'dist/reusable-components/icons.d.ts',
    output: [{ file: 'dist/icons.d.ts', format: 'esm' }],
    plugins: [
      dts.default({
        tsconfig: './tsconfig.build.json'
      })
    ],
    external: [/\.css$/]
  },
  {
    input: 'dist/reusable-components/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [
      dts.default({
        tsconfig: './tsconfig.build.json'
      })
    ],
    external: [/\.css$/]
  },
  {
    input: 'dist/reusable-components/inputs.d.ts',
    output: [{ file: 'dist/inputs.d.ts', format: 'esm' }],
    plugins: [
      dts.default({
        tsconfig: './tsconfig.build.json'
      })
    ],
    external: [/\.css$/]
  },
  {
    input: 'dist/reusable-components/types.d.ts',
    output: [{ file: 'dist/types.d.ts', format: 'esm' }],
    plugins: [
      dts.default({
        tsconfig: './tsconfig.build.json'
      })
    ],
    external: [/\.css$/]
  }
]
