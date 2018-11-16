/**
 * A Helper owns its own state, and event handling
 * but its lifecycle is controlled by TransformHelper
 */
class BaseHelper {
  constructor (transformHelper) {
    this.transformHelper = transformHelper
  }
  
  /**
   * invokes when TransformHelper creates a helper
   */
  create () {
    // create helper's own UI
    // bind events
    // etc
  }

  /**
   * invokes then TransformHelper do the transform
   * the transform can be triggered by other helper or 
   * directly called TransformHelper.transform() method
   */
  update (descriptor) {
    // update helper's own UI if needed
    // etc
  }

  /**
   * invokes in TransformHelper is going to destroy
   */
  destroy () {
    // unbind event handlers and clear elements created
  }
}

export default BaseHelper