class RotateHandler extends BaseHandler {
  constructor (el, transformerHelper) {
    super(el, transformerHelper)
    this._started = false
    this._lastRotation = 0
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

    const { rotation } = this.transformHelper.transformer.descriptor
    
    this._lastRotation = rotation
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

    const deltaDegree = deg(
      this.transformerHelper.transformer.pivotPoint(),
      this._startPos,
      { x: e.clientX, y: e.clientY }
    )

    this.transform(this._lastRotation + deltaDegree)
  }

  onEnd = () => {
    window.removeEventListener('mousemove', this.onMove)
    window.removeEventListener('mouseup', this.onEnd)

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