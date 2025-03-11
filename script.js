const initialScene = {
    text: "Welcome to the adventure! Where do you want to go?",
    ascii: `
        🏰      🌲🌲🌲🌲🌲      🏰
        🏰      | Start |      🏰
        🏰      [ 1  2 ]      🏰
        🏰____________________🏰
    `,
    choices: {
        1: "Enter the forest 🌲",
        2: "Descend into the dungeon 🏰"
    },
    next: {
        1: 1, // Start forest scene
        2: 2  // Start dungeon scene
    }
};

function makeChoice(choice) {
    const scene = scenes[choice];

    document.getElementById("text").innerText = scene.text;
    document.getElementById("ascii-art").innerText = scene.ascii || "";

    // Save current game state
    localStorage.setItem("currentScene", choice);

    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = "";

    if (Object.keys(scene.choices).length > 0) {
        for (const key in scene.choices) {
            const btn = document.createElement("button");
            btn.innerText = scene.choices[key];
            btn.onclick = function () {
                playSound();
                makeChoice(scene.next[key]);
            };
            choicesDiv.appendChild(btn);
        }
    } else {
        const restartBtn = document.createElement("button");
        restartBtn.innerText = "Restart 🔄";
        restartBtn.onclick = () => restartGame();
        choicesDiv.appendChild(restartBtn);
    }
}

// Restart function
function restartGame() {
    localStorage.removeItem("currentScene");
    loadGame(); // Reload from start
}

// Load saved state or start at the scene selection
function loadGame() {
    const savedScene = localStorage.getItem("currentScene");
    if (savedScene) {
        makeChoice(savedScene);
    } else {
        makeChoice(0); // Show starting scene (forest or dungeon choice)
    }
}

// Ensure game starts only after page is fully loaded
document.addEventListener("DOMContentLoaded", loadGame);

// Game scenes
const scenes = {
    0: initialScene,
    1: {
        text: "You entered a dark forest. There's a path ahead and an old bridge. Where do you go?",
        ascii: `
         🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲
         🌲        |        🌲
         🌲    --/ \\--    🌲
         🌲   /     \\   🌲
         🌲  /       \\  🌲
         🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲🌲
        `,
        choices: { 1: "Follow the path 🌿", 2: "Cross the bridge 🌉" },
        next: { 1: 3, 2: 4 }
    },
    2: {
        text: "You descended into a dungeon. There are two doors. Which one do you choose?",
        ascii: `
         🏰🏰🏰🏰🏰🏰🏰🏰🏰🏰🏰🏰
         🏰        |        🏰
         🏰   [  🚪  🚪  ]   🏰
         🏰      DUNGEON      🏰
         🏰__________________🏰
        `,
        choices: { 1: "Left door 🚪", 2: "Right door 🚪" },
        next: { 1: 5, 2: 6 }
    },
    3: { text: "You found a chest full of gold! 🏆", ascii: "💰💰💰💰💰💰💰", choices: {}, next: {} },
    4: { text: "The bridge collapsed, and you fell into the river... 🌊", ascii: "~~~~ 🌊🌊🌊 ~~~~", choices: {}, next: {} },
    5: { text: "You found a powerful sword! ⚔", ascii: "  /\\   ⚔   /\\  ", choices: {}, next: {} },
    6: { text: "A monster was waiting for you... 🐉", ascii: "  (🦖) RAAAH!", choices: {}, next: {} }
};
