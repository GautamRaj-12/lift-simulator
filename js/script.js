const floorInput = document.querySelector("#floor-input");
const liftInput = document.querySelector("#lift-input");
const okBtn = document.querySelector(".ok-btn");

let floorInputValue;
let liftInputValue;

let liftSimulationBox = document.querySelector(".lift-simulation");

function createFloors(floorInputValue) {
  for (let i = floorInputValue; i >= 1; i--) {
    let floorBox = document.createElement("div");
    floorBox.classList.add("floor-box");

    // Create button container on each floor
    let buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    if (i < floorInputValue) {
      let upButton = document.createElement("button");
      upButton.textContent = "Up";
      upButton.classList.add("lift-button", "up-button");
      buttonContainer.appendChild(upButton);
    }

    if (i > 1) {
      let downButton = document.createElement("button");
      downButton.textContent = "Down";
      downButton.classList.add("lift-button", "down-button");
      buttonContainer.appendChild(downButton);
    }

    floorBox.appendChild(buttonContainer);

    liftSimulationBox.appendChild(floorBox);
  }
}

okBtn.addEventListener("click", () => {
  floorInputValue = floorInput.value;
  liftInputValue = liftInput.value;
  console.log(floorInputValue, liftInputValue);

  createFloors(Number(floorInputValue));
});
