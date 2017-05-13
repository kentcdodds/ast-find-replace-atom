import path from 'path'

const find = require('../find')

const fixture = n => require.resolve(`./fixtures/${n}`)

test('finds nothing', () => {
  const result = find(fixture('nothing'))
  expect(result).toEqual([])
})

test('finds something', () => {
  const results = find(fixture('something'))
  expect(relativizePaths(results)).toMatchSnapshot()
})

/**
 * This takes the results object and removes environment-specific
 * elements from the path.
 * @param {Object} results - This is the results object from find
 * @return {Object} - The new results object with the clean paths
 */
function relativizePaths(results) {
  return Object.keys(results).reduce((obj, key) => {
    const newKey = key
      .replace(':/', ':\\')
      .replace(path.resolve(__dirname, '../..'), '<projectRootDir>')
      .replace(/\\/g, '/')
    obj[newKey] = results[key]
    return obj
  }, {})
}
