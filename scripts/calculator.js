window.onload = function() {
    var newLine = true;
    var newEquation = true;
    var isFunc = false;

    var numbers = document.forms["calculator"].querySelectorAll(".num");
    var operators = document.forms["calculator"].querySelectorAll(".oper");

    var inputField = document.forms["calculator"].querySelector("#resultField");
    var equation = document.forms["calculator"].querySelector("#equation");

    var clearButton = document.forms["calculator"].querySelector("#clear");
    var clearEButton = document.forms["calculator"].querySelector("#clearE");
    var backButton = document.forms["calculator"].querySelector("#backspace");
    
    var equalButton = document.forms["calculator"].querySelector("#equals");
    var negButton = document.forms["calculator"].querySelector("#negative");
    var aOfCircButton = document.forms["calculator"].querySelector("#area");
    var squaredButton = document.forms["calculator"].querySelector("#squared");
    var halfButton = document.forms["calculator"].querySelector("#half");

    setCSS();

    //Add click listeners to the number buttons and operator buttons
    for(let i = 0; i < numbers.length; i++) {
        numbers[i].addEventListener("click", function() {
            //check to avoid placing multiple decimals
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
            //make sure the input isn't blank
            if(inputField.value != "" || inputField.value != ".") {
                //if we just used equals, start a new equation (allows for use of previous answer)
                if(newEquation) {
                    equation.innerHTML = "&nbsp;";
                    newEquation = false;
                }
                equation.innerHTML = equation.innerHTML + " " + inputField.value + " " + this.value;
                newLine = true;
            }
        });
    }

    //Add click listeners for formatting buttons
    clearButton.addEventListener("click", function() {
        inputField.value = "";
        equation.innerHTML = "&nbsp;";
    });

    clearEButton.addEventListener("click", function() {
        inputField.value = "";
    });

    backButton.addEventListener("click", function() {
        if(inputField.value.length > 0) {
            inputField.value = inputField.value.substr(0,inputField.value.length-1);
        }
    });

    //Add click listeners for function buttons
    equalButton.addEventListener("click", function() {
        if(inputField.value == "" && !isFunc || newEquation)
            return;
        
        equation.innerHTML = equation.innerHTML + " " + inputField.value;

        //replace the nicer looking operators with their programming equivalents
        let cleanEquation = equation.innerText.replace("÷","/").replace("×","*").replace(" ","");

        //Add the equals sign to the equation display after parsing the other input because we don't want it in eval
        equation.innerHTML = equation.innerHTML + " =";

        inputField.value = eval(cleanEquation);
        newLine = true;
        newEquation = true;
    });

    negButton.addEventListener("click", function() {
        if(inputField.value.startsWith("-")) {
            inputField.value = inputField.value.replace("-","");
        } else {
            inputField.value = "-" + inputField.value;
        }
    });

    aOfCircButton.addEventListener("click", function() {
        //make sure the input isn't blank
        if(inputField.value != "" || inputField.value != ".") {
            //if we just used equals, start a new equation (allows for use of previous answer)
            if(newEquation) {
                equation.innerHTML = "&nbsp;";
                newEquation = false;
            }

            equation.innerHTML = equation.innerHTML + " areaOfCircle(" + inputField.value + ") ";

            //Reset inputField value so the equals doesn't try to use it
            inputField.value = "";

            //Run the equal button click to immediately eval the function
            isFunc = true;
            equalButton.click();
            isFunc = false;
        }
    });

    squaredButton.addEventListener("click", function() {
        if(inputField.value != "" || inputField.value != ".") {
            //if we just used equals, start a new equation (allows for use of previous answer)
            if(newEquation) {
                equation.innerHTML = "&nbsp;";
                newEquation = false;
            }

            equation.innerHTML = equation.innerHTML + " square(" + inputField.value + ") ";

            //Reset inputField value so the equals doesn't try to use it
            inputField.value = "";

            //Run the equal button click to immediately eval the function
            isFunc = true;
            equalButton.click();
            isFunc = false;
        }
    });

    halfButton.addEventListener("click", function() {
        //make sure the input isn't blank
        if(inputField.value != "" || inputField.value != ".") {
            //if we just used equals, start a new equation (allows for use of previous answer)
            if(newEquation) {
                equation.innerHTML = "&nbsp;";
                newEquation = false;
            }

            equation.innerHTML = equation.innerHTML + " half(" + inputField.value + ") ";

            //Reset inputField value so the equals doesn't try to use it
            inputField.value = "";

            //Run the equal button click to immediately eval the function
            isFunc = true;
            equalButton.click();
            isFunc = false;
        }
    });

};

function areaOfCircle(r) {
    return Math.PI * (r ** 2);
}

function square(n) {
    return n ** 2;
}

function half(n) {
    return n / 2;
}

function setCSS() {
    var buttons = document.forms['calculator'].querySelectorAll(".btn-primary:active");

    for(let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("mouseover", function() {
            this.style.backgroundColor = "#BB4C30";
            this.style.borderColor = "#BB4C30";
        })
    }
}