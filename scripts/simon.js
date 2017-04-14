//Keeps track of the order of tiles to use, filled in the startGame method with random tiles
var gameOrder = [];
//Keeps track of which round it is
var round = 1;
//Keeps track of the guess number within a round
var guessNum = 0;
//How long each tile is activated when show to the user
var delay = 1000;

/**
 * Starts a new Simon game with a particular difficulty
 * @param {string} difficulty 
 */
function startGame(difficulty) {
    var overlay = document.querySelectorAll('.game-overlay');

    //Change the delay and number of rounds depending on difficulty
    var maxRounds = difficulty === 'easy' ? 6 : 10;
    delay = difficulty === 'easy' ? 2000 : 500;

    //Generate an array of random tiles and store it in gameOrder
    gameOrder = Array(maxRounds).fill(1).map(function() {
        return Math.floor(Math.random() * (7 - 1)) + 1;
    });

    //Hide the overlay, then set up the game labels and show the first tile
    overlay[0].style.visibility = 'hidden';

    document.forms["game"].querySelector("#round-text").innerText = "Round: "+round;
    document.forms["game"].querySelector("#helper-text").innerText = "Pay Attention...";
    setTimeout(showTile,500);
}

/**
 * Click handler for each game tile. Checks to make sure that the user chose the correct tile and handles game flow from there
 * @param {MouseEvent} tile 
 */
function simonClick(tile) {
    let guess = tile.target.getAttribute('data-tile');

    //Make sure the guess is correct, if not game over
    if(guess == gameOrder[guessNum]) {
        guessNum++;

        //Check if this guess is the last guess for the round, if yes go to the next round
        if(guessNum == round) {
            guessNum = 0;
            round++;
            document.forms["game"].querySelector("#round-text").innerText = "Round: "+round;
            
            //Check if we've reached the last round, if yes end the game if not have the computer show the next round
            if(round == gameOrder.length) {
                deactivateBoard();
                gameOver(true);
            } else {
                deactivateBoard();
                setTimeout(showTile,500);
            }
        }
    } else {
        deactivateBoard();
        gameOver(false);
    }
}

/**
 * Add the click handlers to the tiles.
 */
function activateBoard() {
    var tiles = document.forms["game"].querySelectorAll('input[type="button"]');

    //Tell the user that they can now click
    document.forms["game"].querySelector("#helper-text").innerText = "Now your turn";

    for(let i = 0; i < tiles.length; i++) {
        tiles[i].addEventListener("click",simonClick);
    }
}

/**
 * Remove the click handlers from the tiles so that clicks can't be run during the computer's turn
 */
function deactivateBoard() {
    var tiles = document.forms["game"].querySelectorAll('input[type="button"]');

    //Tell the user to watch the computer's turn
    document.forms["game"].querySelector("#helper-text").innerText = "Pay Attention...";

    for(let i = 0; i < tiles.length; i++) {
        tiles[i].removeEventListener("click",simonClick);
    }
}

/**
 * Shows the user the tile sequence for the current round
 */
function showTile() {
    //Check if we've shown all the tiles for the current round, if yes it's the user's turn
    if(guessNum === round) {
        guessNum = 0;
        activateBoard();
        return;
    } else {
        let tile = document.forms["game"].querySelector('[data-tile="'+gameOrder[guessNum]+'"]');

        //Darken the current tile
        tile.style.filter = 'brightness(50%)';

        //After the delay, return the current tile to normal and then call showTile() for the next tile
        setTimeout(function() {
            guessNum++;
            tile.style.filter = '';

            //Wait half a second before showing the next tile, this helps when the same tile is shown twice in a row
            setTimeout(showTile,500);
        },delay);
    }
}

/**
 * Ends the game and resets, pass true if a win and false if a loss
 * @param {boolean} won 
 */
function gameOver(won) {
    var overlay = document.querySelectorAll('.game-overlay');
    var overlayHeader = document.querySelector('#game-overlay-header');

    document.forms["game"].querySelector("#round-text").innerHTML = "&nbsp;";
    document.forms["game"].querySelector("#helper-text").innerHTML = "&nbsp;";

    guessNum = 0;
    round = 1;

    overlayHeader.innerHTML = won ? "You Won!" : "You Lost!";

    overlay[0].style.visibility = 'visible';
}