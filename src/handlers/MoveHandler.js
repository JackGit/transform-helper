import BaseHandler from './BaseHandler'

class MoveHandler extends BaseHandler {
  constructor (el, transformHelper) {
    super(el, transformHelper)
    this._started = false
    this._lastPos = { x: 0, y: 0 }
    this._startPos = { x: 0, y: 0 }
  }

  bindEvents () {
    const { rootEl } = this.transformHelper
    rootEl.addEventListener('mousedown', this.onStart)
  }

  unbindEvents () {
    this.el.removeEventListener('mousedown', this.onStart)
  }

  onStart = e => {
    const { top, left } = this.transformHelper.transformer.descriptor
    this._lastPos = { x: left, y: top }
    this._startPos = { x: e.clientX, y: e.clientY }

    this._started = true

    window.addEventListener('mousemove', this.onMove)
    window.addEventListener('mouseup', this.onEnd)
  }

  onMove = e => {
    if (!this._started) {
      return
    }

    e.stopPropagation()

    const deltaX = e.clientX - this._startPos.x
    const deltaY = e.clientY - this._startPos.y
    
    this.transform({
      x: this._lastPos.x + deltaX,
      y: this._lastPos.y + deltaY
    })
  }

  onEnd = () => {
    window.removeEventListener('mousemove', this.onMove)
    window.removeEventListener('mouseup', this.onEnd)

    this._started = false
  }

  transform ({ x, y }) {
    this.transformHelper.transform({ top: y, left: x })
  }
}

export default MoveHandler