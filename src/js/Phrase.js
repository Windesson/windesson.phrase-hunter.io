/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */
class Phase {

    constructor(phrase) {
        this._phrase = phrase.toLowerCase(); 
    }

    //adds letter placeholders to the display when the game starts.
    addPhraseToDisplay() {
        let $phraseList = $("#phrase ul");
        $phraseList.empty();

        this._phrase
            .split('')
            .forEach(letter => {
                if (/\s+/.test(letter)) {
                    $phraseList.append($('<li class="space"></li>'));
                }
                else {
                    $phraseList.append($(`<li class="hide letter ${letter}">${letter}</li>`));
                }
            });
    }

    //checks to see if the letter selected by the player matches a letter in the phrase.
    checkLetter(letter) {
        return this._phrase.includes(letter);
    }

    //reveals the letter(s) on the board that matches the player's selection.
    showMatchedLetter(letter) {
        $(".letter")
            .each(function () {
                if ($(this).html() === letter) {
                    $(this).removeClass('hide');
                    $(this).addClass('show');
                }
            });   
    }
}