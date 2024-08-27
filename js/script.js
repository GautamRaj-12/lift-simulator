const floorInput = document.querySelector("#floor-input");
const liftInput = document.querySelector("#lift-input");
const okBtn = document.querySelector(".ok-btn");

let floorInputValue;
let liftInputValue;

let liftSimulationBox = document.querySelector(".lift-simulation");
let lifts = [];

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
      upButton.addEventListener("click", () => requestLift(i, "up"));
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
      downButton.addEventListener("click", () => requestLift(i, "down"));
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
    liftBox.dataset.currentFloor = 1; // Starting on the 1st floor
    liftContainer.appendChild(liftBox);
    lifts.push(liftBox);
  }
}

function requestLift(floor, direction) {
  const availableLift = findNearestAvailableLift(floor);
  if (availableLift) {
    moveLift(availableLift, floor);
  }
}

function findNearestAvailableLift(requestedFloor) {
  let nearestLift = null;
  let minDistance = Infinity;

  lifts.forEach((lift) => {
    if (!lift.dataset.isMoving || lift.dataset.isMoving === "false") {
      const currentFloor = parseInt(lift.dataset.currentFloor);
      const distance = Math.abs(currentFloor - requestedFloor);
      if (distance < minDistance) {
        nearestLift = lift;
        minDistance = distance;
      }
    }
  });

  return nearestLift;
}

function moveLift(lift, targetFloor) {
  const currentFloor = parseInt(lift.dataset.currentFloor);
  const distance = Math.abs(targetFloor - currentFloor);
  const travelTime = distance * 2; // 2 seconds per floor

  lift.dataset.isMoving = "true";

  lift.style.transition = `transform ${travelTime}s ease-in-out`;
  lift.style.transform = `translateY(-${120 * (targetFloor - 1)}px)`;

  setTimeout(() => {
    lift.dataset.currentFloor = targetFloor;
    lift.dataset.isMoving = "false";
  }, travelTime * 1000);
}

okBtn.addEventListener("click", () => {
  liftSimulationBox.innerHTML = "";
  lifts = []; // Reset lifts array
  floorInputValue = floorInput.value;
  liftInputValue = liftInput.value;
  console.log(floorInputValue, liftInputValue);

  createFloors(Number(floorInputValue));
  createLifts(Number(liftInputValue));
});
