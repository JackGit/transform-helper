const normalizeDescriptor = ({
  width, height, ...rest
}) => ({
  width: Math.max(0, width),
  height: Math.max(0, height),
  ...rest
})

export const updateByDescriptor = (el, {
  top, left, width, height, rotation
}) => {
  el.style.top = top + 'px'
  el.style.left = left + 'px'
  el.style.width = width + 'px'
  el.style.width = height + 'px'
  el.style.transform = `rotate(${rotation}deg)`
}

export const transformByDescriptor = (el, {
  top, left, width, height, rotation
}) => {
  el.style.width = width + 'px'
  el.style.width = height + 'px'
  el.style.transform = `translateX(${left}px) translateY(${top}px) rotate(${rotation}deg)`
}

const defaultOptions = {
  useTransform: false,
  descriptor: {}
}

export default class Transfomer {
  /**
   * 
   * @param {Element} el has to be an absolute/fixed position element 
   * @param {Object} descriptor 
   */
  constructor (el, options = {}) {
    this.el = el
    this.options = { ...defaultOptions, ...options }
    this.descriptor = {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      rotation: 0,
      ...this.options.descriptor, // do not override privo for now
      pivot: { x: .5, y: .5 }
    }

    this.transform()
  }

  pivotPoint () {
    const { top, left, width, height, pivot } = this.descriptor
    return {
      x: left + width * pivot.x,
      y: top + height * pivot.y
    }
  }

  transform (descriptor = {}) {
    this.descriptor = normalizeDescriptor({
      ...this.descriptor,
      ...descriptor
    })

    if (this.options.useTransform) {
      transformByDescriptor(this.el, this.descriptor)
    } else {
      updateByDescriptor(this.el, this.descriptor)
    }
  }

  move (x = 0, y = 0) {
    this.transform({ top: y, left: x })
  }

  moveBy (deltaX = 0, deltaY = 0) {
    const { top, left } = this.descriptor
    this.transform({ top: top + deltaY, left: left + deltaX })
  }

  rotate (deg = 0) {
    this.transform({ rotation: deg })
  }

  rotateBy (deltaDeg) {
    const { rotation } = this.descriptor
    this.transform({ rotation: rotation + deltaDeg})
  }
}