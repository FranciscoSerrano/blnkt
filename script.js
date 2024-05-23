let canvas, ctx;
let gridX, gridY;
let canvasSize = 400;
let userColors = [];
let colorPicker;

window.onload = function () {
  colorPicker = document.getElementById("colorPicker");
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  canvas.width = canvasSize;
  canvas.height = canvasSize;

  document.getElementById("xInput").addEventListener("input", updateGridX);
  document.getElementById("yInput").addEventListener("input", updateGridY);
  document
    .getElementById("sizeSlider")
    .addEventListener("input", updateCanvasSize);
  document.getElementById("addColorButton").addEventListener("click", addColor);

  drawGrid();
};

function drawGrid() {
  let cellSize = Math.min(canvas.width / gridX, canvas.height / gridY);
  let centerX = Math.floor(canvas.width / (2 * cellSize));
  let centerY = Math.floor(canvas.height / (2 * cellSize));

  for (let x = 0; x < gridX; x++) {
    for (let y = 0; y < gridY; y++) {
      let distX = Math.abs(x - centerX);
      let distY = Math.abs(y - centerY);
      let distance = Math.max(distX, distY);
      let colorIndex = (distance + Math.min(distX, distY)) % userColors.length;
      ctx.fillStyle = userColors[colorIndex];
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

function addColor() {
  userColors.push(colorPicker.value);
  updateColorPallet();
  drawGrid();
}

function updateGridX() {
  gridX = parseInt(this.value);
  if (isNaN(gridX) || gridX < 1) {
    gridX = 1;
  }
  canvas.height = (gridY * canvasSize) / gridX;
  drawGrid();
}

function updateGridY() {
  gridY = parseInt(this.value);
  if (isNaN(gridY) || gridY < 1) {
    gridY = 1;
  }
  canvas.width = (gridX * canvasSize) / gridY;
  drawGrid();
}

function updateCanvasSize() {
  canvasSize = this.value;
  canvas.width = canvasSize;
  canvas.height = (gridY * canvasSize) / gridX;
  drawGrid();
}

// Function to update the color pallet
function updateColorPallet() {
  const colorPallet = document.querySelector(".color-pallet");
  // Clear the existing content
  colorPallet.innerHTML = "";

  // Loop through the colors array and create color divs
  userColors.forEach((color) => {
    const colorDiv = document.createElement("div");
    colorDiv.classList.add("pallet-item");
    colorDiv.style.backgroundColor = color;
    colorPallet.appendChild(colorDiv);
  });
}
