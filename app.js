const container = document.querySelector("#display");
const btn = document.querySelectorAll("button");
const totalP = document.querySelector(".total");
let bottom = document.querySelector(".bottom");

let currentOperation = "";

function main() {
  let clearBtn = document.querySelector("#clear");
  let history = document.querySelector(".history");
  clearBtn.addEventListener("click", () => {
    history.innerText = "";
    totalP.innerText = "";
    currentOperation = "";
  });
  document.addEventListener("keydown", handleKeyboardInput);
  calculator();
}

function calculator() {
  btn.forEach((item) => {
    item.onclick = () => {
      handleButtonClick(item.id);
    };
  });
}

function handleButtonClick(id) {
  const history = document.querySelector(".history");
  if (id == "clear") {
    totalP.innerText = "";
    currentOperation = "";
    history.innerText = '';
  } else if (id == "backSpace") {
    let str = totalP.innerText.toString();
    totalP.innerText = str.substring(0, str.length - 1);
    console.log(totalP.innerText.length);
    if (totalP.innerText.length <= 0) {
      history.innerText = "";
    }
  } else if (totalP.innerText !== "" && id == "equal") {
    try {
      const result = eval(totalP.innerText);
      updateHistory(totalP.innerText);
      totalP.innerText = result;
    } catch {
      totalP.innerText = "Error";
      setTimeout(() => (totalP.innerText = ""), 2000);
    }
  } else if (totalP.innerText == "" && id == "equal") {
    totalP.innerText = "Empty!";
    setTimeout(() => (totalP.innerText = ""), 2000);
  } else {
    totalP.innerText += id;
  }
}

function updateHistory(operation, result) {
  const history = document.querySelector(".history");
  history.innerText = `${operation}\n`;
  console.log(history.innerText);
}

function handleKeyboardInput(event) {
  const key = event.key;

  // Define mappings from key presses to button IDs
  const keyMappings = {
    0: "0",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    "+": "+",
    "-": "-",
    "*": "*",
    "/": "/",
    "%": "%",
    ".": ".",
    Enter: "equal",
    "=": "equal",
    Backspace: "backSpace",
    c: "clear",
    C: "clear",
  };

  if (keyMappings[key]) {
    handleButtonClick(keyMappings[key]);
  }
}

main();
