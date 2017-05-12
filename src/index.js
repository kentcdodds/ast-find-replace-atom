// eslint-disable-next-line import/no-extraneous-dependencies
const {CompositeDisposable} = require('atom')

function activate() {
  const subscriptions = new CompositeDisposable()
  subscriptions.add(
    atom.commands.add('atom-workspace', 'ast-find-and-replace:find', () => {
      const editor = atom.workspace.getActiveTextEditor()
      if (!editor) {
        return
      }
      const filePath = editor.getBuffer().file.path
      require('./find')(filePath)
      // const bufferRange = editor.getBuffer().getRange()
      // const cursorPositionPriorToFormat = editor.getCursorScreenPosition()
      // const textToTransform = editor.getTextInBufferRange(bufferRange)
      // console.log(textToTransform)
      // const transformed = executePrettier(editor, textToTransform)

      // const isTextUnchanged = transformed === textToTransform
      // if (!transformed || isTextUnchanged) {
      //   return
      // }

      // editor.setTextInBufferRange(bufferRange, transformed)
      // editor.setCursorScreenPosition(cursorPositionPriorToFormat)
    }),
  )
}

export {activate}
