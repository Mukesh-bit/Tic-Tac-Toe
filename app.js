const cells = document.querySelectorAll('.cell')
const player1 = document.querySelector('.player1')
const player2 = document.querySelector('.player2');
const btn = document.querySelector('.btn');
const alert = document.querySelector('.alert');

let currentPlayer = 'X';
let secondPlayer = 'O';
let playerTurn = currentPlayer;



// Function To change Turn
const changePlayerTurn = () => {
    playerTurn = playerTurn === currentPlayer ? secondPlayer : currentPlayer;
}

// Function to check win
const winCheck = () => {
    const winningCondition = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ]

    for(let i=0; i<winningCondition.length; i++) {
        const [pos1,pos2,pos3] = winningCondition[i];
        if(cells[pos1].innerHTML !== "" && cells[pos1].innerHTML === cells[pos2].innerHTML && cells[pos2].innerHTML === cells[pos3].innerHTML) {
            return true;
        }
    }
    return false;
}

// Function To Check Tie
const checkTie = () => {
    let emptyCell = 0;
    cells.forEach(cell => {
        if(cell.innerHTML === ""){
            emptyCell++;
        }
    });
    return emptyCell === 0 && !winCheck();
}

// Function to HandelClick
const HandelClick = (e) => {
    if(e.target.innerHTML === "") {
        e.target.innerHTML = playerTurn;
        if(winCheck()) {
            showAlert(`${playerTurn} is winner`)
            disableCell()
        }
        else if(checkTie())  {
            showAlert('Tie Match')
            disableCell()
        }
        else {
            changePlayerTurn();
            showAlert(`Turn For Player : ${playerTurn}`)
        }
    }
}

// Function To Disable Cell
const disableCell = () => {
    cells.forEach(cell => {
        cell.removeEventListener('click', HandelClick);
        cell.classList.add('disable');
    })
}

// Function to start Game
const startGame = () => {
    cells.forEach(cell =>{
        cell.addEventListener('click', HandelClick)
    })
}

// Function To RestartGame
const restartGame = () => {
    cells.forEach(cell => {
        cell.innerHTML = "";
        cell.classList.remove('disable')
    })

    startGame();
    alert.innerHTML = "Turn For Player : X"
}

// Function To ShowAlert
const showAlert = (msg) => {
    alert.innerHTML = msg
}


startGame();

// Restart the Game
btn.addEventListener('click', restartGame);
