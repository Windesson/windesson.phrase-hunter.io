/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

main = () => {
    var game;

    $("#btn__reset").click( () => {
        game = new Game();
        game.startGame();
    });

    $("#qwerty").click( () => {
        game.handleInteraction();
    });
};


//call main once content is loaded.
document.addEventListener('DOMContentLoaded', () => { main(); });