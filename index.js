const canvas = document.querySelector('#canvas')
const context = canvas.getContext('2d')

console.log(canvas)

canvas.width = window.innerWidth
canvas.height = window.innerHeight
context.lineWidth = 10

const rectangles = []
let splitDirectionVertical = true

canvas.addEventListener('click', onRectangleClick)

function createRectangle(x, y, width, height) {
  rectangles.push({
    x,
    y,
    width,
    height
  })
}

function drawRectangles() {
  rectangles.forEach(rectangle => {
    context.beginPath()
    context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height)
    context.closePath()
    context.stroke()
  })
}

function onRectangleClick(event) {
  const clickedIndex = rectangles.findIndex(rectangle => {
    if (
      event.x > rectangle.x &&
      event.x < rectangle.x + rectangle.width &&
      event.y > rectangle.y &&
      event.y < rectangle.y + rectangle.height
    ) {
      return true
    }
  })

  const clickedRectangle = rectangles[clickedIndex]

  rectangles.splice(clickedIndex, 1)

  splitRectangleAt(clickedRectangle, {
    x: event.x - clickedRectangle.x, 
    y: event.y - clickedRectangle.y
  })
}

function splitRectangleAt(rectangle, position) {
  rectangles.push({
    x: rectangle.x,
    y: rectangle.y,
    width: splitDirectionVertical ? position.x : rectangle.width,
    height: splitDirectionVertical ? rectangle.height : position.y
  })

  rectangles.push({
    x: splitDirectionVertical ? rectangle.x + position.x : rectangle.x,
    y: splitDirectionVertical ?  rectangle.y : rectangle.y + position.y,
    width: splitDirectionVertical ? rectangle.width - position.x : rectangle.width,
    height: splitDirectionVertical ? rectangle.height : rectangle.height - position.y
  })

  splitDirectionVertical = !splitDirectionVertical

  drawRectangles()
}

createRectangle(0, 0, window.innerWidth, window.innerHeight)
drawRectangles()