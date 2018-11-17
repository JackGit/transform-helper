import MoveHelper from './MoveHelper'
import RotateHelper from './RotateHelper'
import ResizeHelper from './helpers/ResizeHelper'
import Transformer from './Transformer'

const createRootElement = ({ zIndex }) => {
  const el = document.createElement('div')
  el.style.position = 'fixed'
  el.style.display = 'block'
  el.style.background = 'rgba(255,0,0,.5)'
  el.style.zIndex = zIndex
  document.body.appendChild(el)
  return el
}

const normalizeHelperConfig = helperConfig => {
  if (typeof helperConfig === 'string') {
    return {
      name: helperConfig,
      options: {}
    }
  } else {
    return {
      name: helperConfig[0],
      options: helperConfig[1]
    }
  }
}

const HelperClassMapping = {
  move: MoveHelper,
  reize: ResizeHelper,
  rotate: RotateHelper
}

const defaultOptions = {
  userTransform: false,
  zIndex: 100,
  helpers: ['move', 'resize', 'rotate'] // ['move', ['resize', options], 'rotate']
}

class TransformHelper {
  constructor (options = {}) {
    this.rootEl = null
    this.options = { ...defaultOptions, ...options }

    this.transformer = null
    this.helpers = {}

    this._init()
  }

  _init () {
    const { zIndex, userTransform } = this.options

    this.rootEl = createRootElement({ zIndex })
    this.transfomer = new Transformer(this.rootEl, { userTransform })

    this.options.helpers.map(normalizeHelperConfig).forEach(({ name, options }) => {
      const HelperClass = HelperClassMapping[name]

      if (!HelperClass) {
        console.warn(`Invalid helper ${name}`)
        return
      }

      if (this.helpers[name]) {
        console.warn(`${name} is overridden`)
      }

      this.helpers[name] = new HelperClass(this, options)
    })

    this._invokeHelpers('create')
  }

  _invokeHelpers (method, ...args) {
    Object.values(this.helpers).forEach(helper => helper[method](...args))
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
   *   th.activate(['move', ['rotate', options], 'resize'])
   */
  activate (options) {
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