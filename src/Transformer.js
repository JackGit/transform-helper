const normalizeTransformation = ({
  x, y,
  rotate,
  scaleX, scaleY
}) => ({
  x, y,
  rotate,
  scaleX: Math.max(0, scaleX),
  scaleY: Math.max(0, scaleY)
})

// TODO
// { top, left, width, height, rotation, rotatePivot = { x: .5, y: .5 } }
// { translateX, translateY, scaleX, scaleY, rotate, transformOrigin }
const getTransformationFromElement = el => {
  return {
    x: 0,
    y: 0,
    // width: 0,
    // height: 0,
    rotate: 0,
    scaleX: 1,
    scaleY: 1
  }
}

export const setTransformStyle = (el, transformation) => {
  const { x, y, rotate, scaleX, scaleY } = transformation
  el.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg) scale(${scaleX}, ${scaleY})`
}

export const toTransform = ({
  top, left, width, height, rotation,
  originWidth = 1, originHeight = 1
}) => ({
  x: left,
  y: top,
  rotate: rotation,
  scaleX: width / originWidth,
  scaleY: height / originHeight
})

// need to distinguish scale and resize

class Transfomer {
  constructor (el) {
    this.el = el
    // this.transformation = getTransformationFromElement(el)
    this.transformation = {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      originWidth: 0,
      originHeight: 0,
      rotation: 0,
      rotatePivot: { x: .5, y: .5 }
    }
  }

  center () {
    const { top, left, width, height } = this.transformation
    return {
      x: left + width / 2,
      y: top + height / 2
    }
  }

  transform (transformation = {}) {
    this.transformation = normalizeTransformation({
      ...this.transformation,
      ...transformation
    })
    setTransformStyle(this.el, this.transformation)
  }

  translate (x, y) {
    this.transformation.x = x
    this.transformation.y = y
    this.transform()
  }

  translateBy (deltaX, deltaY) {
    this.transformation.x += deltaX
    this.transformation.y += deltaY
    this.transform()
  }

  rotate (x) {
    this.transformation.rotate = x
    this.transform()
  }

  rotateBy (deltaX) {
    this.transformation.rotate += deltaX
    this.transform()
  }

  scale (/* x, y */) {
    this.transformation.scaleX = arguments[0]
    this.transformation.scaleY = arguments.length === 1 ? arguments[0] : arguments[1]
    this.transform()
  }

  scaleBy (/* deltaX, deltaY */) {
    this.transformation.scaleX += arguments[0]
    this.transformation.scaleY += arguments.length === 1 ? arguments[0] : arguments[1]
    this.transform()
  }
}