import BaseHandler from './BaseHandler'

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
  constructor (el, transformerHelper, options = {}) {
    super(el, transformerHelper)

    if (!Object.values(RESIZE_TYPES).includes(options.type)) {
      console.error(`ResizeHandler options.type value is not valid`)
      return
    }

    this.resizeHandlerType = options.type

    this._started = false
    this._lastSize = { top: 0, left: 0, width: 0, height: 0 }
    this._startPos = { x: 0, y: 0 }    
  }

  bindEvents () {
    this.el.addEventListener('mousedown', this.onStart)
  }

  unbindEvents () {
    this.el.removeEventListener('mousedown', this.onStart)
  }

  onStart = e => {
    e.preventDefault()
    e.stopPropagation()

    const { top, left, width, height } = this.transformHelper.transformer.descriptor
    
    this._lastSize = { top, left, width, height }
    this._startPos = { x: e.clientX, y: e.clientY }
    this._started = true
    
    window.addEventListener('mousemove', this.onMove)
    window.addEventListener('mouseup', this.onEnd)
  }

  onMove = e => {
    if (!this._started) {
      return
    }

    e.preventDefault()

    const sizeValue = { ...this._lastSize }
    const deltaX = e.clientX - this._startPos.x
    const deltaY = e.clientY - this._startPos.y

    switch (this.resizeHandlerType) {
      case RESIZE_TYPES.TL:
        sizeValue.top += deltaY
        sizeValue.left += deltaX
        sizeValue.width -= deltaX
        sizeValue.height -= deltaY
      break;
      case RESIZE_TYPES.TC:
        sizeValue.top = Math.min(sizeValue.top + deltaY, sizeValue.top + sizeValue.height)
        sizeValue.height -= deltaY
      break;
      case RESIZE_TYPES.TR:
        sizeValue.top += deltaY
        sizeValue.width += deltaX
        sizeValue.height -= deltaY
      break;
      case RESIZE_TYPES.LM:
        sizeValue.left = Math.min(sizeValue.left + deltaX, sizeValue.left + sizeValue.width)
        sizeValue.width -= deltaX
      break;
      case RESIZE_TYPES.RM:
        sizeValue.width += deltaX
      break;
      case RESIZE_TYPES.BL:
        sizeValue.left += deltaX
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
    window.removeEventListener('mousemove', this.onMove)
    window.removeEventListener('mouseup', this.onEnd)

    this._started = false
  }

  transform (sizeValue) {
    this.transformHelper.transform(sizeValue)
  }
}

ResizeHandler.RESIZE_TYPES = RESIZE_TYPES

export default ResizeHandler