const scenes = {
    0: {
        text: "Welcome to the adventure! Where do you want to go?",
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
            1: "Enter the forest 🌲",
            2: "Descend into the dungeon 🏰"
        },
        next: {
            1: 1,
            2: 2
        }
    },
    1: {
        text: "You entered a dark forest. There's a path ahead and an old bridge. Where do you go?",
        ascii: `
                           
                           
                           
                           
           /\             
           /\             
          //              
         ///\             
          //\\            
          ///\\\          
        ////\\          
         ////\\         
         ///\\\\\       
       //////│\\        
      /////││T\\\\      
       /////│││\\        
     /////T│││\\\\\     
    //////│││T│\\\      
     //   T││││  \\       
          ││││T           
          │T│││TT         
        TTT  TT TTT       
       TT   TT            
             T T          
                           
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
    3: { text: "You found a chest full of gold! 🏆", ascii: "\n          $$$$$$$       \n       $$$$              \n      $$                \n      $                  \n     $$                  \n  $$$$$$$$$$$$$$$$      \n     $                   \n  $$$$$$$$$$$$$$$$      \n     $$                  \n      $                  \n      $$                \n       $$$$              \n          $$$$$$$       \n                         ", choices: {}, next: {} },
    4: { text: "The bridge collapsed, and you fell into the river... 🌊", ascii: "~~~~ 🌊🌊🌊 ~~~~", choices: {}, next: {} },
    5: { text: "You found a powerful sword! ⚔", ascii: "  /\   ⚔   /\  ", choices: {}, next: {} },
    6: { text: "A monster was waiting for you... 🐉", ascii: "                                 \n                                 \n                                 \n            ┌┐   ┌┐              \n       ▲    ││   ││     ▲       \n       │    /\\───/\\     │       \n       │   (=======)    │       \n       │  ( 0 * * 0 )   │       \n       │   ( ▼▲▼▲▼ )    │       \n       @──┌┬───────┬┐───@       \n       └───(       )────┘       \n       │   (==[=]==)    │       \n       │   (       )    │       \n       │    ───────     │       \n            ││   ││              \n            ││   ││              \n            ││   ││              \n           ┌──┐ ┌──┐            \n           └──┘ └──┘            \n                                ", choices: {}, next: {} }
};
