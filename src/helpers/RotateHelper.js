import BaseHelper from './BaseHelper'
import RotateHandler from '../handlers/RotateHandler'

class RotateHelper extends BaseHelper {

  constructor (transformHelper) {
    super(transformHelper)

    this.el = null
    this.handler = null
  }

  create () {
    const { rootEl } = this.transformHelper
    const el = document.createElement('div')
    el.style.position = 'absolute'
    el.style.top = '-50%'
    el.style.left = '50%'
    el.style.width = '10px'
    el.style.height = '10px'
    el.style.background = 'red'
    el.style.transform = 'translateX(-50%)'
    rootEl.appendChild(el)
    this.el = el

    this.handler = new RotateHandler(el, this.transformHelper)
    this.handler.bindEvents()
  }

  destroy () {
    this.handler.unbindEvents()
    this.el.remove()
    this.el = null
  }

  update (descriptor) {
    // do nothing
  }
}

export default RotateHelper