let phrases = [];
let currentIndex = 0;

document.getElementById('startButton').addEventListener('click', () => {
    fetch('/get_phrases')
        .then(response => response.json())
        .then(data => {
            phrases = data;
            currentIndex = 0;
            document.getElementById('phrase').innerText = phrases[currentIndex].phrase;
            document.getElementById('translation').innerText = phrases[currentIndex].translation;
            document.getElementById('flashcards').style.display = 'block';
            document.getElementById('startButton').style.display = 'none';
            document.getElementById('resetButton').style.display = 'inline';
        });
});

document.getElementById('nextButton').addEventListener('click', () => {
    if (currentIndex < phrases.length - 1) {
        currentIndex++;
        document.getElementById('phrase').innerText = phrases[currentIndex].phrase;
        document.getElementById('translation').style.display = 'none';
    }
});

document.getElementById('prevButton').addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        document.getElementById('phrase').innerText = phrases[currentIndex].phrase;
        document.getElementById('translation').style.display = 'none';
    }
});

document.getElementById('resetButton').addEventListener('click', () => {
    phrases = [];
    currentIndex = 0;
    document.getElementById('flashcards').style.display = 'none';
    document.getElementById('startButton').style.display = 'inline';
    document.getElementById('resetButton').style.display = 'none';
});

document.getElementById('phrase').addEventListener('click', () => {
    document.getElementById('translation').style.display = 'block';
});
