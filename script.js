const scenes = {
    "start": {
        text: "Welcome to the adventure! Where do you want to go?",
        ascii: `      
                  | Start |      
                  [ 1  2  ]      

        `,
        choices: {
            1: "Enter the forest ",
            2: "Descend into the dungeon "
        },
        next: {
            1: "1", // Start forest scene
            2: "2"  // Start dungeon scene
        }
    },
    "1": {
        text: "You entered a dark forest. There's a path ahead and an old bridge. Where do you go?",
        ascii: `
         L L               
       LLLLLLL  L LL       
         LLALL LLLLALL     
     LLLL LLL LLLL LL      
    LLALLL LLLLLL          
     L LLLLLLLLL           
          LLALLL LL    L   
    L LL LLLLLLLLLLLLLLLL  
    LLALLLLLLLLALLLLLALL   
   LLLLL   LLLLLLL  LLL    
          LLLLLLLLL        
   LL LL LLLLL│LLL  LLL    
  LLLLLLLLLL││TLLLLLLLLLL  
   L LALLLLLL│││LLLLALLLL  
      LL LLT│││LLL LL L    
         LL│││T│LL         
           T││││           
           ││││T           
           │T│││TT         
         TTT  TT TTT       
        TT   TT            
              T T          
                           
        `,
        choices: { 1: "Follow the path ", 2: "Cross the bridge " },
        next: { 1: "3", 2: "4" }
    },
    "2": {
        text: "You see a giant tower. There are two ways continue your path: cliumb inside a window via vine or go around the tower. Which one do you choose?",
        ascii: `            
                 rRr                
                RrRRR               
                RRRrr               
               RRRRRrR              
              RrRRRRRRR             
             RRrRrRRrRRR            
            RrrRRRRrrRrRR           
           RRRrRRRRRRrRRrR          
          RRrRRRrRRRRRRRRRR         
         RRrRRRRrrRRRRRRrRRR        
        RRrRrRRRRrRRRRRrrRrRR       
        ┌─────────┬─────────┐       
        │    VVVVVV  VV     │       
        │ ┼─ VVV  VVVV  ─┴  │       
        │ ├    V    VVVV    │       
        └┐            VVV   │       
         │     WWWWWWW  VV │        
         │    WW  @  WW  V │        
         │     [ -▼- ]   V │        
         │  V  [  ▲  ]  VV │        
        ┌┘ VV  wwwwwww  V  │        
        │ VV            V  │        
        │ VVVVV      VVVV  │        
        │    VVVV    VVV   └┐       
        └┐      VVVVVV      │       
         │   V   VV         │       
         │ VVV    VVV V   ┤ │       
         │VVV      VVVV  ─┤ │       
         │VVVVVVV  VV   VV  │       
         │    VVV VV     V ┌┘       
        ┌┘     VVVVVV VVVV │        
        │ ┬┴─       VVV    │        
        │        VVVV VV   │        
        └──────────────────┘        
        `,
        choices: { 1: "Go around the tower", 2: "Climb into the window" },
        next: { 1: "5", 2: "6" }
    },
    "3": { text: "You found a chest full of gold!", ascii: `                     
          $$$$$$$    
       $$$$          
      $$             
      $              
     $$              
  $$$$$$$$$$$$$$$$   
     $               
  $$$$$$$$$$$$$$$$   
     $$              
      $              
      $$             
       $$$$          
          $$$$$$$    
                     `, choices: {}, next: {} },
    "4": { text: "The bridge collapsed, and you fell into the river... ", ascii: "~W~W~W~W~", choices: {}, next: {} },
    "5": { text: "You found a powerful sword! ⚔", ascii: `              
      B       
      BB      
      BB      
      BB      
      BB      
      BB      
      BB      
      BB      
      BB      
      BB      
      BB      
      BB      
  CGCGCGCGCG  
      HH      
      HH      
      HH      
      HH      
     PPPP     
     PPPP     
      PP      
              `, choices: {}, next: {} },
    "6": { text: "A monster was waiting for you... ", ascii: " OM NOM NOM NOM NOM!", choices: {}, next: {} }
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

// Restart function
function restartGame() {
    localStorage.removeItem("currentScene");
    loadGame();
}

// Load saved state or start with the initial scene
function loadGame() {
    const savedScene = localStorage.getItem("currentScene");
    if (savedScene && scenes[savedScene]) {
        makeChoice(savedScene);
    } else {
        makeChoice("start"); // Show starting scene (forest or dungeon choice)
    }
}

// Ensure game starts only after page is fully loaded
document.addEventListener("DOMContentLoaded", loadGame);
