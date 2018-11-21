import BaseHelper from './BaseHelper'
import ResizeHandler from '../handlers/ResizeHandler'

const { RESIZE_TYPES: RT } = ResizeHandler
const RESIZE_TYPES = {
  [RT.TL]: { top: '0', left: '0' },
  [RT.TC]: { top: '0', left: '50%' },
  [RT.TR]: { top: '0', left: '100%' },
  [RT.LM]: { top: '50%', left: '0' },
  [RT.RM]: { top: '50%', left: '100%' },
  [RT.BL]: { top: '100%', left: '0' },
  [RT.BC]: { top: '100%', left: '50%' },
  [RT.BR]: { top: '100%', left: '100%' },
}

class ResizeHelper extends BaseHelper {

  constructor (transformHelper) {
    super(transformHelper)

    this.els = []
    this.handlers = []
  }

  create () {
    const { rootEl } = this.transformHelper
    const el = document.createElement('div')
    el.style.position = 'absolute'
    el.style.width = '100%'
    el.style.height = '100%'
    
    Object.keys(RESIZE_TYPES).forEach(type => {
      const point = document.createElement('div')
      point.style.position = 'absolute'
      point.style.display = 'inline-block'
      point.style.width = '9px'
      point.style.height = '9px'
      point.style.background = 'red'
      point.style.top = RESIZE_TYPES[type].top
      point.style.left = RESIZE_TYPES[type].left
      point.style.transform = 'translateX(-50%) translateY(-50%)'
      el.appendChild(point)
      
      this.handlers.push(new ResizeHandler(point, this.transformHelper, { type }))
    })

    rootEl.appendChild(el)
    this.el = el

    this.handlers.forEach(h => h.bindEvents())
  }

  destroy () {
    this.handlers.forEach(h => h.unbindEvents())
    this.handlers = []
    this.el.remove()
    this.el = null
  }

  update (descriptor) {
    // do nothing
  }
}

export default ResizeHelper