document.addEventListener("DOMContentLoaded", function() {
    const settingsForm = document.getElementById("settingsForm");

    settingsForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const team1Name = document.getElementById("team1Name").value;
        const team2Name = document.getElementById("team2Name").value;
        const numPlayers = document.getElementById("numPlayers").value;
        const gameType = document.getElementById("gameType").value;
        const language = document.getElementById("language").value;
        const enableSound = document.getElementById("enableSound").checked;
        const enableSpecialSound = document.getElementById("enableSpecialSound").checked;

        const settings = {
            team1Name,
            team2Name,
            numPlayers,
            gameType,
            language,
            enableSound,
            enableSpecialSound
        };

        localStorage.setItem("dominoSettings", JSON.stringify(settings));
        window.location.href = "index.html";
    });

    // Load saved settings
    const savedSettings = JSON.parse(localStorage.getItem("dominoSettings"));
    if (savedSettings) {
        document.getElementById("team1Name").value = savedSettings.team1Name || "";
        document.getElementById("team2Name").value = savedSettings.team2Name || "";
        document.getElementById("numPlayers").value = savedSettings.numPlayers || 2;
        document.getElementById("gameType").value = savedSettings.gameType || "200";
        document.getElementById("language").value = savedSettings.language || "es";
        document.getElementById("enableSound").checked = savedSettings.enableSound || false;
        document.getElementById("enableSpecialSound").checked = savedSettings.enableSpecialSound || false;
    }
}); 