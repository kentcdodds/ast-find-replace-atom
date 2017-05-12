const find = require('../find')

const fixture = n => require.resolve(`./fixtures/${n}`)

test('finds nothing', () => {
  const result = find(fixture('nothing'))
  expect(result).toEqual([])
})

test('finds something', () => {
  const result = find(fixture('something'))
  expect(result).toMatchSnapshot()
})
