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
const getTransformationFromElement = el => {
  return {
    x: 0,
    y: 0,
    rotate: 0,
    scaleX: 1,
    scaleY: 1
  }
}

class Transfomer {
  constructor (el) {
    this.el = el
    this.transformation = getTransformationFromElement(el)
  }

  transform (transformation = {}) {
    this.transformation = normalizeTransformation({
      ...this.transformation,
      ...transformation
    })
    const { x, y, rotate, scaleX, scaleY } = this.transformation
    this.el.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg) scale(${scaleX}, ${scaleY})`
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