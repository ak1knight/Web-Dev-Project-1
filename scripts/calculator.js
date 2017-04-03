window.onload = function() {
    var newLine = true;
    var numbers = document.forms["calculator"].querySelectorAll(".num");
    var inputField = document.forms["calculator"].querySelector("#resultField");
    var clearButton = document.forms["calculator"].querySelector("#clear");
    var clearEButton = document.forms["calculator"].querySelector("#clearE");
    var equation = document.forms["calculator"].querySelector("#equation");
    var operators = document.forms["calculator"].querySelectorAll(".oper");
    var equalButton = document.forms["calculator"].querySelector("#equals");

    for(let i = 0; i < numbers.length; i++) {
        numbers[i].addEventListener("click", function() {
            if(this.value == "." && inputField.value.includes(".")) {
                return;
            }
            if(newLine) {
                inputField.value = this.value;
                newLine = false;
            } else {
                inputField.value = inputField.value + this.value;
            }
        });
    }

    for(let i = 0; i < operators.length; i++) {
        operators[i].addEventListener("click", function() {
            if(inputField.value != "" || inputField.value != ".") {
                equation.innerHTML = equation.innerHTML + " " + inputField.value + " " + this.value;
                newLine = true;
            }
        });
    }

    clearButton.addEventListener("click", function() {
        inputField.value = "";
        equation.innerHTML = "&nbsp;";
    });

    clearEButton.addEventListener("click", function() {
        inputField.value = "";
    });

    equalButton.addEventListener("click", function() {
        equation.innerHTML = equation.innerHTML + " " + inputField.value;
        let cleanEquation = equation.innerText.replace("÷","/").replace("×","*").replace(" ","");
        equation.innerHTML = equation.innerHTML + " =";
        console.log(cleanEquation);
        inputField.value = eval(cleanEquation);
        newLine = true;
    });

};