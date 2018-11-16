import BaseHelper from './BaseHelper'

// options: { boundary, snap, direction }

class MoveHelper extends BaseHelper {
  constructor (transformHelper) {
    super(transformHelper)

    this._started = false
    this._lastPos = { x: 0, y: 0 }
    this._startPos = { x: 0, y: 0 }
  }

  create () {
    this._bindEvents()
  }

  destroy () {
    this._unbindEvents()
  }

  update () {
    // do nothing
  }

  _bindEvents () {
    const { rootEl } = this.transformHelper
    rootEl.addEventListener('mousedown', this._startHandler)
  }

  _unbindEvents () {
    const { rootEl } = this.transformHelper
    rootEl.removeEventListener('mousedown', this._startHandler)
  }

  _startHandler = (e) => {
    const { top, left } = this.transformHelper.transformer.descriptor
    this._lastPos = { x: left, y: top }
    this._startPos = { x: e.clientX, y: e.clientY }

    this._started = true

    window.addEventListener('mousemove', this._moveHandler)
    window.addEventListener('mouseup', this._endHandler)
  }

  _endHandler = () => {
    this._started = false

    window.removeEventListener('mousemove', this._moveHandler)
    window.removeEventListener('mouseup', this._endHandler)
  }

  _moveHandler = (e) => {
    if (!this._started) {
      return
    }

    e.stopPropagation()

    const deltaX = e.clientX - this._startPos.x
    const deltaY = e.clientY - this._startPos.y
    
    this._transform({
      x: this._lastPos.x + deltaX,
      y: this._lastPos.y + deltaY
    })
  }

  _transform ({ x, y }) {
    this.transformHelper.transform({ top: y, left: x })
  }
}

export default MoveHelper