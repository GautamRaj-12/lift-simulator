const floorInput = document.querySelector("#floor-input");
const liftInput = document.querySelector("#lift-input");
const okBtn = document.querySelector(".ok-btn");

let floorInputValue;
let liftInputValue;
okBtn.addEventListener("click", () => {
  floorInputValue = floorInput.value;
  liftInputValue = liftInput.value;
  console.log(floorInputValue, liftInputValue);

  let liftSimulationBox = document.querySelector(".lift-simulation");

  for (let i = 1; i <= floorInputValue; i++) {
    let floorBox = document.createElement("div");
    liftSimulationBox.appendChild(floorBox);
    floorBox.classList.add("floor-box");
  }

  for (let j = 1; j <= liftInputValue; j++) {
    let liftBox = document.createElement("div");
    liftBox.classList.add("lift-box");
    liftSimulationBox.appendChild(liftBox);
  }
});
