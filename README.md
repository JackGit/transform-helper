/*
<div class="th-helper">
  <div class="th-content"></div>
  
  <div class="th-tline"></div>
  <div class="th-rline"></div>
  <div class="th-bline"></div>
  <div class="th-lline"></div>

  <div class="th-tlpoint"></div>
  <div class="th-tmpoint"></div>
  <div class="th-trpoint"></div>
  <div class="th-brpoint"></div>
  <div class="th-bmpoint"></div>
  <div class="th-blpoint"></div>
  <div class="th-rmpoint"></div>
  <div class="th-lmpoint"></div>

  <div class="th-box"></div>
</div>
*/

const transformHelper = new TransformHelper({
  classPrefix: 'th-helper',
  renderer: {
    bottomRightResizeHandle: () => {},
    rotateHandle: () => {},
    boxHandle: () => {}
  }
})

transformHelper.wrap(el, options)
transformHelper.link(el, options)
transformHelper.cover(el, options)

transformHelper.on('', () => {})

// getter & setter

// rotation
transformHelper.rotate.deg
transformHelper.rotate.origin = { x, y }

transformHelper.rotateTo(deg)
transformHelper.rotateBy(deg)

// size
transformHelper.keepRatio
transformHelper.scale = { x, y }
transformHelper.width
transformHelper.height

transformHelper.scale(x, y)
transformHelper.scaleX(x, keepRatio)
transformHelper.scaleY(y, keepRatio)

// position
transformHelper.x
transformHelper.y

transformHelper.moveTo()
transformHelper.moveBy()


transformHelper.enableRotate()
transformHelper.disableRotate()
transformHelper.rotateEnabled