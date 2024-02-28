
const leftSection = document.querySelector('.leftSection');
const rightSection = document.querySelector('.rightSection');
const centerPile = document.querySelector('.centerPile');

let cardList = [1, 2, 3, 4, 5, 6, 7];
let player1Hand = [];
let player2Hand = [];
let currentPlayer = 1; // başlangıçta oyuncu 1 olarak başlar.

// diziden rastgele bir kart seçtim
function getRandomCard() {
    const randomIndex = Math.floor(Math.random() * cardList.length);
    return cardList[randomIndex];
}

// renk ve sayı bilgileri kartların içinde tutuluyo
function createCard(value, color) {
    return {
        value: value,
        color: color
    };
}

// colors dizisinden rastgele bir renk seçtim
function getRandomColor() {
    const colors = ['blue', 'yellow', 'green', 'red'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

// kartları oluşturdum, kartların değeri ve rengi dinamik olarak belirlenebilir 
function createCardElement(card) {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.textContent = card.value;
    cardElement.style.backgroundColor = card.color;
    cardElement.addEventListener('click', () => playCard(card));
    return cardElement;
}

// desteyi rastgele karıştırdım
function shuffleDeck() {
    for (let i = cardList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardList[i], cardList[j]] = [cardList[i], cardList[j]];
    }
}

// oyuncu kartlarını başlangıçta göstermek için
function showInitialCards() {
    const player1InitialCards = [];
    const player2InitialCards = [];

    for (let i = 0; i < 7; i++) {
        player1InitialCards.push(createCard(getRandomCard(), getRandomColor()));
        player2InitialCards.push(createCard(getRandomCard(), getRandomColor()));
    }

    player1Hand = player1InitialCards;
    player2Hand = player2InitialCards;

    updatePlayer1Hand();
    updatePlayer2Hand();

}

// oyuncuların sırayla kartlarını oynamasını sağladım.
function playCard(card) {
    if (currentPlayer === 1) {
        const index = player1Hand.findIndex(handCard => handCard.value === card.value);
        if (index > -1) {
            player1Hand.splice(index, 1);
            updatePlayer1Hand();
            updateCenterPile(card); // oyunun kazanılıp kazanılmadığını kontrol ediyo
            checkWin();
            currentPlayer = 2; // sıra oyuncu 2' nin

        }
    } else if (currentPlayer === 2) {
        const index = player2Hand.findIndex(handCard => handCard.value === card.value);
        if (index > -1) {
            player2Hand.splice(index, 1);
            updatePlayer2Hand();
            updateCenterPile(card);
            checkWin();
            currentPlayer = 1;
        }
    }
}

// oyuncu 1'in elindeki kartları günceller 
function updatePlayer1Hand() {
    const player1Cards = document.querySelector('.player1Cards');
    player1Cards.innerHTML = '';
    player1Hand.forEach(card => {
        const cardElement = createCardElement(card);
        player1Cards.appendChild(cardElement);
    });
}

//  oyuncu 2'in elindeki kartları günceller 
function updatePlayer2Hand() {
    const player2Cards = document.querySelector('.player2Cards');
    player2Cards.innerHTML = '';
    player2Hand.forEach(card => {
        const cardColor = getRandomColor();
        const cardElement = createCardElement(card);
        player2Cards.appendChild(cardElement);
    });
}

// ortaya hangi kartın atıldığını gösterir
function updateCenterPile(card) {
    centerPile.textContent = card.value;
    centerPile.style.backgroundColor = card.color;
}

// oyunun kazananını kontrol ediyo
function checkWin() {
    if (player1Hand.length === 0) {
        alert("Oyuncu 1 Kazandı!");
        resetGame();
    } else if (player2Hand.length === 0) {
        alert("Oyuncu 2 Kazandı!");
        resetGame();
    }
}

//oyunu sıfırlar
function resetGame() {
    cardList = [1, 2, 3, 4, 5, 6, 7];
    player1Hand = [];
    player2Hand = [];
    updateCenterPile('');
    centerPile.style.backgroundColor = '#f0f0f0';
    startGame();
}

shuffleDeck();
showInitialCards();
