// interact with transform helper
// transform helper transforms and emit event
// transform the target element by event

const tHelper = new TransformHelper({
  width: 100,
  height: 100,
  top: 10,
  left: 10,
  rotation: 0
})

tHelper.link(document.getElementById('target'))
tHelper.link(document.getElementById('target2'))