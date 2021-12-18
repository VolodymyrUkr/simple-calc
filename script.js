const firstNumberInput = document.querySelector("#firstNumber");
const secondNumberInput = document.querySelector("#secondNumber");
const errorMessage = document.querySelector(".errorMessage");

firstNumberInput.classList.remove("wrongInput");
secondNumberInput.classList.remove("wrongInput");






document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    firstNumberInput.addEventListener("focus", () => {
        firstNumberInput.classList.remove("wrongInput");
        errorMessage.innerHTML = "";
    });
    secondNumberInput.addEventListener("focus", () => {
        secondNumberInput.classList.remove("wrongInput");
        errorMessage.innerHTML = "";
    })
    const data = Object.fromEntries(new FormData(e.target).entries());
            
    let firstNumber = data.firstNumber.trim();
    let secondNumber = data.secondNumber.trim();

    if (!firstNumber || !secondNumber) {
        errorMessage.innerHTML = "Поле не може бути порожнім";
        if(!firstNumber) {
            firstNumberInput.classList.add("wrongInput");
        }

        if(!secondNumber) {
            secondNumberInput.classList.add("wrongInput");
        }

        return false;
    }
           

    if (isNaN(firstNumber) || isNaN(secondNumber)) {
        errorMessage.innerHTML = "Для розрахунку використовуйте лише цифри";

        if(isNaN(firstNumber)) {
            firstNumberInput.classList.add("wrongInput");
        }

        if(isNaN(secondNumber)) {
            secondNumberInput.classList.add("wrongInput");
        }

        return false;
    }

    
    if(data.action === "divide" && parseFloat(data.secondNumber) === 0) {
        errorMessage.innerHTML = "На нуль ділити не можна!";
        secondNumberInput.classList.add("wrongInput");
        return false;
    }

    let result = 0;
    switch(data.action) {
        case "add":
            result = parseFloat(data.firstNumber) + parseFloat(data.secondNumber);
            break;
        case "substract":
            result = parseFloat(data.firstNumber) - parseFloat(data.secondNumber);
            break;
        case "multiply":
            result = parseFloat(data.firstNumber) * parseFloat(data.secondNumber);
            break;
        case "divide": 
            result = parseFloat(data.firstNumber) / parseFloat(data.secondNumber);
            break;
        default:
            break;
    }
            
    if(result >= Number.MAX_SAFE_INTEGER || result <= Number.MIN_SAFE_INTEGER) {
        errorMessage.innerHTML = "Отриманий результат виходить за межі безпечних значень. Оберіть інші числа"
        return false;
    }
            
    document.querySelector(".showResult").innerHTML = BigInt(Math.round(result,0));

    console.log(data, result );
    e.target.reset();
    return false;
});
