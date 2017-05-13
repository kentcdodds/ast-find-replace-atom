import React from 'react'
import ReactDOM from 'react-dom'

export default class FindInfoView {
  constructor() {
    // Create root element
    this.element = document.createElement('div')
    this.element.classList.add('ast-find-replace')

    // Create message element
    const message = document.createElement('div')
    message.textContent = "The ActiveEditorInfo package is Alive! It's ALIVE!"
    message.classList.add('message')
    this.element.appendChild(message)

    this.subscriptions = atom.workspace.observeActivePaneItem(item => {
      if (!atom.workspace.isTextEditor(item)) {
        return
      }
      const filePath = item.getPath()
      const results = require('./find')(filePath)
      ReactDOM.render(
        <div>
          <h2>{filePath || 'untitled'}</h2>
          <ul>
            {Object.keys(results).map((foundFile, i) => (
              <li key={i}>{foundFile}: {JSON.stringify(results[foundFile])}</li>
            ))}
          </ul>
        </div>,
        message,
      )
    })
  }

  getTitle() {
    // Used by Atom for tab text
    return 'AST Find Results'
  }

  getDefaultLocation() {
    // This location will be used if the user hasn't overridden it
    // by dragging the item elsewhere.
    // Valid values are "left", "right", "bottom", and "center" (the default).
    return 'right'
  }

  getAllowedLocations() {
    // The locations into which the item can be moved.
    return ['left', 'right', 'bottom']
  }

  getURI() {
    // Used by Atom to identify the view when toggling.
    return 'atom://ast-find-replace'
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {
    return {
      deserializer: 'ast-find-replace/FindInfoView',
    }
  }

  // Tear down any state and detach
  destroy() {
    this.element.remove()
    this.subscriptions.dispose()
  }

  getElement() {
    return this.element
  }
}
