document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('grid-container');
    const scoreValue = document.getElementById('score-value');
    const continueButton = document.getElementById('continue-button');
    const features = document.querySelectorAll('.feature');
    let selectedFeature = null;
    let selectedEmoji = null;
    let score = 0;

    // Create grid cells
    for (let i = 0; i < 50; i++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.addEventListener('click', () => {
            if (selectedFeature) {
                cell.className = 'grid-cell';
                cell.textContent = selectedEmoji;
                updateScore(selectedEmoji);
            }
        });
        gridContainer.appendChild(cell);
    }

    // Feature selection
    features.forEach(button => {
        button.addEventListener('click', () => {
            features.forEach(btn => btn.classList.remove('selected')); // Deselect all buttons
            button.classList.add('selected'); // Select the clicked button
            selectedFeature = button.dataset.type;
            selectedEmoji = button.dataset.emoji;
        });
    });

    // Update score based on features placed
    function updateScore(emoji) {
        const negativeFeatures = ['🏭', '🗑️', '🌫️', '🛢️'];
        if (negativeFeatures.includes(emoji)) {
            score = Math.max(0, score - 2);
        } else {
            score += 50;
        }

        scoreValue.textContent = `Score: ${score}`;
        if (score >= 100) {
            continueButton.disabled = false;
        }
    }

    // Restart game
    window.restartGame = function() {
        score = 0;
        scoreValue.textContent = `Score: ${score}`;
        gridContainer.innerHTML = '';
        continueButton.disabled = true;
        for (let i = 0; i < 50; i++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.addEventListener('click', () => {
                if (selectedFeature) {
                    cell.className = 'grid-cell';
                    cell.textContent = selectedEmoji;
                    updateScore(selectedEmoji);
                }
            });
            gridContainer.appendChild(cell);
        }
    };
});
