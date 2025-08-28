// 1. List of 10 names
let players = [
    "Kadelle", "Kadeem", "Rob", "Kent", "Obiri",
    "Dinesh", "Rochele", "Allan", "Jahel", "Dillion","Demarcus","Daniel"
];



let delayTime = 1000; // milliseconds

// Get ordinal (1st, 2nd, 3rd, etc.)
function getOrdinal(n) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

// Delay helper
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Shuffle array (Fisher-Yates)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Show draft picks
async function showDraftPicks() {
    const shuffledPlayers = [...players];
    shuffle(shuffledPlayers);

    // Disable buttons and hide "Draft Again"
    document.getElementById('startBtn').disabled = true;
    const draftAgainBtn = document.getElementById('draftAgainBtn');
    draftAgainBtn.disabled = true;
    draftAgainBtn.style.display = 'none';

    const resultsDiv = document.getElementById('draftResults');
    resultsDiv.innerHTML = '';

    for (let i = 0; i < shuffledPlayers.length; i++) {
    const pickNum = shuffledPlayers.length - i;
    const pick = document.createElement('p');

    // Add medal for top 3
    let medal = '';
    if (pickNum === 1) medal = '🥇 ';
    else if (pickNum === 2) medal = '🥈 ';
    else if (pickNum === 3) medal = '🥉 ';

    // Update text with medal and ordinal
    pick.textContent = `${medal}${getOrdinal(pickNum)} pick: ${shuffledPlayers[i]}`;

    // Optional: Style top 3
    if (pickNum <= 3) {
        pick.style.fontWeight = 'bold';
        pick.style.color = '#d32f2f'; // red
        pick.style.fontSize = '1.2em';
    }

    resultsDiv.appendChild(pick);
    await delay(delayTime);
}


    // Re-enable and show "Draft Again" button
    document.getElementById('startBtn').disabled = false;
    draftAgainBtn.disabled = false;
    draftAgainBtn.style.display = 'inline-block';
}


// Set delay
document.getElementById('setDelayBtn').onclick = function () {
    const inputVal = document.getElementById('delayInput').value;
    const seconds = parseFloat(inputVal);
    if (!isNaN(seconds) && seconds >= 0.1) {
        delayTime = seconds * 1000;
        alert(`Delay set to ${seconds} second(s)`);
    } else {
        alert("Please enter a valid delay (min 0.1 seconds)");
    }
};



// Button handlers
document.getElementById('startBtn').onclick = showDraftPicks;
document.getElementById('draftAgainBtn').onclick = showDraftPicks;