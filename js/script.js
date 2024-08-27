const floorInput = document.querySelector("#floor-input");
const liftInput = document.querySelector("#lift-input");
const okBtn = document.querySelector(".ok-btn");

let floorInputValue;
let liftInputValue;

let liftSimulationBox = document.querySelector(".lift-simulation");

function createFloors(floorInputValue) {
  for (let i = floorInputValue; i >= 1; i--) {
    let floorBox = document.createElement("div");
    floorBox.classList.add(`floor-box`, `floor-${i}`);

    // Create button container on each floor
    let buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    if (i < floorInputValue) {
      let upButton = document.createElement("button");
      upButton.textContent = "Up";
      upButton.classList.add(
        "lift-button",
        `lift-button-${i}`,
        "up-button",
        `up-button-${i}`
      );
      buttonContainer.appendChild(upButton);
    }

    if (i > 1) {
      let downButton = document.createElement("button");
      downButton.textContent = "Down";
      downButton.classList.add(
        "lift-button",
        `lift-button-${i}`,
        "down-button",
        `down-button-${i}`
      );
      buttonContainer.appendChild(downButton);
    }

    floorBox.appendChild(buttonContainer);

    liftSimulationBox.appendChild(floorBox);
  }
}

function createLifts(liftInputValue) {
  // Create lift container on 1st floor
  let liftContainer = document.createElement("div");
  liftContainer.classList.add("lift-container");
  document.querySelector(".floor-1").appendChild(liftContainer);

  for (let l = 1; l <= liftInputValue; l++) {
    let liftBox = document.createElement("div");
    liftBox.classList.add("lift-box");
    liftContainer.appendChild(liftBox);
  }
}

okBtn.addEventListener("click", () => {
  liftSimulationBox.innerHTML = "";
  floorInputValue = floorInput.value;
  liftInputValue = liftInput.value;
  console.log(floorInputValue, liftInputValue);

  createFloors(Number(floorInputValue));
  createLifts(Number(liftInputValue));
});
