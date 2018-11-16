import BaseHelper from './BaseHelper'

const RESIZE_TYPES = {
  TL: { key: 'top-left', top: '0', left: '0' },
  TC: { key: 'top-center', top: '0', left: '50%' },
  TR: { key: 'top-right', top: '0', left: '100%' },
  LC: { key: 'left-center', top: '50%', left: '0' },
  RC: { key: 'right-center', top: '50%', left: '100%' },
  BL: { key: 'bottom-left', top: '100%', left: '0' },
  BC: { key: 'bottom-center', top: '100%', left: '50%' },
  BR: { key: 'bottom-right', top: '100%', left: '100%' },
}

class ResizeHelper extends BaseHelper {

  constructor (transformHelper) {
    super(transformHelper)
    this.el = null

    this._started = false
    this._lastSize = { top: 0, left: 0, width: 0, height: 0 }
    this._startPos = { x: 0, y: 0 }

    this._resizeType = ''
  }

  create () {
    const { rootEl } = this.transformHelper
    const el = document.createElement('div')
    el.style.position = 'absolute'
    el.style.width = '100%'
    el.style.height = '100%'
    
    Object.values(RESIZE_TYPES).forEach(type => {
      const point = document.createElement('div')
      point.style.position = 'absolute'
      point.style.display = 'inline-block'
      point.style.width = '9px'
      point.style.height = '9px'
      point.style.background = 'red'
      point.style.top = type.top
      point.style.left = type.left
      point.style.transform = 'translateX(-50%) translateY(-50%)'
      point.dataset.resizeType = type.key
      el.appendChild(point)
    })

    rootEl.appendChild(el)
    this.el = el

    this._bindEvents()
  }

  destroy () {
    this._unbindEvents()
    this.el.remove()
    this.el = null
  }

  update (descriptor) {
    // do nothing
  }

  _bindEvents () {
    this.el.addEventListener('mousedown', this._startHandler)
  }

  _unbindEvents () {
    this.el.addEventListener('mousedown', this._startHandler)
  }

  _startHandler = (e) => {
    const { resizeType } = e.target.dataset

    if (!resizeType) {
      return
    }

    e.preventDefault()
    e.stopPropagation()

    const { top, left, width, height } = this.transformHelper.transformer.descriptor
    
    this._resizeType = resizeType
    this._lastSize = { top, left, width, height }
    this._startPos = { x: e.clientX, y: e.clientY }
    this._started = true
    
    window.addEventListener('mousemove', this._moveHandler)
    window.addEventListener('mouseup', this._endHandler)
  }

  _moveHandler = (e) => {
    if (!this._started) {
      return
    }

    e.preventDefault()

    const sizeValue = { ...this._lastSize }
    const deltaX = e.clientX - this._startPos.x
    const deltaY = e.clientY - this._startPos.y

    switch (this._resizeType) {
      case RESIZE_TYPES.TL.key:
        sizeValue.top += deltaY
        sizeValue.left += deltaX
        sizeValue.width -= deltaX
        sizeValue.height -= deltaY
      break;
      case RESIZE_TYPES.TC.key:
        sizeValue.top = Math.min(sizeValue.top + deltaY, sizeValue.top + sizeValue.height)
        sizeValue.height -= deltaY
      break;
      case RESIZE_TYPES.TR.key:
        sizeValue.top += deltaY
        sizeValue.width += deltaX
        sizeValue.height -= deltaY
      break;
      case RESIZE_TYPES.LC.key:
        sizeValue.left = Math.min(sizeValue.left + deltaX, sizeValue.left + sizeValue.width)
        sizeValue.width -= deltaX
      break;
      case RESIZE_TYPES.RC.key:
        sizeValue.width += deltaX
      break;
      case RESIZE_TYPES.BL.key:
        sizeValue.left += deltaX
        sizeValue.width -= deltaX
        sizeValue.height += deltaY
      break;
      case RESIZE_TYPES.BC.key:
        sizeValue.height += deltaY
      break;
      case RESIZE_TYPES.BR.key:
        sizeValue.width += deltaX
        sizeValue.height += deltaY
      break;
    }
    
    this._transform(sizeValue)
  }

  _endHandler = () => {
    window.removeEventListener('mousemove', this._moveHandler)
    window.removeEventListener('mouseup', this._endHandler)

    this._started = false
  }

  _transform (sizeValue) {
    this.transformHelper.transform(sizeValue)
  }
}

export default ResizeHelper