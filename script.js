const symbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

const cards = symbols.concat(symbols); // Create pairs of symbols

let flippedCards = [];
let matchedCards = [];

function createCard(symbol) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.textContent = symbol;
    cardElement.addEventListener('click', () => flipCard(cardElement));
    return cardElement;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function renderCards() {
    const memoryGameElement = document.querySelector('.memory-game');
    shuffle(cards);

    cards.forEach(symbol => {
        const cardElement = createCard(symbol);
        memoryGameElement.appendChild(cardElement);
    });
}

function flipCard(card) {
    if (!card.classList.contains('flipped') && flippedCards.length < 2) {
        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.textContent === card2.textContent) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);
        if (matchedCards.length === cards.length) {
            setTimeout(() => alert('Congratulations! You won the game!'), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }, 1000);
    }

    flippedCards = [];
}

renderCards();
