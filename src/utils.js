export const hasTouch = () => 'ontouchstart' in window

export const clientPosition = event => {
  if (hasTouch()) {
    event = event.touches[0]
  }
  return {
    x: event.clientX,
    y: event.clientY
  }
}

export const startEvent = () => hasTouch() ? 'touchstart' : 'mousedown'
export const moveEvent = () => hasTouch() ? 'touchmove': 'mousemove'
export const endEvent = () => hasTouch() ? 'touchend' : 'mouseup'
export const cancelEvent = () => hasTouch() ? 'touchcancel' : 'mouseup'