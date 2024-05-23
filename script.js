let gridX, gridY, redInput, greenInput, blueInput;
let canvasSize = 400;

function setup() {
  createCanvas(canvasSize, canvasSize);
  createUI();
}

function draw() {
  background(220);
  drawGrid();
}

let userColors = []; // Array to store user-defined colors

function drawGrid() {
  let cellSize = min(width / gridX, height / gridY);
  let centerX = floor(width / (2 * cellSize));
  let centerY = floor(height / (2 * cellSize));

  for (let x = 0; x < gridX; x++) {
    for (let y = 0; y < gridY; y++) {
      let distX = abs(x - centerX);
      let distY = abs(y - centerY);
      let distance = max(distX, distY);
      let colorIndex = (distance + min(distX, distY)) % userColors.length;
      fill(userColors[colorIndex]);
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

function createUI() {
  let gui = createDiv().position(10, 10);

  // Input fields for grid dimensions
  let xInput = createInput().parent(gui);
  xInput.attribute("placeholder", "X");
  xInput.input(updateGridX);

  let yInput = createInput().parent(gui);
  yInput.attribute("placeholder", "Y");
  yInput.input(updateGridY);

  // Slider for canvas size
  let sizeSlider = createSlider(200, 800, canvasSize).parent(gui);
  sizeSlider.input(updateCanvasSize);

  // Input fields for color in RGB format
  let colorDiv = createDiv().parent(gui);
  colorDiv.style("display", "flex");

  redInput = createInput().parent(colorDiv);
  redInput.attribute("placeholder", "R");
  redInput.input(updateColors);

  greenInput = createInput().parent(colorDiv);
  greenInput.attribute("placeholder", "G");
  greenInput.input(updateColors);

  blueInput = createInput().parent(colorDiv);
  blueInput.attribute("placeholder", "B");
  blueInput.input(updateColors);

  // Button to add the color to the list
  let addColorButton = createButton("Add Color").parent(gui);
  addColorButton.mousePressed(addColor);
}

function updateColors() {
  let redValue = int(redInput.value());
  let greenValue = int(greenInput.value());
  let blueValue = int(blueInput.value());

  // Validate the input values
  redValue = constrain(redValue, 0, 255);
  greenValue = constrain(greenValue, 0, 255);
  blueValue = constrain(blueValue, 0, 255);

  // Update the input field values with constrained values
  redInput.value(redValue);
  greenInput.value(greenValue);
  blueInput.value(blueValue);
}

function addColor() {
  let redValue = int(redInput.value());
  let greenValue = int(greenInput.value());
  let blueValue = int(blueInput.value());

  // Create the color from RGB values
  let newColor = color(redValue, greenValue, blueValue);

  // Add the color to the list
  userColors.push(newColor);

  // Clear the input fields
  redInput.value("");
  greenInput.value("");
  blueInput.value("");
}

function updateGridX() {
  gridX = int(this.value());
  if (isNaN(gridX) || gridX < 1) {
    gridX = 1;
  }
  resizeCanvas(canvasSize, (gridY * canvasSize) / gridX);
}

function updateGridY() {
  gridY = int(this.value());
  if (isNaN(gridY) || gridY < 1) {
    gridY = 1;
  }
  resizeCanvas((gridX * canvasSize) / gridY, canvasSize);
}

function updateCanvasSize() {
  canvasSize = this.value();
  resizeCanvas(canvasSize, (gridY * canvasSize) / gridX);
}
