(function($, undefined) {
        'use strict';
        
        let turn = 'X'; //sets turn to X's turn to start
        const $game = $('#game'); //jQuery selector that targets the game id.
        const $cells = $('.cell', $game) //jQuery selector that targets the cells of the game board
        const $turnIndicator = $('#turnIndicator') //jQuery selector that targets the turnIndicator id


        document.addEventListener('DOMContentLoaded', (e) => { //Causes code to wait until DOM content is loaded

            $(function() { //Function that allows the cells to be filled with an X or O.
                $cells.each((index, cell) => { //Goes through each cell
                    $(cell).on('click', (e) => { //When clicked....
                        if(!$(e.currentTarget).text()) { //...fill the cell with.... 
                            if (turn === 'X') { //....X if it is X's turn
                                $(e.currentTarget).html('<i class="bi bi-x-lg"></i>'); //Places the X
                                turn = 'O'; //Switches turn to O's turn after clicking
                                $turnIndicator.html("Player O's Turn") //Changes turn message to O's turn
                            } else { //...or...
                                $(e.currentTarget).html('<i class="bi bi-circle"></i>'); //Places an O
                                turn = 'X'; //changes to X's turn
                                $turnIndicator.html("Player X's Turn") //Changes turn to message to X's turn
                            }
                            checkVictory(); //calls checkVictory function to determine if there is a win or tie.
                        }   
                    });
                });
            });

                function checkVictory() {
                    const winningBlocks = [ //Arrays to set up the victory conditions
                        [0, 1, 2], //Verticals
                        [3, 4, 5],
                        [6, 7, 8],
                        
                        [0, 3, 6], //Horizontals
                        [1, 4, 7], 
                        [2, 5, 8],
                
                        [0, 4, 8], //Diagonals
                        [2, 4, 6]
                    ];
                    
                    for(let i = 0; i < winningBlocks.length; i+=1) { //Loop through each of the cells
                        const [a, b, c] = winningBlocks[i]; //Extracts the winning positions
                        
                        const $cellAContent = $(`.cell[data-cell="${a}"]`).html(); //Grabs the content from cell A
                        const $cellBContent = $(`.cell[data-cell="${b}"]`).html(); //Grabs the content from Cell B
                        const $cellCContent = $(`.cell[data-cell="${c}"]`).html(); //Grabs the content from Cell C

                        if($cellAContent && $cellAContent === $cellBContent && $cellAContent === $cellCContent) { //If the winning conditions are met...
                            if($cellAContent.includes('bi-x-lg')){ //If it includes the X...
                                showAlert('Player X wins!', 'success') //Alert, winner!
                            } else { //Or...
                                showAlert('Player O wins!', 'success') //Alert, winner!
                            }
                            return true; //Return a victory!
                    }
                }
                if(tieGame()) { //Or, if we have a tie... (using tieGame function)
                    showAlert('Tie Game! Reset to play again!', 'warning') //Displays tie game message
                }
                return false; //Return no winner
            };

            function resetGame() { //Function to reset the game.
                $cells.each((index, cell) => { //Goes through each cell and..
                    $(cell).html(''); //Empties the string in the html
                });

                turn = 'X'; //Returns the turn to X's turn

                $turnIndicator.html("Player X's Turn"); //Sets the turn message to Player X's turn
            };

            $(function () { //Gives the reset button functionality.
                const $resetButton = $('#button-1'); //jQuery selector to select the button from HTML.
                $resetButton.on('click', resetGame); //When clicked, resets the game.
            });

            function tieGame() { //Function on what to do if the game is tied.
                let filledCells = 0; //Sets filled cells to zero to start the game.
                $cells.each(function() { //Loops through each cell
                    if($(this).html() !== '') { //If the cell is filled...
                        filledCells++; //filledCells increases by one.
                    }
                });
                return filledCells === 9; //When the game is tied, filledCells will equal 9.
            };

            function showAlert(message, type) { //Function to create bootstrap alerts
                const alertTypeClass = type === 'success' ? 'alert-success' : 'alert-warning'; //If alert is success, will use alert-success. Otherwise, alert-warning.
                const $alert = $(`<div class="alert ${alertTypeClass} alert-dismissible fade show mt-3" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`); //Creates a line of html to display the message of who won or who tied.
            $('#game').before($alert); //Sets alert before game class.

            setTimeout(() => { //Sets a timer of 5 seconds when the message will disappear. 
                $alert.alert('close');
            }, 5000);
        }
    });    
})(jQuery);