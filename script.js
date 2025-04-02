const scenes = {
    "start": {
        text: "Welcome to the adventure! Where do you want to go?",
        ascii: `
    >===>     >=>     >=> >=======>   >=>>=>   >===>>=====> >=>
  >=>    >=>  >=>     >=> >=>       >=>    >=>      >=>     >=>
>=>       >=> >=>     >=> >=>        >=>            >=>     >=>
>=>       >=> >=>     >=> >=====>      >=>          >=>     >> 
>=>       >=> >=>     >=> >=>             >=>       >=>     >> 
  >=> >> >=>  >=>     >=> >=>       >=>    >=>      >=>        
    >= >>=>     >====>    >=======>   >=>>=>        >=>     >=>
         >>                                                    
`,
        choices: {
            1: "Enter the forest ",
            2: "Go to the tower"
        },
        next: {
            1: "1",
            2: "2"
        }
    },
    "1": {
        text: "You entered a dark forest. There's a path ahead and an old bridge. Where do you go?",
        ascii: `Dark forest ASCII`,
        choices: { 1: "Follow the path that goes deeper into the woods", 2: "Cross the old bridge" },
        next: { 1: "3", 2: "4" }
    },
    "2": {
        text: "You see a giant tower. Two ways: climb into a window or go around.",
        ascii: `Tower ASCII`,
        choices: { 1: "Go around the tower", 2: "Climb into the window" },
        next: { 1: "5", 2: "6" }
    },
    "3": { text: "You found a chest full of gold!", ascii: `GOLD ASCII`, choices: {}, next: {} },
    "4": { text: "The bridge collapsed, and you fell into the river... ", ascii: `RIVER ASCII`, choices: {}, next: {} },
    "5": { text: "You found a powerful sword! ⚔", ascii: `SWORD ASCII`, choices: {}, next: {} },
    "6": { text: "A monster was waiting for you... ", ascii: `MONSTER ASCII`, choices: {}, next: {} }
};

function makeChoice(choice) {
    const scene = scenes[choice];

    document.getElementById("text").innerText = scene.text;
    document.getElementById("ascii-art").innerText = scene.ascii || "";

    localStorage.setItem("currentScene", choice);

    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = "";

    if (Object.keys(scene.choices).length > 0) {
        for (const key in scene.choices) {
            const btn = document.createElement("button");
            btn.innerText = scene.choices[key];
            btn.onclick = function () {
                makeChoice(scene.next[key]);
            };
            choicesDiv.appendChild(btn);
        }
    } else {
        const restartBtn = document.createElement("button");
        restartBtn.innerText = "Restart?";
        restartBtn.onclick = () => restartGame();
        choicesDiv.appendChild(restartBtn);
    }
}

function restartGame() {
    localStorage.removeItem("currentScene");
    loadGame();
}

function loadGame() {
    const savedScene = localStorage.getItem("currentScene");
    if (savedScene && scenes[savedScene]) {
        makeChoice(savedScene);
    } else {
        makeChoice("start");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadGame();

    const container = document.body; 
    const themeBtn = document.getElementById("theme-toggle");

    const themes = ["theme-green", "theme-orange", "theme-blue"];
    let currentThemeIndex = 0;

    themeBtn.addEventListener("click", () => {
        themes.forEach(t => container.classList.remove(t));
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        container.classList.add(themes[currentThemeIndex]);
    });
});
