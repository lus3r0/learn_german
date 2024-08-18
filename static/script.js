document.getElementById('startButton').addEventListener('click', async function() {
    const response = await fetch('/get_phrases', { method: 'POST' });
    const data = await response.json();
    const phrases = data.phrases;

    let currentIndex = 0;
    const phraseElem = document.getElementById('phrase');
    const translationElem = document.getElementById('translation');
    const flashcardElem = document.getElementById('flashcard');

    function updateFlashcard() {
        phraseElem.textContent = phrases[currentIndex][0];
        translationElem.textContent = phrases[currentIndex][1];
        translationElem.style.display = 'none';
    }

    document.getElementById('prevButton').addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateFlashcard();
        }
    });

    document.getElementById('nextButton').addEventListener('click', function() {
        if (currentIndex < phrases.length - 1) {
            currentIndex++;
            updateFlashcard();
        }
    });

    phraseElem.addEventListener('click', function() {
        translationElem.style.display = 'block';
    });

    updateFlashcard();
    document.getElementById('flashcards').style.display = 'block';
    document.getElementById('resetButton').style.display = 'inline';
    document.getElementById('startButton').style.display = 'none';
});

document.getElementById('resetButton').addEventListener('click', function() {
    document.getElementById('flashcards').style.display = 'none';
    document.getElementById('resetButton').style.display = 'none';
    document.getElementById('startButton').style.display = 'inline';
});
