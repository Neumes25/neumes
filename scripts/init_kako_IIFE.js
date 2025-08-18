const init = (function (){

    return function (){

    paperContent.innerHTML=""
    countTextNote = 0;
    document.getElementById('textInputArea').value=""
    document.getElementById('neumesInportArea').value=""
    document.getElementById('titleText').value=""
    document.getElementById('startMartiria').value=""
    document.getElementById('startTempo').value=""
    document.getElementById('titleTextInput').value=""
    document.getElementById('pageNumberInput').value="1"
    document.getElementById('Upload').value=''
    countTextNote = 0;

    paperContent = document.getElementById('paperContent');

    activeteNoteButtons(' ');
    }()
})()