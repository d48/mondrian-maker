const canvas = document.querySelector('#canvas')
const context = canvas.getContext('2d')

console.log(canvas)

canvas.width = window.innerWidth
canvas.height = window.innerHeight

context.lineWidth = 10

const rectangles = []

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
  // Todo: find index of rectangle clicked
  const clickedIndex = 0

  const clickedRectangle = rectangles[0]

  rectangles.splice(clickedIndex, 1)

  splitRectangleAt(clickedRectangle, {x: event.x - clickedRectangle.x, y: event.y - clickedRectangle.y})
}

function splitRectangleAt(rectangle, position) {
  rectangles.push({
    x: rectangle.x,
    y: rectangle.y,
    width: position.x,
    height: rectangle.height
  })

  rectangles.push({
    x: rectangle.x + position.x,
    y: rectangle.y,
    width: rectangle.width - position.x,
    height: rectangle.height
  })

  drawRectangles()
}

createRectangle(0, 0, window.innerWidth, window.innerHeight)
// createRectangle(10, 10, 100, 50)
drawRectangles()