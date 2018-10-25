/**
 * render helper UI
 * handler events
 * know how to do the transform
 */

class BaseHelper extends EventEmitter {
  constructor () {
    super()
    this.helperManager = helperManager
  }

  bindEvents () {

  }

  unbindEvents () {

  }

  transform () {
    // this.helperManager.transformer.xxx()
  }

  render () {
    // render UI to this.helperManager.rootEl
  }

  renderInfo () {
    // render how help info would be display: rotation deg, move x & y, scale index, etc
  }

}

export default BaseHelper