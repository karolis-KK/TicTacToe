function Player(name, score = 0) {
    this.name = name;
    this.score = score;
}

// Player 1 = X; Player 2 = O
let turn, turn_h1, won, turns = 0;
let board_arr = ["", "", "", "", "", "", "", "", ""]

const board = document.getElementById("board");
const start = document.getElementById("start");
const restart = document.getElementById("restart");
const name_1 = document.getElementById("name_1");
const name_2 = document.getElementById("name_2");
const score_1_display = document.getElementById("score_1_display");
const score_2_display = document.getElementById("score_2_display");

let player1 = new Player(name_1.value);
let player2 = new Player(name_2.value);

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checker(item) {
    for(const combination of winningCombinations) {
        if (board_arr[combination[0]] === item && board_arr[combination[1]] === item && board_arr[combination[2]] === item) {
            return item;
        }
    }
    return null;
}


start.addEventListener("click", () => {
    won = document.createElement("h1")
    start.disabled = true
    turns = 0
    if (name_1.value === name_2.value) {
        alert("Please choose different names")
    }
    else {
        board.className += " bg-neutral-600"
        if (Math.floor(Math.random() * 2) === 0) {
            turn = player1.name
        }
        else {
            turn = player2.name
        }
        turn_h1 = document.createElement("h1");
        turn_h1.textContent = `${turn}'s turn`
        turn_h1.className = "mt-4 text-neutral-800 font-semibold text-lg"
        document.body.insertBefore(turn_h1, board)
        for (let i = 0; i < 9; i++) {
            const tile = document.createElement("button");
            tile.className = "btn bg-white h-[9rem] w-[9rem] flex justify-center items-center text-5xl text-neutral-800 font-bold";
            tile.id = i
            function turnFunction(symbol, player) {
                tile.textContent = symbol
                tile.disabled = true
                turn = player.name
                turn_h1.textContent = `${player.name}'s turn`
                board_arr[tile.id] = symbol
                turns++
                game()   
            }
            tile.addEventListener("click", () => {
                if (turn === player1.name) {
                    turnFunction("X", player2)
                }
                else {
                    turnFunction("O", player1)
                }
            })
            board.appendChild(tile);
        }
    }
})

function endGameButtons() {
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach(button => {
        button.disabled = true
    })
}

function gameFunction(playerr, playerString, score, symbool) {
    playerr.score++
    score.textContent = `${playerString} (${symbool}) score: ${playerr.score}`
    won = document.createElement("h1")
    won.className = "mt-4 text-neutral-800 font-semibold text-lg"
    won.textContent = `${playerString} won!`
    document.body.insertBefore(won, turn_h1)
    endGameButtons()
    board_arr = []
    restart.className = "bg-green-500 ml-4 px-6 py-3 rounded-full text-neutral-100"
}

function game() {
    if (checker("X") === "X") {
        gameFunction(player1, "Player 1", score_1_display, "X")
    }
    else if (checker("O") === "O") {
        gameFunction(player2, "Player 2", score_2_display, "O")
    }
    else if (turns === 9) {
        won = document.createElement("h1")
        won.className = "mt-4 text-neutral-800 font-semibold text-lg"
        won.textContent = "Tie"
        document.body.insertBefore(won, turn_h1)
        endGameButtons()
        board_arr = []
        restart.className = "bg-green-500 ml-4 px-6 py-3 rounded-full text-neutral-100"
    }
}

restart.addEventListener("click", () => {
    restart.className = "bg-neutral-200 ml-4 px-6 py-3 rounded-full text-neutral-600"
    turn_h1.remove() 
    won.remove()

    while (board.firstChild) {
        board.firstChild.remove()
    }
    board.className = "flex flex-wrap w-[436px] h-[436px] gap-0.5 mt-12"
    turn = ""
    start.disabled = false  
})