function startConversation(dialogArray) {
        inConversation = true;
        indexOfDialog = 0;
        displayNextDialog(indexOfDialog);
        indexOfDialog = indexOfDialog + 1;
    }

function blankDialog() {
    textOnScreen.text = "";
}

function displayNextDialog(){
    textOnScreen.text = dialogArray[indexOfDialog];
}

document.body.onkeyup = function(e){
    if(e.keyCode == 32 && inConversation){
        if(indexOfDialog === dialogArray.length){
            textOnScreen.text = "";
            inConversation = false;
            indexOfDialog = 0;
        }else{
        displayNextDialog();
        indexOfDialog = indexOfDialog + 1;
        }
    }
}

 function loadJSONConversations(){
   var request = new XMLHttpRequest();
   request.open("GET", "conversations.json", false);
   request.send(null);
   return JSON.parse(request.responseText);
 } 

 function addTextOnScreen(){
    textOnScreen = game.add.text(200, 500, "", { font: "24px Arial", fill: "#ffffff", align: "center" });
    textOnScreen.fixedToCamera = true;
    textOnScreen.cameraOffset.setTo(200, 500);
 }