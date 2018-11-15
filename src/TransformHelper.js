import MoveHelper from './MoveHelper'
import RotateHelper from './RotateHelper'
import Transformer from './Transformer'
import ResizeHelper from './helpers/ResizeHelper';

const defaultOptions = {
  userTransform: false,
  zIndex: 100
}

const createRootElement = ({ zIndex }) => {
  const el = document.createElement('div')
  el.style.position = 'fixed'
  el.style.display = 'block'
  el.style.background = 'rgba(255,0,0,.5)'
  el.style.zIndex = zIndex
  document.body.appendChild(el)
  return el
}
/**
 * user interacts with helpers
 * helpers transform itself and emit transformed transformation info
 * and set the binded el with setTransformStyle(targetEl, transformation)
 */
class TransformHelper {
  constructor (options = {}) {
    this.rootEl = null
    this.options = { ...defaultOptions, ...options }

    this.transformer = null
    this.transformations = {
      top: options.top,
      left: options.left,
      width :options.width,
      height: options.height,
      rotation: options.rotation
    }

    this._init()
  }

  _init () {
    const { zIndex, userTransform } = this.options

    this.rootEl = createRootElement({ zIndex })
    this.transfomer = new Transformer(this.rootEl, {
      userTransform
    })

    new MoveHelper(this)
    new RotateHelper(this)
    new ResizeHelper(this)
  }  

  _render () {

  }

  _update () {

  }

  destroy () {

  }

  link (el, options) {
    
  }

  transform (descriptor) {
    this.transformer.transform(descriptor)
    // this.emit('transform', this.transformations)
  }
  
}

export default TransformHelper