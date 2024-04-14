let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleClick(index) {
    if (!gameActive) {
        return;
    }

    if (gameBoard[index] === '') {
        gameBoard[index] = currentPlayer;
        document.getElementsByClassName('cell')[index].innerText = currentPlayer;
        document.getElementsByClassName('cell')[index].classList.add(currentPlayer === 'X' ? 'x-piece' : 'o-piece');
        checkWinner();
        togglePlayer();
    }
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            showWinnerMessage(`${currentPlayer} venceu!`);
            return;
        }
    }

    if (!gameBoard.includes('')) {
        showWinnerMessage('Empate!');
        return;
    }
}

function showWinnerMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('winner-message');
    document.body.appendChild(messageElement);
    gameActive = false;
}

function restartGame() {
    // Limpa o tabuleiro e reinicia variáveis
    for (let i = 0; i < gameBoard.length; i++) {
        gameBoard[i] = '';
        document.getElementsByClassName('cell')[i].innerText = '';
        document.getElementsByClassName('cell')[i].classList.remove('x-piece', 'o-piece');
    }

    currentPlayer = 'X';
    gameActive = true;
    // Remove a mensagem de vencedor, se houver
    const winnerMessageElement = document.querySelector('.winner-message');
    if (winnerMessageElement) {
        winnerMessageElement.remove();
    }
}

// Adiciona um event listener para reiniciar automaticamente quando o jogo terminar
document.addEventListener('click', function (event) {
    const restartButton = event.target.closest('.cell');
    if (restartButton && !gameBoard.includes('')) {
        restartGame();
    }
});
