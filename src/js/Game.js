/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

//store last phrase index used to help to avoid from duplication on the next game
var lastPhraseIndex = ""; 

class Game {

    
    constructor() {
        this._missed = 0; //track the number of missed guesses by the player
        this._phrases = [  //a narray of five Phrase objects to use with the game.
            "just do it",
            "Coding is fun",
            "I love you",
            "never give up",
            "pretty boy maluma"
        ];
        this._activePhrase = null; //Phrase object that’s currently in play.

    }

    //Hides the start screen overlay and 
    //adds the chosen phrase to the board
    startGame() {
        this._activePhrase = new Phase(this.getRandomPhrase());
        this._activePhrase.addPhraseToDisplay();

        $("#overlay").hide();
    }

    //Resetting the gameboard between games.
    resetGame() {
        $("#phrase ul").empty();
        $(".key").each(function () {
            $(this).removeClass("chosen wrong");
            $(this).attr("disabled", false);
        });
        $(".tries img[src='images/lostHeart.png']").attr("src", "images/liveHeart.png");
    }

    //randomly retrieves one of the phrases stored in the phrases
    getRandomPhrase() {
        let randomIndex;
        const max = this._phrases.length;

        do {
            randomIndex = Math.floor(Math.random() * max);
        } while (randomIndex === lastPhraseIndex);

        lastPhraseIndex = randomIndex;
        return this._phrases[randomIndex];
    }

    //controls most of the game logic.
    handleInteraction() {

        const $btn = $(event.target);
        if (!$btn.hasClass('key')) return;
        const clickedLetter = $btn.html();

        //Disable the selected letter’s onscreen keyboard button
        $btn.attr("disabled", true);

        //checks to see if the button clicked by the player matches a letter in the phrase
        if (this._activePhrase.checkLetter(clickedLetter)) {
            $btn.addClass('chosen');
            this._activePhrase.showMatchedLetter(clickedLetter);
            if (this.checkForWin()) this.gameOver();
        } else {
            $btn.addClass('wrong');
            this.removeLife();
        }

    }

    //Removes a life from the scoreboard
    removeLife() {
        $(".tries img[src='images/liveHeart.png']")
            .last()
            .attr("src", "images/lostHeart.png");

        this._missed += 1;

        if (this._missed >= 5) this.gameOver();
    }

    //Checks to see if the player has revealed 
    //all of the letters in the active phrase
    checkForWin() {
        return $('.letter').filter('.hide').length === 0;
    }

    //Displays the original start screen overlay and 
    //a friendly win or loss message
    gameOver() {
       
        const $overLay = $("#overlay");
        const $gameOverMessage = $("#game-over-message");
        if (this.checkForWin()) {
            $gameOverMessage.html("Congrats! YOU'VE WON!");
            $overLay.removeClass("lose");
            $overLay.addClass("win");
        } else {
            $gameOverMessage.html("Sorry you just lost the Game. Please try again..");
            $overLay.removeClass("win");
            $overLay.addClass("lose");
        }

        $overLay.show();
        this.resetGame();

    }
}