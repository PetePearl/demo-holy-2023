import { readFile, writeFile } from 'fs/promises'
import path from 'path'

import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import css from 'rollup-plugin-css-only'
import pluginReplace from '@rollup/plugin-replace'
import linaria from '@linaria/rollup'

const isProduction = process.env.NODE_ENV === 'production'

function htmlPlugin() {
  const replace = (source, search, replacement) => {
    const index = source.indexOf(search)

    return (
      source.slice(0, Math.max(0, index)) +
      replacement +
      source.slice(Math.max(0, index + search.length))
    )
  }

  return {
    name: 'figma-vars-plugin-ui',
    version: '1.0.0',
    async writeBundle(options, bundle) {
      const tpl = 'ui.html'

      const buffer = await readFile(path.join('src', tpl))
      let html = buffer.toString()

      html = replace(html, '/* style.css */', bundle['style.css'].source)
      html = replace(html, '/* main.js */', bundle['main.js'].code)

      await writeFile(path.join(options.dir, tpl), html)
    },
  }
}

export default [
  {
    input: 'src/main.tsx',
    output: {
      dir: 'lib',
      format: 'esm',
      sourcemap: true,
      entryFileNames: '[name].js',
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript(),
      babel(),
      linaria.default({ sourceMap: !isProduction }),
      css({ output: 'style.css' }),
      pluginReplace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
      }),
      htmlPlugin(),
    ],
  },
  {
    input: 'src/api/code.ts',
    output: {
      dir: 'lib',
      format: 'esm',
      sourcemap: true,
      entryFileNames: '[name].js',
    },
    plugins: [resolve(), typescript()],
  },
]
