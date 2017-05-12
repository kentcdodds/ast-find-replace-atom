module.exports = {
  glob: './findables/file*.js',
  worker() {
    return {
      Identifier(path) {
        return path.node.name === 'console'
      },
    }
  },
}
