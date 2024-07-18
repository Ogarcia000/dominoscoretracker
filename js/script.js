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

    const savedSettings = JSON.parse(localStorage.getItem("dominoSettings"));
    if (savedSettings) {
        team1Header.textContent = savedSettings.team1Name || "Equipo 1";
        team2Header.textContent = savedSettings.team2Name || "Equipo 2";
        gameType = parseInt(savedSettings.gameType) || 200;
    }

    document.getElementById("addPointsBtn").addEventListener("click", function() {
        const team1Points = parseInt(team1ScoreInput.value) || 0;
        const team2Points = parseInt(team2ScoreInput.value) || 0;

        team1Total += team1Points;
        team2Total += team2Points;

        const team1Class = team1Points >= team2Points ? 'text-green' : 'text-red';
        const team2Class = team2Points >= team1Points ? 'text-green' : 'text-red';

        if (historyCounter === 1 && historySection.children.length === 1) {
            // Actualiza la entrada por defecto
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

    window.removeHistoryItem = function(button) {
        const listItem = button.parentElement;
        const points = listItem.innerText.match(/(\d+) - (\d+)/);
        const team1Points = parseInt(points[1]);
        const team2Points = parseInt(points[2]);

        team1Total -= team1Points;
        team2Total -= team2Points;

        listItem.remove();
        updateTotals();
    }

    function getRandomItem(array) {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }

    function checkVictoryConditions() {
        const gameType = parseInt(savedSettings.gameType) || 200;
        const enableSound = savedSettings.enableSound || false;
        const enableSpecialSound = savedSettings.enableSpecialSound || false;

        const victoryImages = ['../img/victory/img1.jpg', '../img/victory/img2.jpg', '../img/victory/img3.jpg', '../img/victory/img4.jpg', '../img/victory/img5.jpg'];
        const zeroScoreImages = ['../img/lose/goat1.jpg', '../img/lose/goat2.jpg', '../img/lose/goat3.jpg', '../img/lose/goat4.jpg', '../img/lose/goat5.jpg'];
        const victorySounds = ['../sounds/victory.mp3'];
        const specialSounds = ['../sounds/goat.mp3'];

        if (team1Total >= gameType || team2Total >= gameType) {
            if (team1Total >= gameType && team2Total > 0) {
                if (enableSound) {
                    playSound(getRandomItem(victorySounds));
                }
                showImage(getRandomItem(victoryImages));
            } else if (team2Total >= gameType && team1Total > 0) {
                if (enableSound) {
                    playSound(getRandomItem(victorySounds));
                }
                showImage(getRandomItem(victoryImages));
            }

            if (team1Total >= gameType && team2Total === 0) {
                if (enableSpecialSound) {
                    playSound(getRandomItem(specialSounds));
                }
                showImage(getRandomItem(zeroScoreImages));
            } else if (team2Total >= gameType && team1Total === 0) {
                if (enableSpecialSound) {
                    playSound(getRandomItem(specialSounds));
                }
                showImage(getRandomItem(zeroScoreImages));
            }
        }
    }

    function playSound(soundPath) {
        const audio = new Audio(soundPath);
        audio.play();
    }

    function showImage(imagePath) {
        const image = new Image();
        image.src = imagePath;
        image.style.display = "block";
        image.style.position = "fixed";
        image.style.top = "50%";
        image.style.left = "50%";
        image.style.height = "400px";
        image.style.width = "400px";
        image.style.transform = "translate(-50%, -50%)";
        image.style.zIndex = "1000";
        document.body.appendChild(image);
        setTimeout(() => {
            document.body.removeChild(image);
        }, 4000); // Mostrar la imagen durante 3 segundos
    }
});
