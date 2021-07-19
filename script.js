//@ts-check
const inflowInput = /** @type HTMLInputElement */ (
  document.getElementById("inflow")
);
const inflowDisplay = document.getElementById("inflowDisplay");
const outflowInput = /** @type HTMLInputElement */ (
  document.getElementById("outflow")
);
const outflowDisplay = document.getElementById("outflowDisplay");
const waterlevelInput = /** @type HTMLInputElement */ (
  document.getElementById("waterlevel")
);
const alertOutput = /** @type HTMLInputElement */ (
  document.getElementById("alert")
);
const water = document.getElementById("water");
const waterIn = document.getElementById("water-in");
const waterOut = document.getElementById("water-out");
const chart = /** @type HTMLCanvasElement */ (
  document.getElementById("chart")
).getContext("2d");

let waterlevel = Number(waterlevelInput.value);
let previousLevels = [waterlevel];

const chartWidth = chart.canvas.width;
const chartHeight = chart.canvas.height;

function updateChart() {
  chart.clearRect(0, 0, chartWidth, chartHeight);
  chart.moveTo(0, 0);
  chart.lineTo(0, chartHeight);
  chart.lineTo(chartWidth, chartHeight);
  chart.stroke();
  chart.fillStyle = "#94afff";
  previousLevels.forEach((level, index) => {
    chart.fillRect(index * 2 + 1, chartHeight - level * 2 - 1, 2, level * 2);
  });
}

function update() {
  const inflow = Number(inflowInput.value);
  const outflow = Number(outflowInput.value);
  // need to scale down, or the change is too fast
  waterlevel += inflow / 10 - outflow / 10;
  if (waterlevel >= 100) {
    waterlevel = 100;
    alertOutput.hidden = false;
    alertOutput.textContent = "Alert! Water is overflowing!";
  } else if (waterlevel <= 0) {
    waterlevel = 0;
    alertOutput.hidden = false;
    alertOutput.textContent = "Alert! Bathtub is empty!";
  } else {
    alertOutput.hidden = true;
  }
  if (previousLevels.length === 100) {
    previousLevels.shift();
  }
  previousLevels.push(waterlevel);
  updateChart();
  inflowDisplay.textContent = inflowInput.value;
  outflowDisplay.textContent = outflowInput.value;
  waterlevelInput.value = String(Math.round(waterlevel));
  water.style.height = `${waterlevel * 1.45}px`;
  waterIn.style.height = `${inflow / 10}px`;
  waterOut.style.width = `${outflow / 10}px`;
}

setInterval(update, 100);
