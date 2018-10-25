import MoveHelper from './MoveHelper'
import RotateHelper from './RotateHelper'
import ScaleHelper from './ScaleHelper'
import Transformer, { setTransformStyle } from './Transformer'

/**
 * user interacts with helpers
 * helpers transform itself and emit transformed transformation info
 * and set the binded el with setTransformStyle(targetEl, transformation)
 */
class TransformHelper extends EventEmitter {
  constructor (props) {
    super()
    this.transformer = null
  }

  _init () {

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

  
}
