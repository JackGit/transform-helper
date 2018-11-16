import MoveHelper from './MoveHelper'
import RotateHelper from './RotateHelper'
import Transformer from './Transformer'
import ResizeHelper from './helpers/ResizeHelper';

const createRootElement = ({ zIndex }) => {
  const el = document.createElement('div')
  el.style.position = 'fixed'
  el.style.display = 'block'
  el.style.background = 'rgba(255,0,0,.5)'
  el.style.zIndex = zIndex
  document.body.appendChild(el)
  return el
}

const HelperClassMapping = {
  move: MoveHelper,
  reize: ResizeHelper,
  rotate: RotateHelper
}

const defaultOptions = {
  userTransform: false,
  zIndex: 100,
  helpers: ['move', 'resize', 'rotate']
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

    this.options.helpers.forEach(helperName => {
      const HelperClass = HelperClassMapping[helperName]

      if (!HelperClass) {
        console.warn(`Invalid helper ${helperName}`)
        return
      }

      if (this.helpers[helperName]) {
        console.warn(`${helperName} is overridden`)
      }

      const helper = new HelperClass(this)
      helper.create()
      this.helpers[helperName] = helper
    })
  }  

  destroy () {
    Object.values(this.helpers).forEach(helper => helper.destroy())
    this.helpers = {}
    this.transformer = null
    this.rootEl.remove()
  }

  transform (descriptor) {
    this.transformer.transform(descriptor)
    Object.values(this.helpers).forEach(helper => helper.update(descriptor))
    // this.emit('transform', this.transformations)
  }

  link (el, options) {
    
  }
  
}

export default TransformHelper