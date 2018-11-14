import BaseHelper from './BaseHelper'

class RotateHelper {

  constructor (transformHelper) {
    this.transformHelper = transformHelper
    this.el = null

    this._started = false
    this._lastRotation = 0
    this._startPos = { x: 0, y: 0 }
    this._pivotPos = { x: 0, y: 0 }

    this._startHandler = this._startHandler.bind(this)
    this._moveHandler = this._moveHandler.bind(this)
    this._endHandler = this._endHandler.bind(this)

    this.init()
  }

  init () {
    this.createHelperUI()
    this.bindEvents()
  }

  createHelperUI () {
    const { rootEl } = this.transformHelper
    const el = document.createElement('div')
    el.style.position = 'absolute'
    el.style.top = '-50%'
    el.style.left = '50%'
    el.style.width = '10px'
    el.style.height = '10px'
    el.style.background = 'red'
    el.style.transform = 'translateX(-50%)'
    rootEl.appendChild(el)
    this.el = el
  }

  bindEvents () {
    this.el.addEventListener('mousedown', this._startHandler)
  }

  _startHandler (e) {
    e.preventDefault()
    e.stopPropagation()

    const { top, left, width, height } = this.transformHelper.transformations
    this._started = true
    this._lastRotation = this.getRotation()
    this._startPos = { x: e.clientX, y: e.clientY }
    this._pivotPos = {
      x: left + width / 2,
      y: top + height / 2
    }
    console.log(this._pivotPos)

    window.addEventListener('mousemove', this._moveHandler)
    window.addEventListener('mouseup', this._endHandler)
  }

  _moveHandler (e) {
    if (!this._started) {
      return
    }

    e.preventDefault()


    const deltaDegree = deg(
      this._pivotPos,
      this._startPos,
      { x: e.clientX, y: e.clientY }
    )

    this.update(this._lastRotation + deltaDegree)
  }

  _endHandler () {
    window.removeEventListener('mousemove', this._moveHandler)
    window.removeEventListener('mouseup', this._endHandler)

    this._started = false
  }

  getRotation () {
    return this.transformHelper.transformations.rotation
  }

  syncRotation (value) {
    this.transformHelper.transformations.rotation = value
  }
  
  update (rotation) {
    this.syncRotation(rotation)

    const { top, left } = this.transformHelper.transformations
    this.transformHelper.rootEl.style.transform = 
    `translateX(${left}px) translateY(${top}px) rotate(${rotation}deg)`
  }
}

// rad => deg
const rad2Deg = v => {
  return v * 180 / Math.PI
}

const deg = (
  cp, // center point
  sp, // start point
  ep  // end point
) => {
  const rad = Math.atan2(ep.y - cp.y, ep.x - cp.x) - Math.atan2(sp.y - cp.y, sp.x - cp.x)
  return rad2Deg(rad)
}

export default RotateHelper