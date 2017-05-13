const path = require('path')
const babel = require('babel-core')
const glob = require('glob')

const babelOptions = {
  sourceMaps: false,
  plugins: [],
  parserOpts: {
    plugins: [
      // include all the things because why not?
      // 'estree', // except this one because why...?
      'jsx',
      'flow',
      'classConstructorCall',
      'doExpressions',
      'trailingFunctionCommas',
      'objectRestSpread',
      'decorators',
      'classProperties',
      'exportExtensions',
      'exponentiationOperator',
      'asyncGenerators',
      'functionBind',
      'functionSent',
      'dynamicImport',
      'asyncFunctions',
    ],
  },
}

function find(configFilePath) {
  delete require.cache[configFilePath]
  // eslint-disable-next-line import/no-dynamic-require
  const config = require(configFilePath)
  const findGlob = path.resolve(path.dirname(configFilePath), config.glob)
  const matchingFiles = glob.sync(findGlob)
  if (!matchingFiles.length) {
    return []
  }
  const visitors = config.worker(babel)
  const matches = {}
  const wrappedVisitors = filename => {
    return Object.keys(visitors).reduce((wrapped, visitorKey) => {
      wrapped[visitorKey] = function wrappedVisitor(...args) {
        const [astPath] = args
        const nodeMatches = visitors[visitorKey].call(this, ...args)
        if (nodeMatches) {
          matches[filename] = matches[filename] || []
          matches[filename].push(astPath.node.loc)
        }
      }
      return wrapped
    }, {})
  }
  matchingFiles.forEach(matchingFile => {
    babel.transformFileSync(matchingFile, {
      ...babelOptions,
      plugins: [() => ({visitor: wrappedVisitors(matchingFile)})],
    })
  })
  return matches
}

module.exports = find
