let equalPressed = 0;
let buttonInput = document.querySelectorAll(".button");
let input = document.getElementById("input");
let equal = document.getElementById("equal");
let clear = document.getElementById("clear");
let erase = document.getElementById("erase");
let historyContent = document.getElementById("historyContent");

window.onload = () => {
    input.value = "";
};


buttonInput.forEach((buttonClass) => {
    buttonClass.addEventListener("click", (event) => {
        if (equalPressed === 1) {
            equalPressed = 0;
        }
        let value = event.target.dataset.number;

        if (value === "AC") {
            input.value = "";
            return;
        }

        if (value === "DEL") {
            input.value = input.value.slice(0, -1);
            return;
        }

        input.value += value;
    });
}); 

equal.addEventListener("click", () => {
    equalPressed = 1;
    let inputValue = input.value;
    try {
        let expression = inputValue
            .replaceAll("sin", "sinCustom")
            .replaceAll("cos", "cosCustom")
            .replaceAll("tan", "tanCustom")
            .replaceAll("√", "sqrtCustom")
            .replaceAll("∛", "cbrtCustom")
            .replaceAll("^2", "**2")
            .replaceAll("^3", "**3")
            .replace(/(\d+)!/g, (_, num) => factorial
            (Number(num)));

        let result = eval(expression);
        if (Number.isNaN(result) || !Number.isFinite
        (result)) {
            throw new Error("Invalid calculation");
        }

        input.value = Number.isInteger(result) ? result :
        result.toFixed(2);
        addToHistory(inputValue, input.value);
    } 
    catch (error) {
        alert("Error: " + error.message);
    }
});

function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

// seno
function sinCustom(x) {
    x = x * (Math.PI / 180); // Si tus botones usan grados
    let term = x;
    let sum = x;
    for (let n = 1; n < 10; n++) {
        term *= -1 * x * x / ((2 * n) * (2 * n + 1));
        sum += term;
    }
    return sum;
}

// coseno
function cosCustom(x) {
    x = x * (Math.PI / 180);
    let term = 1;
    let sum = 1;
    for (let n = 1; n < 10; n++) {
        term *= -1 * x * x / ((2 * n - 1) * (2 * n));
        sum += term;
    }
    return sum;
}

// Tangente
function tanCustom(x) {
    return sinCustom(x) / cosCustom(x);
}

// Raíz cuadrada
function sqrtCustom(n) {
    if (n < 0) return NaN;
    let x = n;
    let last;
    do {
        last = x;
        x = (x + n / x) / 2;
    } while (Math.abs(x - last) > 0.00001);
    return x;
}

// Raíz cúbica
function cbrtCustom(n) {
    let x = n;
    let last;
    do {
        last = x;
        x = (2 * x + n / (x * x)) / 3;
    } while (Math.abs(x - last) > 0.00001);
    return x;
}


function addToHistory(expression, result) {
    let divItem = document.createElement("div");
    let span = document.createElement("span");
    let button = document.createElement("button");

    divItem.className = "historyItem";
    divItem.style.display = "flex";
    divItem.style.justifyContent = "space-between";

    span.textContent = `${expression} = ${result}`;
    span.dataset.userInput = expression;
    span.style.cursor = "pointer";
    span.style.color = "white";

    button.textContent = "Delete";
    button.className = "btn-sm";
    button.style.backgroundColor = "red";
    button.style.color = "white";

    button.addEventListener("click", () => divItem.remove());
    span.addEventListener("click", () => {
        input.value = span.dataset.userInput;
    });

    divItem.appendChild(span);
    divItem.appendChild(button);
    historyContent.appendChild(divItem);
}

