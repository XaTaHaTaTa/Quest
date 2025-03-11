const scenes = {
    1: {
        text: "You entered a dark forest. There's a path ahead and an old bridge. Where do you go?",
        choices: {
            1: "Follow the path 🌿",
            2: "Cross the bridge 🌉"
        },
        next: {
            1: 3,
            2: 4
        }
    },
    2: {
        text: "You descended into a dungeon. There are two doors. Which one do you choose?",
        choices: {
            1: "Left door 🚪",
            2: "Right door 🚪"
        },
        next: {
            1: 5,
            2: 6
        }
    },
    3: { text: "You found a chest full of gold! 🏆", choices: {}, next: {} },
    4: { text: "The bridge collapsed, and you fell into the river... 🌊", choices: {}, next: {} },
    5: { text: "You found a powerful sword! ⚔", choices: {}, next: {} },
    6: { text: "A monster was waiting for you... 🐉", choices: {}, next: {} }
};

function playSound() {
    let sound = document.getElementById("sound");
    if (sound) {
        sound.play();
    }
}

function makeChoice(choice) {
    const scene = scenes[choice];
    document.getElementById("text").innerText = scene.text;

    // Save current game state
    localStorage.setItem("currentScene", choice);

    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = "";

    for (const key in scene.choices) {
        const btn = document.createElement("button");
        btn.innerText = scene.choices[key];
        btn.onclick = () => {
            playSound();
            makeChoice(scene.next[key]);
        };
        choicesDiv.appendChild(btn);
    }
}

// Load saved state when page loads
window.onload = () => {
    const savedScene = localStorage.getItem("currentScene");
    if (savedScene) {
        makeChoice(savedScene);
    }
};
