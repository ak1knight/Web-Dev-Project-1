window.onload = getName();

function getName() {
    var name = prompt("Enter Name");
    if(name == null) {
        name = "";
    }

    document.getElementById("title").innerHTML = "Welcome to Mad Libs " + name + "!"
}

function printWords() {
    let inputWords = document.forms["wordInput"].querySelectorAll('input[type=text]:not([id^="doublegrp"])');
    let doubleWords = document.forms["wordInput"].querySelectorAll('[id^="doublegrp"]');

    var output = document.getElementsByClassName("word");

    for(let i = 0; i < inputWords.length; i++) {
        output[i].innerHTML = inputWords[i].value;
    }

    for(let i = 1; i <= doubleWords.length; i++) {
        output = document.getElementsByClassName("worddbl" + i);
        for(let j = 0; j < output.length; j++) {
            output[j].innerHTML = doubleWords[i-1].value;
        }
    }

    document.getElementById("wordResult").hidden = false;
    document.forms["wordInput"].hidden = true;
}

function restore() {
    document.getElementById("wordResult").hidden = true;
    document.forms["wordInput"].hidden = false;
}