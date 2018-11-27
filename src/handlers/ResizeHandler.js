import BaseHandler from './BaseHandler'
import { clientPosition, startEvent, moveEvent, endEvent } from '../utils'

const defaultOptions = {
  boundary: null, // { top, left, width, height },
  snapping: null, //{ x, y },
  widthRange: [],
  heightRange: []
}

const RESIZE_TYPES = {
  TL: 'top-left',
  TC: 'top-center',
  TR: 'top-right',
  LM: 'left-middle',
  RM: 'right-middle',
  BL: 'bottom-left',
  BC: 'bottom-center',
  BR: 'bottom-right'
}

class ResizeHandler extends BaseHandler {
  constructor (el, transformHelper, options = {}) {
    super(el, transformHelper)

    if (!Object.values(RESIZE_TYPES).includes(options.type)) {
      console.error(`ResizeHandler options.type ${options.type} value is not valid`)
      return
    }

    this.resizeHandlerType = options.type

    this._started = false
    this._lastSize = { top: 0, left: 0, width: 0, height: 0 }
    this._startPos = { x: 0, y: 0 }    
  }

  bindEvents () {
    this.el.addEventListener(startEvent(), this.onStart)
  }

  unbindEvents () {
    this.el.removeEventListener(startEvent(), this.onStart)
  }

  onStart = e => {
    e.preventDefault()
    e.stopPropagation()

    const { top, left, width, height } = this.transformHelper.transformer.descriptor
    
    this._lastSize = { top, left, width, height }
    this._startPos = clientPosition(e)
    this._started = true
    
    window.addEventListener(moveEvent(), this.onMove)
    window.addEventListener(endEvent(), this.onEnd)
  }

  onMove = e => {
    if (!this._started) {
      return
    }

    e.preventDefault()

    const { x, y } = clientPosition(e)
    const sizeValue = { ...this._lastSize }
    const deltaX = x - this._startPos.x
    const deltaY = y - this._startPos.y
    const bottom = sizeValue.top + sizeValue.height
    const right = sizeValue.left + sizeValue.width
    const newTop = sizeValue.top + deltaY
    const newLeft = sizeValue.left + deltaX

    switch (this.resizeHandlerType) {
      case RESIZE_TYPES.TL:
        sizeValue.top = Math.min(newTop, bottom)
        sizeValue.left = Math.min(newLeft, right)
        sizeValue.width -= deltaX
        sizeValue.height -= deltaY
      break;
      case RESIZE_TYPES.TC:
        sizeValue.top = Math.min(newTop, bottom)
        sizeValue.height -= deltaY
      break;
      case RESIZE_TYPES.TR:
        sizeValue.top = Math.min(newTop, bottom)
        sizeValue.width += deltaX
        sizeValue.height -= deltaY
      break;
      case RESIZE_TYPES.LM:
        sizeValue.left = Math.min(newLeft, right)
        sizeValue.width -= deltaX
      break;
      case RESIZE_TYPES.RM:
        sizeValue.width += deltaX
      break;
      case RESIZE_TYPES.BL:
        sizeValue.left = Math.min(newLeft, right)
        sizeValue.width -= deltaX
        sizeValue.height += deltaY
      break;
      case RESIZE_TYPES.BC:
        sizeValue.height += deltaY
      break;
      case RESIZE_TYPES.BR:
        sizeValue.width += deltaX
        sizeValue.height += deltaY
      break;
    }
    
    this.transform(sizeValue)
  }

  onEnd = () => {
    window.removeEventListener(moveEvent(), this.onMove)
    window.removeEventListener(endEvent(), this.onEnd)

    this._started = false
  }

  transform (sizeValue) {
    this.transformHelper.transform(sizeValue)
  }
}

ResizeHandler.RESIZE_TYPES = RESIZE_TYPES

export default ResizeHandler