import BaseHelper from './helpers/BaseHelper'
import MoveHelper from './helpers/MoveHelper'
import ResizeHelper from './helpers/ResizeHelper'
import RotateHelper from './helpers/RotateHelper'
import Transformer from './Transformer'

const HelperClassMapping = {
  move: MoveHelper,
  resize: ResizeHelper,
  rotate: RotateHelper
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
 * helperConfigValue can be:
 *  String value as helper name, like 'move'
 *  Array as ['move', options]
 *  BaseHelper instance
 * @param {String|Array|BaseHelper} helperConfigValue 
 */
const createHelperInstance = helperConfigValue => {
  if (helperConfigValue instanceof BaseHelper) {
    return helperConfigValue
  } else {
    let name, options
    if (typeof helperConfigValue === 'string') {
      name = helperConfigValue
    } else if (Array.isArray(helperConfigValue)) {
      name = helperConfigValue[0]
      options = helperConfigValue[1] || undefined
    }

    const HelperClass = HelperClassMapping[name]
    if (!HelperClass) {
      console.warn(`cannot find helper class for ${name}`)
      return
    }

    return new HelperClass(options)
  }
}

const defaultOptions = {
  userTransform: false,
  zIndex: 100
}

class TransformHelper {
  constructor (options = {}) {
    this.rootEl = null
    this.options = { ...defaultOptions, ...options }

    this.transformer = null
    this.helpers = []

    this._init()
  }

  _init () {
    const { zIndex, userTransform } = this.options

    this.rootEl = createRootElement({ zIndex })
    this.transfomer = new Transformer(this.rootEl, { userTransform })
  }

  _invokeHelpers (method, ...args) {
    this.helpers.forEach(helper => helper[method](...args))
  }

  _createHelpers (helpers) {
    this.helpers = helpers.map(createHelperInstance)
    this._invokeHelpers('create')
  }

  destroy () {
    this._invokeHelpers('destroy')
    this.helpers = {}
    this.transformer = null
    this.rootEl.remove()
  }

  transform (descriptor) {
    this.transformer.transform(descriptor)
    this._invokeHelpers('update', descriptor)
    // this.emit('transform', this.transformations)
  }

  /**
   * usage like:
   *   const th = new TransformHelper()
   *   th.link(targetEl)
   *   th.activate(['move', ['rotate', options], 'resize', new MyResizeHelper()])
   * 
   */
  activate (helpers = []) {
    this._createHelpers(helpers)
    // destroy all the helpers
    // then create them with the new options again
  }

  deactivate () {
    this._invokeHelpers('destroy')
  }

  link (el, options) {
    
  }
  
}

export default TransformHelper