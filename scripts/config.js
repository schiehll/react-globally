const resolve = require('rollup-plugin-node-resolve')
const replace = require('rollup-plugin-replace')
const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const uglify = require('rollup-plugin-uglify')

const getPlugins = env => {
  const plugins = [
    resolve()
  ]

  if (env) {
    plugins.push(
      replace({
        'process.env.NODE_ENV': JSON.stringify(env)
      })
    )
  }

  plugins.push(
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: [
        ['es2015', { modules: false }],
        'stage-1',
        'react'
      ],
      plugins: ['external-helpers']
    }),
    commonjs({
      include: /node_modules/
    })
  )

  if (env === 'production') {
    plugins.push(uglify())
  }

  return plugins
}

const config = {
  input: 'src/index.js',
  globals: {
    react: 'React'
  },
  external: [
    'react'
  ],
  plugins: getPlugins(process.env.BUILD_ENV)
}

if (process.env.BUILD_NAME) {
  config.name = process.env.BUILD_NAME
}

module.exports = config
