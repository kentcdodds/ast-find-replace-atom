// eslint-disable-next-line
import { CompositeDisposable, Disposable } from 'atom';
import FindInfoView from './find-info-view'

class ASTFindReplace {
  subscriptions = null

  activate() {
    this.subscriptions = new CompositeDisposable(
      atom.workspace.addOpener(uri => {
        if (uri === 'atom://ast-find-replace') {
          return new FindInfoView()
        }
        return null
      }),
      new Disposable(() => {
        atom.workspace.getPaneItems().forEach(item => {
          if (item instanceof FindInfoView) {
            item.destroy()
          }
        })
      }),
    )
    this.subscriptions.add(
      atom.commands.add('atom-workspace', 'ast-find-replace:find', () => {
        const editor = atom.workspace.getActiveTextEditor()
        if (!editor) {
          return
        }
        atom.workspace.open('atom://ast-find-replace')
      }),
    )
  }
  deactivate() {
    this.subscriptions.dispose()
  }
  deserializeActiveFindInfoView() {
    return new FindInfoView()
  }
}

export default ASTFindReplace
