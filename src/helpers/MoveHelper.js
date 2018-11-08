import BaseHelper from './BaseHelper'

class MoveHelper extends BaseHelper {
  constructor () {
    super()
    this.el = null

    this._started = false

    this._pos = { x: 0, y: 0 }
    this._startPos = { x: 0, y: 0 }
    this._deltaPos = { x: 0, y: 0 }
  }

  bindEvents () {
    this.el.addEventListener('mousedown', this._startHandler)
    this.el.addEventListener('mouseup', this._endHandler)
  }

  unbindEvents () {
    this.el.removeEventListener('mousedown', this._startHandler)
    this.el.removeEventListener('mouseup', this._endHandler)
  }

  _startHandler = e => {
    this._started = true
    this._startX = e.clientX
    this._startY = e.clientY
    this._deltaX = this._deltaY = 0

    window.addEventListener('mousemove', this._moveHandler)
  }

  _endHandler = e => {
    this._started = false
    transformX += this._deltaX
    transformY += this._deltaY

    window.removeEventListener('mousemove', this._moveHandler)
  }

  _moveHandler = e => {
    if (this._started) {
      return
    }

    e.stopPropagation()

    this._deltaX = e.clientX - this._startX
    this._deltaY = e.clientY - this._startY

    this.update()
  }

  render () {
    return null
  }

  update () {
    // transform
  }
}

export default MoveHelper