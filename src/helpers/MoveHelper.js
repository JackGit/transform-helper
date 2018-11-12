import BaseHelper from './BaseHelper'

class MoveHelper {
  constructor (transformHelper) {
    this.transformHelper = transformHelper

    this._started = false

    this._lastPos = { x: 0, y: 0 }
    this._startPos = { x: 0, y: 0 }

    this.moveHandler = this._moveHandler.bind(this)
    this.startHandler = this._startHandler.bind(this)
    this.endHandler = this._endHandler.bind(this)

    this.bindEvents()
  }

  bindEvents () {
    console.log('bindevent')
    const { rootEl } = this.transformHelper
    rootEl.addEventListener('mousedown', this.startHandler)
  }

  unbindEvents () {
    const { rootEl } = this.transformHelper
    rootEl.removeEventListener('mousedown', this.startHandler)
  }

  _startHandler (e) {
    console.log('start')
    this._started = true
    this._lastPos = this.getPosition()
    this._startPos = {
      x: e.clientX,
      y: e.clientY
    }

    window.addEventListener('mousemove', this.moveHandler)
    window.addEventListener('mouseup', this.endHandler)
  }

  _endHandler (e) {
    console.log('end')
    this._started = false

    window.removeEventListener('mousemove', this.moveHandler)
    window.removeEventListener('mouseup', this.endHandler)
  }

  _moveHandler (e) {
    console.log('move', this._started)
    if (!this._started) {
      return
    }

    e.stopPropagation()

    const deltaX = e.clientX - this._startPos.x
    const deltaY = e.clientY - this._startPos.y
    
    this.update({
      x: this._lastPos.x + deltaX,
      y: this._lastPos.y + deltaY
    })
  }

  render () {
    return null
  }

  getPosition () {
    return {
      x: this.transformHelper.transformations.left,
      y: this.transformHelper.transformations.top
    }
  }

  syncPosition ({ x, y }) {
    this.transformHelper.transformations.left = x
    this.transformHelper.transformations.top = y
  }

  update ({ x, y }) {
    // transform
    console.log(this._deltaPos)
    this.syncPosition({ x, y })

    const { top, left, rotation } = this.transformHelper.transformations
    this.transformHelper.rootEl.style.transform = 
    `translateX(${left}px) translateY(${top}px) rotate(${rotation}deg)`
  }
}

export default MoveHelper