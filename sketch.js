const SECONDS_PER_SKETCH = 10
const allSketches = [sketchOne, sketchTwo, sketchThree]

let colorsForSketchTwo = ['yellow', 'red', 'blue']
let lengthsForSketchTwo = [...Array(36)].map(
  () => window.innerWidth * 0.2 + Math.random() * window.innerWidth * 0.5
)

let initialFillColorForSketchThree = 'white'

let sketchOneArray = getSketchOneArray()
let sketchTwoArray = getSketchTwoArray()

let count = 0

function setup() {
  createCanvas(windowWidth, windowHeight)
}

function draw() {
  background(225)
  drawSketches()
}

function getSketchOneArray() {
  return [...Array(20)].map(() => [
    Math.random() * window.innerWidth,
    Math.random() * window.innerHeight,
  ])
}

function getSketchTwoArray() {
  return [...Array(3)]
    .map((_, x) => {
      return [...Array(3)].map((_, y) => {
        const color =
          x === 1 && y === 1
            ? colorsForSketchTwo[0]
            : x === 1 || y === 1
            ? colorsForSketchTwo[1]
            : colorsForSketchTwo[2]
        return [(x * window.innerWidth) / 2, (y * window.innerHeight) / 2, color]
      })
    })
    .flat()
}

function reset() {
  colorsForSketchTwo = ['yellow', 'red', 'blue']
  sketchOneArray = getSketchOneArray()
  sketchTwoArray = getSketchTwoArray()
  initialFillColorForSketchThree = 'white'
}

function drawSketches() {
  const sketch = allSketches[0]
  push()
  sketch()
  pop()
  if (count === SECONDS_PER_SKETCH * 60) {
    allSketches.push(allSketches.shift())
    count = 0
    reset()
  }
  count++
}

function sketchOne() {
  sketchOneArray.forEach(([x1, y1]) => {
    sketchOneArray.forEach(([x2, y2]) => {
      line(x1, y1, x2, y2)
    })
  })
}

function sketchTwo() {
  noStroke()
  sketchTwoArray.forEach(([x, y, color]) => {
    fill(color)
    push()
    translate(x, y)
    for (let angle = 0; angle < 360; angle += 10) {
      rotate(angle)
      rect(0, 0, 1, lengthsForSketchTwo[floor(angle / 10)])
    }
    pop()
  })
  sketchTwoArray = getSketchTwoArray()
}

function sketchThree() {
  noStroke()
  // draw background stripes
  const rectWidth = width / 51
  let fillColor = initialFillColorForSketchThree
  for (let x = 0; x <= width; x += rectWidth) {
    fill(fillColor)
    rect(x, 0, rectWidth, height)
    fillColor = fillColor === 'black' ? 'white' : 'black'
  }
  // draw inner square with stripes
  fill(fillColor)
  rect(width / 3, height / 3, width / 3, width / 3)
  for (let y = height / 3; y <= height / 3 + width / 3; y += rectWidth) {
    fill(fillColor)
    rect(width / 3, y, width / 3, rectWidth)
    fillColor = fillColor === 'white' ? 'black' : 'white'
  }
}

function mouseClicked() {
  initialFillColorForSketchThree = initialFillColorForSketchThree === 'black' ? 'white' : 'black'
  colorsForSketchTwo.unshift(colorsForSketchTwo.pop())
  sketchOneArray.push([mouseX, mouseY])
}
