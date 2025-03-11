const scenes = {
    1: {
        text: "You entered a dark forest. There's a path ahead and an old bridge. Where do you go?",
        ascii: `
                             
         /\         
         /\         
        //          
       ///\         
        //\\        
        ///\\\      
      ////\\\\      
       ////\\\\     
       ///\\\\\\\   
     //////│\\\\    
    /////││T\\\\\\  
     /////│││\\\    
   /////T│││\\\\\\\ 
  //////│││T│\\\\\  
   //   T││││  \\   
        ││││T       
        │T│││TT     
      TTT  TT TTT   
     TT   TT        
           T T      
                    
        `,
        choices: {
            1: "Follow the path ",
            2: "Cross the bridge "
        },
        next: {
            1: 3,
            2: 4
        }
    },
    2: {
        text: "You descended into a dungeon. There are two doors. Which one do you choose?",
        ascii: `
                                             
                                     
                ─┼─                  
                 │                   
              ───┼───                
                 ┼                   
                ┌┼┐                  
               ┌<│┐┐                 
               ┌┌│┐┐                 
              ┌┌┌│┐┐┐                
             ┌┌┌┌│┐┐<┐               
            ┌┌>┌┌│┐┐┐┐┐              
           ┌┌┌┌┌┌│┐┐┐┐┐┐             
          ┌┌┌<┌┌┌│┐┐┐>┐┐┐            
         ┌┌┌┌┌┌┌┌│┐┐┐┐┐┐┐┐           
        ┌┌┌┌>┌┌┌┌│┐┐<┐┐┐┐┐┐          
       ┌┌┌┌┌┌┌┌┌┌│┐┐┐┐┐┐┐┐┐┐         
       ┌─────────┴─────────┐         
       │     CCCCC  CC     │         
       │ ┼─  CC  CCCC  ─┴  │         
       │ ├    C    CCCC    │         
       └┐            ~CC   │         
        │     ◄=====►  CC │          
        │     {  @  }   C │          
        │     | /▼\ |   C │          
        │  C  {  ▲  }  CC │          
       ┌┘ CC  ◄=====►  C  │          
       │ CC            C  │          
       │ CCCCC       CCC  │          
       │    CCCC    CC    └┐         
       └┐      CCCCCC      │         
        │       CC         │         
        │   C    CC  C   ┤ │         
        │ CC      CCCC  ─┤ │         
        │ CCCCC   CC   C   │         
        │    CCC CC     C ┌┘         
       ┌┘      CCCCC CCCC │          
       │ ┬┴─       CCC    │          
       │        CCCC CC   │          
       └──────────────────┘          
                                     
        `,
        choices: {
            1: "Left door ",
            2: "Right door "
        },
        next: {
            1: 5,
            2: 6
        }
    },
    3: { text: "You found a chest full of gold! $$$", ascii: "", choices: {}, next: {} },
    4: { text: "The bridge collapsed, and you fell into the river... ", ascii: "~~~~0~~ 0~~~~", choices: {}, next: {} },
    5: { text: "You found a powerful sword! ", ascii: "  /\  /\  /\  ", choices: {}, next: {} },
    6: { text: "A monster was waiting for you... ", ascii: "           OM NOM NOM               ", choices: {}, next: {} }
};

function playSound() {
    let sound = document.getElementById("sound");
    if (sound) {
        sound.play();
    }
}

function makeChoice(choice) {
    const scene = scenes[choice];
    
    // Update text and ASCII art
    document.getElementById("text").innerText = scene.text;
    document.getElementById("ascii-art").innerText = scene.ascii || "";

    // Save current game state
    localStorage.setItem("currentScene", choice);

    // Clear previous choices
    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = "";

    // Generate new choice buttons
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
        // If no choices available, show Restart button
        const restartBtn = document.createElement("button");
        restartBtn.innerText = "Restart 🔄";
        restartBtn.onclick = () => restartGame();
        choicesDiv.appendChild(restartBtn);
    }
}

// Restart function to reset the game
function restartGame() {
    localStorage.removeItem("currentScene");
    makeChoice(1);
}

// Ensure the game starts from the saved state or scene 1
document.addEventListener("DOMContentLoaded", () => {
    const savedScene = localStorage.getItem("currentScene");
    if (savedScene) {
        makeChoice(savedScene);
    } else {
        makeChoice(1);
    }
});



function restartGame() {
    localStorage.removeItem("currentScene"); // Clear saved progress
    makeChoice(1); // Restart from the first scene
}

// Load saved state when page loads
document.addEventListener("DOMContentLoaded", () => {
    const savedScene = localStorage.getItem("currentScene");
    if (savedScene) {
        makeChoice(savedScene);
    } else {
        makeChoice(1);
    }
});


