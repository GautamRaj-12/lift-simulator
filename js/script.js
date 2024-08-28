const floorInput = document.querySelector("#floor-input");
const liftInput = document.querySelector("#lift-input");
const okBtn = document.querySelector(".ok-btn");

let floorInputValue;
let liftInputValue;

let liftSimulationBox = document.querySelector(".lift-simulation");
let lifts = [];
let requestQueue = []; // Queue to store pending lift requests

function createFloors(floorInputValue) {
  for (let i = floorInputValue; i >= 1; i--) {
    let floorBox = document.createElement("div");
    floorBox.classList.add(`floor-box`, `floor-${i}`);

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
      downButton.addEventListener("click", () => requestLift(i));
      buttonContainer.appendChild(downButton);
    }

    floorBox.appendChild(buttonContainer);
    liftSimulationBox.appendChild(floorBox);
  }
}

function createLifts(liftInputValue) {
  let liftContainer = document.createElement("div");
  liftContainer.classList.add("lift-container");
  document.querySelector(".floor-1").appendChild(liftContainer);

  for (let l = 1; l <= liftInputValue; l++) {
    let liftBox = document.createElement("div");
    liftBox.classList.add("lift-box");
    liftBox.dataset.currentFloor = 1; // Starting on the 1st floor
    liftBox.dataset.isMoving = "false"; // Lift is initially free

    let leftDoor = document.createElement("div");
    leftDoor.classList.add("left-door");

    let rightDoor = document.createElement("div");
    rightDoor.classList.add("right-door");
    liftBox.appendChild(leftDoor);
    liftBox.appendChild(rightDoor);

    liftContainer.appendChild(liftBox);
    lifts.push(liftBox);
  }
}

function requestLift(floor) {
  const availableLift = findNearestAvailableLift(floor);
  if (availableLift) {
    moveLift(availableLift, floor);
  } else {
    // If no lift is available, add the request to the queue
    requestQueue.push(floor);
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
    openDoors(lift, 2.5); // Open doors in 2.5 seconds
  }, travelTime * 1000);
}

function openDoors(lift, duration) {
  const leftDoor = lift.querySelector(".left-door");
  const rightDoor = lift.querySelector(".right-door");

  leftDoor.style.transition = `transform ${duration}s ease-in-out`;
  leftDoor.style.transform = `translateX(-100%)`;

  rightDoor.style.transition = `transform ${duration}s ease-in-out`;
  rightDoor.style.transform = `translateX(100%)`;

  setTimeout(() => {
    closeDoors(lift, 2.5); // Close doors after 2.5 seconds
  }, duration * 1000);
}

function closeDoors(lift, duration) {
  const leftDoor = lift.querySelector(".left-door");
  const rightDoor = lift.querySelector(".right-door");

  leftDoor.style.transition = `transform ${duration}s ease-in-out`;
  leftDoor.style.transform = `translateX(0)`;

  rightDoor.style.transition = `transform ${duration}s ease-in-out`;
  rightDoor.style.transform = `translateX(0)`;

  setTimeout(() => {
    lift.dataset.isMoving = "false";
    // Check the queue for any pending requests
    if (requestQueue.length > 0) {
      const nextFloor = requestQueue.shift(); // Get the next request
      moveLift(lift, nextFloor); // Move the lift to the next floor
    }
  }, duration * 1000);
}

okBtn.addEventListener("click", () => {
  liftSimulationBox.innerHTML = "";
  lifts = []; // Reset lifts array
  requestQueue = []; // Reset request queue
  floorInputValue = floorInput.value;
  liftInputValue = liftInput.value;
  console.log(floorInputValue, liftInputValue);

  createFloors(Number(floorInputValue));
  createLifts(Number(liftInputValue));
});
