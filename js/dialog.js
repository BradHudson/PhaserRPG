var conversationJSON = loadJSONConversations();
var dialogArray;
var indexOfDialog = 0;
var inConversation = false;
var textOnScreen;
var whoWeTalkingTo = '';
var stageOfNPCConversation = 0;
var stageOfTreeConversation = 0;
var speechBubble;
var spriteSpeaking;
var displayAsBottomText;

function startConversation(dialogArray, sprite, bottomText = false) {
        inConversation = true;
        indexOfDialog = 0;
        displayAsBottomText = bottomText;
        spriteSpeaking = sprite;
        displayNextDialog(indexOfDialog, sprite);
        indexOfDialog = indexOfDialog + 1;
}

function blankDialog() {
    textOnScreen.text = "";
}

function displayNextDialog(index,sprite){
    if(speechBubble != undefined){ speechBubble.destroy(); }
    if(displayAsBottomText === true) {
        textOnScreen.text = dialogArray[indexOfDialog];
    }else{
        speechBubble = new SpeechText(game, sprite.position.x, sprite.position.y, 50, -40, dialogArray[index], 5000, sprite, function(){}, this);
    }
}

document.body.onkeyup = function(e){
    if(e.keyCode == 32 && inConversation){
        if(indexOfDialog === dialogArray.length){
            speechBubble.destroy();
            textOnScreen.text = "";
            inConversation = false;
            indexOfDialog = 0;
            updateStageOfConversation(whoWeTalkingTo);
            whoWeTalkingTo = "";
        }else{
        displayNextDialog(indexOfDialog, spriteSpeaking);
        indexOfDialog = indexOfDialog + 1;
        }
    }
}

 function loadJSONConversations(){
   var request = new XMLHttpRequest();
   request.open("GET", "gameData/conversations.json", false);
   request.send(null);
   return JSON.parse(request.responseText);
 } 

 function addTextOnScreen(){
    textOnScreen = game.add.text(200, 500, "", { font: "24px Arial", fill: "#ffffff", align: "center" });
    textOnScreen.fixedToCamera = true;
    textOnScreen.cameraOffset.setTo(200, 500);
 }

 function updateStageOfConversation(whoWeTalkingTo){
     switch(whoWeTalkingTo){
         case "AdamNPC":
            stageOfNPCConversation = stageOfNPCConversation + 1;
            break;
         case "BigTree":
            stageOfTreeConversation = stageOfTreeConversation + 1;
            break;
     }
 }
 