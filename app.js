const container = document.querySelector("#display");
const btn = document.querySelectorAll("button");
const totalP = document.querySelector(".total");
let bottom = document.querySelector(".bottom");
let switchBtn = document.querySelector(".switch");

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
  enableDarkMode();
  // disableDarkMode();
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
    history.innerText = "";
  } else if (id == "backSpace") {
    let str = totalP.innerText.toString();
    totalP.innerText = str.substring(0, str.length - 1);
    console.log(totalP.innerText.length);
    if (totalP.innerText.length <= 0) {
      history.innerText = "";
    }
  } else if (totalP.innerText !== "" && id == "equal") {
    try {
      let expression = totalP.innerText;
      expression = handlePercentage(expression);
      const result = eval(expression);
      updateHistory(totalP.innerText);
      totalP.innerText = result;
    } catch {
      console.error("Evaluation error:", error);
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

function enableDarkMode() {
  let body = document.querySelector("body");
  switchBtn.addEventListener("click", () => {
    if (body.classList.contains("dark")) {
      body.classList.remove("dark");
      switchBtn.style.background = "#232526"; // Light mode background color
    } else {
      body.classList.add("dark");
      switchBtn.style.background = "antiquewhite"; // Dark mode background color
    }
  });
}

function handlePercentage(expression) {
  return expression.replace(
    /(\d+(\.\d+)?)(%)?/g,
    (match, p1, p2, p3, offset) => {
      if (p3) {
        // If it's a percentage
        const num = parseFloat(p1);
        const prevExpression = expression.slice(0, offset).trim();
        const prevNumMatch = prevExpression.match(/(\d+(\.\d+)?)([+\-*/])/);
        if (prevNumMatch) {
          const prevNum = parseFloat(prevNumMatch[1]);
          const operator = prevNumMatch[3];
          switch (operator) {
            case "+":
            case "-":
              return `${num / 100} * ${prevNum}`;
            case "*":
            case "/":
              return `${num / 100}`;
            default:
              return match;
          }
        }
        return `(${num} / 100)`;
      } else {
        return match;
      }
    }
  );
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
