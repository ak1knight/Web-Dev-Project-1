atriptothezoo = {
    "inputWords" : ["Adjective","Noun","Verb: Past Tense","Adverb","Adjective","Noun","Noun","Adjective","Verb","Adverb","Verb: Past Tense","Adjective"],
    "story" : "Today I went to the zoo. I saw a <span class=\"word\"></span> <span class=\"word\"></span> jumping up and down in its tree. He <span class=\"word\"></span> <span class=\"word\"></span> through the large tunnel that led to its <span class=\"word\"></span> <span class=\"word\"></span>. I got some peanuts and passed them through the cage to a gigantic gray <span class=\"word\"></span> towering above my head. Feeding that animal made me hungry. I went to get a <span class=\"word\"></span> scoop of ice cream. It filled my stomach. Afterwards I had to <span class=\"word\"></span> <span class=\"word\"></span> to catch our bus. When I got home I <span class=\"word\"></span> my mom for a <span class=\"word\"></span> day at the zoo."
}

function getName() {
    var name = prompt("Enter Name");
    document.getElementById("title").innerHTML = "Welcome to Mad Libs " + name + "!"
}

function createInputs() {
    let inputWords = atriptothezoo.inputWords;
    let form = document.getElementById("wordInput");

    form.innerHTML = ""

    for(let i = 0; i < inputWords.length; i++) {
        form.innerHTML = form.innerHTML + "<div class=\"input-group\"><span class=\"input-group-addon\" id=\"basic-addon1\">" + inputWords[i] + "</span><input type=\"text\" class=\"form-control\" ></div>";
    }

    form.innerHTML = form.innerHTML + "<input type=\"button\" class=\"btn btn-primary\" value=\"Submit\" onclick=\"printWords()\" />";
}

function printWords() {
    let inputWords = document.forms["wordInput"].querySelectorAll('input[type=text]');

    document.getElementById("wordResult").innerHTML = atriptothezoo.story + "<br><a href=\"#\" onClick=\"restore()\">Go Back</a>";

    var output = document.getElementsByClassName("word");

    console.info(output);

    //let result = "";
    //document.getElementById("wordResult").innerHTML = result;

    for(let i = 0; i < inputWords.length; i++) {
        console.info(output[i]);
        output[i].innerHTML = inputWords[i].value;
    }

    //document.getElementById("wordResult").innerHTML = result + "<br><a href=\"#\" onClick=\"restore()\">Go Back</a>";

    document.getElementById("wordResult").hidden = false;
    document.forms["wordInput"].hidden = true;
}

function restore() {
    document.getElementById("wordResult").hidden = true;
    document.forms["wordInput"].hidden = false;
}