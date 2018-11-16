import BaseHelper from './BaseHelper'

class RotateHelper extends BaseHelper {

  constructor (transformHelper) {
    super(transformHelper)

    this.el = null

    this._started = false
    this._lastRotation = 0
    this._startPos = { x: 0, y: 0 }
  }

  create () {
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
    this.el.removeEventListener('mousedown', this._startHandler)
  }

  _startHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const { rotation } = this.transformHelper.transformer.descriptor
    
    this._lastRotation = rotation
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

    const deltaDegree = deg(
      this.transformerHelper.transformer.pivotPoint(),
      this._startPos,
      { x: e.clientX, y: e.clientY }
    )

    this._transform(this._lastRotation + deltaDegree)
  }

  _endHandler = () => {
    window.removeEventListener('mousemove', this._moveHandler)
    window.removeEventListener('mouseup', this._endHandler)

    this._started = false
  }

  _transform (rotation) {
    this.transformHelper.transform({ rotation })
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