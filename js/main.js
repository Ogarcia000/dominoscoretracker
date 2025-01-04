document.addEventListener("DOMContentLoaded", function() {
    let team1Total = 0;
    let team2Total = 0;
    let historyCounter = 1;

    const team1ScoreInput = document.getElementById("team1Score");
    const team2ScoreInput = document.getElementById("team2Score");
    const totalTeam1Display = document.getElementById("totalTeam1");
    const totalTeam2Display = document.getElementById("totalTeam2");
    const historySection = document.getElementById("historySection");
    const team1Header = document.getElementById("team1Header");
    const team2Header = document.getElementById("team2Header");

    // Load settings
    const savedSettings = JSON.parse(localStorage.getItem("dominoSettings")) || {};
    team1Header.textContent = savedSettings.team1Name || "Equipo 1";
    team2Header.textContent = savedSettings.team2Name || "Equipo 2";
    const gameType = parseInt(savedSettings.gameType) || 200;

    // Add points button click handler
    document.getElementById("addPointsBtn").addEventListener("click", function() {
        const team1Points = parseInt(team1ScoreInput.value) || 0;
        const team2Points = parseInt(team2ScoreInput.value) || 0;

        team1Total += team1Points;
        team2Total += team2Points;

        const team1Class = team1Points >= team2Points ? 'text-green' : 'text-red';
        const team2Class = team2Points >= team1Points ? 'text-green' : 'text-red';

        if (historyCounter === 1 && historySection.children.length === 1) {
            // Update default entry
            const defaultEntry = document.getElementById("defaultEntry");
            defaultEntry.innerHTML = `<span class="history-label">P${historyCounter}:</span>
                                  <span class="history-points">
                                      <span class="${team1Class}">${team1Points}</span> - <span class="${team2Class}">${team2Points}</span>
                                  </span>
                                  <button id="Xbutton" class="btn btn-danger btn-sm" onclick="removeHistoryItem(this)">X</button>`;
        } else {
            addToHistory(team1Points, team2Points, team1Class, team2Class);
        }

        updateTotals();
        clearInputs();
        checkVictoryConditions();
        historyCounter++;
    });

    // Reset button click handler
    document.getElementById("resetBtn").addEventListener("click", function() {
        team1Total = 0;
        team2Total = 0;
        historyCounter = 1;
        historySection.innerHTML = `
            <div id="defaultEntry" class="history-item d-flex justify-content-between align-items-center">
                <span class="history-label">P1:</span>
                <span class="history-points">
                    <span class="text-red">0</span> - <span class="text-red">0</span>
                </span>
                <button id="Xbutton" class="btn btn-danger btn-sm" onclick="removeHistoryItem(this)">X</button>
            </div>`;
        updateTotals();
        clearInputs();
    });

    // Settings button click handler
    document.getElementById("settingsBtn").addEventListener("click", function() {
        window.location.href = "settings.html";
    });

    function updateTotals() {
        totalTeam1Display.textContent = team1Total;
        totalTeam2Display.textContent = team2Total;
    }

    function clearInputs() {
        team1ScoreInput.value = "";
        team2ScoreInput.value = "";
    }

    function addToHistory(team1Points, team2Points, team1Class, team2Class) {
        const historyItem = document.createElement("div");
        historyItem.classList.add("history-item", "d-flex", "justify-content-between", "align-items-center");
        historyItem.innerHTML = `<span class="history-label">P${historyCounter}:</span>
                             <span class="history-points">
                                <span class="${team1Class}">${team1Points}</span> - <span class="${team2Class}">${team2Points}</span>
                             </span>
                             <button id="Xbutton" class="btn btn-danger btn-sm" onclick="removeHistoryItem(this)">X</button>`;
        historySection.appendChild(historyItem);
    }

    function checkVictoryConditions() {
        const victorySound = new Audio('assets/audio/victory.mp3');
        const goatSound = new Audio('assets/audio/goat.mp3');
        
        if (team1Total >= gameType || team2Total >= gameType) {
            if (savedSettings.enableSound) {
                victorySound.play();
            }
            alert(`¡${team1Total >= gameType ? team1Header.textContent : team2Header.textContent} ha ganado!`);
        } else if ((team1Total === 0 || team2Total === 0) && savedSettings.enableSpecialSound) {
            goatSound.play();
        }
    }
});

// Global function for removing history items
function removeHistoryItem(button) {
    button.parentElement.remove();
} 