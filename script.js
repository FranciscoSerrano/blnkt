let canvas, ctx;
let gridX = 10,
  gridY = 10;
let canvasSize = 400;
let userColors = []; // Default to black and white
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
  const patternAlgorithm = getPatternAlgorithm(selectedPattern);
  patternAlgorithm();
}

// ==== Start of Pattern Functions ====
function diamondPattern() {
  let cellSize = Math.min(canvas.width / gridX, canvas.height / gridY);
  let centerX = Math.floor(gridX / 2);
  let centerY = Math.floor(gridY / 2);

  for (let x = 0; x < gridX; x++) {
    for (let y = 0; y < gridY; y++) {
      let distX = Math.abs(x - centerX);
      let distY = Math.abs(y - centerY);
      let distance = distX + distY; // Manhattan distance
      let colorIndex = distance % userColors.length;
      ctx.fillStyle = userColors[colorIndex];
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

function xPattern() {
  let cellSize = Math.min(canvas.width / gridX, canvas.height / gridY);
  let centerX = Math.floor((gridX - 1) / 2);
  let centerY = Math.floor((gridY - 1) / 2);

  for (let x = 0; x < gridX; x++) {
    for (let y = 0; y < gridY; y++) {
      // Calculate distance to the diagonals relative to the center
      let dist1 = Math.abs(x - centerX - (y - centerY));
      let dist2 = Math.abs(x - centerX + (y - centerY));
      let distance = Math.min(dist1, dist2);
      let colorIndex = distance % userColors.length;
      ctx.fillStyle = userColors[colorIndex];
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

function checkerboardGradientPattern() {
  let cellSize = Math.min(canvas.width / gridX, canvas.height / gridY);

  // Function to convert hex color to RGB and calculate luminance
  function getLuminance(hex) {
    let rgb = parseInt(hex.slice(1), 16);
    let r = (rgb >> 16) & 0xff;
    let g = (rgb >> 8) & 0xff;
    let b = (rgb >> 0) & 0xff;
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  // Sort userColors array by luminance (light to dark)
  userColors.sort((a, b) => getLuminance(a) - getLuminance(b));

  for (let y = 0; y < gridY; y++) {
    let rowColor = userColors[Math.floor((y / gridY) * userColors.length)];
    for (let x = 0; x < gridX; x++) {
      ctx.fillStyle =
        x % 2 === 0 && y % 2 === 0
          ? rowColor
          : userColors[
              (Math.floor((y / gridY) * userColors.length) + 1) %
                userColors.length
            ];
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}
// ==== End of Pattern Functions ====

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

function updateColorPallet() {
  const colorPallet = document.querySelector(".color-pallet");
  colorPallet.innerHTML = "";

  userColors.forEach((color) => {
    const colorDiv = document.createElement("div");
    colorDiv.classList.add("pallet-item");
    colorDiv.style.backgroundColor = color;
    colorPallet.appendChild(colorDiv);
  });
}

let selectedPattern = "diamondPattern";

function selectPattern(pattern) {
  const dropdown = document.querySelector(".dropdown");
  let text = dropdown.querySelector(".selected-pattern-message");

  if (!text) {
    text = document.createElement("p");
    text.classList.add("selected-pattern-message");
    dropdown.appendChild(text);
  }

  text.innerHTML = `You selected ${pattern}!`;
  selectedPattern = pattern;
  drawGrid();
}

function getPatternAlgorithm(patternName) {
  switch (patternName) {
    case "diamond":
      return diamondPattern;
    case "gradient":
      return checkerboardGradientPattern;
    case "x":
      return xPattern;
    default:
      return diamondPattern;
  }
}
