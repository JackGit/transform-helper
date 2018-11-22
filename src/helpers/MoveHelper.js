import BaseHelper from './BaseHelper'
import MoveHanlder from '../handlers/MoveHandler'

class MoveHelper extends BaseHelper {
  constructor (transformHelper) {
    super(transformHelper)
    this.handler = null
  }

  create () {
    this.handler = new MoveHanlder(this.transformHelper.rootEl, this.transformHelper)
    this.handler.bindEvents()
  }

  destroy () {
    this.handler.unbindEvents()
    this.handler = null
  }

  update () {
    // do nothing
  }
}

export default MoveHelper