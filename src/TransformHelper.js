import MoveHelper from './MoveHelper'
import RotateHelper from './RotateHelper'
import ScaleHelper from './ScaleHelper'
import Transformer, { setTransformStyle } from './Transformer'
import ResizeHelper from './helpers/ResizeHelper';

/**
 * user interacts with helpers
 * helpers transform itself and emit transformed transformation info
 * and set the binded el with setTransformStyle(targetEl, transformation)
 */
class TransformHelper {
  constructor (options) {
    this.rootEl = null
    this.options = options

    this.transformations = {
      top: options.top,
      left: options.left,
      width :options.width,
      height: options.height,
      rotation: options.rotation
    }

    this._init()
  }

  _createRootElement ({ top, left, width, height }) {
    const el = document.createElement('div')

    el.style.position = 'fixed'
    el.style.display = 'block'
    el.style.top = 0
    el.style.left = 0
    el.style.width = width + 'px'
    el.style.height = height + 'px'
    el.style.zIndex = 10
    el.style.background = 'rgba(255,0,0,.5)'
    el.style.transform = `translateX(${left}px) translateY(${top}px)`

    document.body.appendChild(el)
    this.rootEl = el
  }

  _init () {
    this._createRootElement(this.options)
    // new MoveHelper(this)
    // new RotateHelper(this)
    new ResizeHelper(this)
  }

  _attachEvents () {

  }

  _detachEvents () {

  }

  _render () {

  }

  _update () {

  }

  destroy () {

  }

  link (el, options) {
    
  }

  transform (transformations = {}) {
    this.transformations = {
      ...this.transformations,
      ...transformations
    }
    
    this.transformer.transform(this.transformations)
  }
  
}