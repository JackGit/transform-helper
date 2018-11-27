import BaseHandler from './BaseHandler'
import { clientPosition, startEvent, moveEvent, endEvent } from '../utils'

const defaultOptions = {
  rotationRange: [],
  snapping: 1
}

class RotateHandler extends BaseHandler {
  constructor (el, transformHelper) {
    super(el, transformHelper)
    this._started = false
    this._lastRotation = 0
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

    const { rotation } = this.transformHelper.transformer.descriptor
    
    this._lastRotation = rotation
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

    const deltaDegree = deg(
      this.transformHelper.transformer.pivotPoint(),
      this._startPos,
      clientPosition(e)
    )

    this.transform(this._lastRotation + deltaDegree)
  }

  onEnd = () => {
    window.removeEventListener(moveEvent(), this.onMove)
    window.removeEventListener(endEvent(), this.onEnd)

    this._started = false
  }

  transform (rotation) {
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

export default RotateHandler