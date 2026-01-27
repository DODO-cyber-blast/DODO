const generateBtn = document.getElementById('generate-btn');
const numbersContainer = document.getElementById('numbers');

generateBtn.addEventListener('click', () => {
    generateAndDisplayNumbers();
});

function generateAndDisplayNumbers() {
    const numbers = generateLottoNumbers();
    displayNumbers(numbers);
}

function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

function displayNumbers(numbers) {
    numbersContainer.innerHTML = '';
    for (const number of numbers) {
        const numberDiv = document.createElement('div');
        numberDiv.className = 'number';
        numberDiv.textContent = number;
        numbersContainer.appendChild(numberDiv);
    }
}

// Generate numbers on initial load
generateAndDisplayNumbers();
