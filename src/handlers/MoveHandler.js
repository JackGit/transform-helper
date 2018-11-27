import BaseHandler from './BaseHandler'
import { clientPosition, startEvent, moveEvent, endEvent } from '../utils'

const defaultOptions = {
  boundary: null, // { top, left, width, height },
  snapping: null, //{ x, y },
  direction: 'vertical|horizontal'
}

class MoveHandler extends BaseHandler {
  constructor (el, transformHelper, options) {
    super(el, transformHelper)
    this.options = { ...defaultOptions, ...(options || {}) }
    this._started = false
    this._lastPos = { x: 0, y: 0 }
    this._startPos = { x: 0, y: 0 }
  }

  bindEvents () {
    const { rootEl } = this.transformHelper
    rootEl.addEventListener(startEvent(), this.onStart)
  }

  unbindEvents () {
    this.el.removeEventListener(startEvent(), this.onStart)
  }

  onStart = e => {
    e.preventDefault()
    e.stopPropagation()

    const { top, left } = this.transformHelper.transformer.descriptor
    this._lastPos = { x: left, y: top }
    this._startPos = clientPosition(e)

    this._started = true

    window.addEventListener(moveEvent(), this.onMove)
    window.addEventListener(endEvent(), this.onEnd)
  }

  onMove = e => {
    if (!this._started) {
      return
    }

    e.stopPropagation()
    const { x, y } = clientPosition(e)

    const deltaX = x - this._startPos.x
    const deltaY = y - this._startPos.y
    
    this.transform({
      x: this._lastPos.x + deltaX,
      y: this._lastPos.y + deltaY
    })
  }

  onEnd = () => {
    window.removeEventListener(moveEvent(), this.onMove)
    window.removeEventListener(endEvent(), this.onEnd)

    this._started = false
  }

  transform ({ x, y }) {
    this.transformHelper.transform({ top: y, left: x })
  }
}

export default MoveHandler