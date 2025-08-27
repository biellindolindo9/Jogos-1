// Variáveis globais
let gameState = {
    ticTacToe: ['', '', '', '', '', '', '', '', ''],
    currentPlayer: 'X',
    memoryCards: [],
    flippedCards: [],
    matches: 0,
};

// Mostrar jogo selecionado
function showGame(game) {
    document.querySelectorAll('.game').forEach(gameDiv => gameDiv.style.display = 'none');
    document.getElementById(game).style.display = 'block';
    if (game === 'memory-game') {
        createMemoryGame();
    }
}

// Adivinhação de Número
function guessNumber() {
    const guess = parseInt(document.getElementById('guess').value);
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    const feedback = document.getElementById('guess-feedback');

    if (guess === randomNumber) {
        feedback.textContent = 'Você acertou!';
    } else {
        feedback.textContent = `Errou! O número era ${randomNumber}.`;
    }
}

// Jogo da Velha
function playTicTacToe(index) {
    if (gameState.ticTacToe[index] === '') {
        gameState.ticTacToe[index] = gameState.currentPlayer;
        document.querySelectorAll('.tic-tac-toe-btn')[index].textContent = gameState.currentPlayer;
        if (checkWinner()) {
            document.getElementById('tic-tac-toe-status').textContent = `${gameState.currentPlayer} venceu!`;
            setTimeout(resetTicTacToe, 2000);
        } else {
            gameState.currentPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameState.ticTacToe[a] && gameState.ticTacToe[a] === gameState.ticTacToe[b] && gameState.ticTacToe[a] === gameState.ticTacToe[c]) {
            return true;
        }
    }
    return false;
}

function resetTicTacToe() {
    gameState.ticTacToe = ['', '', '', '', '', '', '', '', ''];
    gameState.currentPlayer = 'X';
    document.querySelectorAll('.tic-tac-toe-btn').forEach(btn => btn.textContent = '');
    document.getElementById('tic-tac-toe-status').textContent = '';
}

// Jogo da Memória
function createMemoryGame() {
    const cardValues = ['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D'];
    shuffleArray(cardValues);

    const memoryBoard = document.querySelector('.memory-board');
    memoryBoard.innerHTML = '';
    gameState.flippedCards = [];
    gameState.matches = 0;

    cardValues.forEach((value, index) => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.index = index;
        card.dataset.value = value;
        card.textContent = '';
        card.addEventListener('click', flipCard);
        memoryBoard.appendChild(card);
    });
}

function flipCard(event) {
    const card = event.target;

    if (card.classList.contains('flipped') || gameState.flippedCards.length >= 2) return;

    card.textContent = card.dataset.value;
    card.classList.add('flipped');
    gameState.flippedCards.push(card);

    if (gameState.flippedCards.length === 2) {
        const [card1, card2] = gameState.flippedCards;

        if (card1.dataset.value === card2.dataset.value) {
            gameState.matches++;
            document.getElementById('memory-feedback').textContent = `Pares encontrados: ${gameState.matches}`;
            gameState.flippedCards = [];

            if (gameState.matches === 4) {
                document.getElementById('memory-feedback').textContent = 'Você venceu o jogo da memória!';
            }
        } else {
            setTimeout(() => {
                card1.textContent = '';
                card2.textContent = '';
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                gameState.flippedCards = [];
            }, 800);
        }
    }
}

// Função para embaralhar as cartas
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
