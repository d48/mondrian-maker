const canvas = document.querySelector('#canvas')
const context = canvas.getContext('2d')
const colors = [
  // red
  '#dd0100',
  // yellow
  '#fac901',
  // blue
  '#225095',
  // white
  '#ffffff'
]


canvas.width = window.innerWidth
canvas.height = window.innerHeight

const rectangles = []
let splitDirectionVertical = true

canvas.addEventListener('click', onRectangleClick)

function createRectangle(x, y, width, height, color) {
  rectangles.push({
    x,
    y,
    width,
    height,
    color
  })
}

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)]
}

function drawRectangles() {
  rectangles.forEach(rectangle => {
    context.beginPath()
    context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height)
    context.fillStyle = rectangle.color
    context.fill()
    context.lineWidth = 10
    context.strokeStyle = 'black'
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
  createRectangle(
    rectangle.x,
    rectangle.y,
    splitDirectionVertical ? position.x : rectangle.width,
    splitDirectionVertical ? rectangle.height : position.y,
    getRandomColor()
  )

  createRectangle(
    splitDirectionVertical ? rectangle.x + position.x : rectangle.x,
    splitDirectionVertical ?  rectangle.y : rectangle.y + position.y,
    splitDirectionVertical ? rectangle.width - position.x : rectangle.width,
    splitDirectionVertical ? rectangle.height : rectangle.height - position.y,
    getRandomColor()
  )

  splitDirectionVertical = !splitDirectionVertical

  drawRectangles()
}

createRectangle(0, 0, window.innerWidth, window.innerHeight, colors[3])
drawRectangles()