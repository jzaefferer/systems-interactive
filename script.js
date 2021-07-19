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

let waterlevel = Number(waterlevelInput.value);

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
  inflowDisplay.textContent = inflowInput.value;
  outflowDisplay.textContent = outflowInput.value;
  waterlevelInput.value = String(Math.round(waterlevel));
  water.style.height = `${waterlevel * 1.45}px`;
  waterIn.style.height = `${inflow / 10}px`;
  waterOut.style.width = `${outflow / 10}px`;
}

setInterval(update, 100);
