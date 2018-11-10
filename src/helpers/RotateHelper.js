import BaseHelper from './BaseHelper'

class RotateHelper {

  constructor (transformHelper) {
    this.transformHelper = transformHelper
    this.el = null
    this.init()
  }

  init () {
    this.createHelperUI()
    this.bindEvents()
  }

  createHelperUI () {
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
  }

  bindEvents () {
    this.el.addEventListener('mousedown', this.startHandler)
  }

  _startHandler () {
    window.addEventListener('mousemove', this.moveHandler)
    window.addEventListener('mouseup', this.endHandler)
  }

  _moveHandler (e) {

  }

  _endHandler () {
    window.removeEventListener('mousemove', this.moveHandler)
    window.removeEventListener('mouseup', this.endHandler)
  }

  getRotation () {
    return this.transformHelper.transformations.rotation
  }

  syncRotation (value) {
    this.transformHelper.transformations.rotation = value
  }
  
  update (rotation) {
    this.syncRotation(rotation)
  }
}

export default RotateHelper