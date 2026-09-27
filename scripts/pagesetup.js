export function addTextBox(){

    const textBoxFont = document.getElementById('textBoxFont').value
    const textBoxFontSize = document.getElementById('textBoxFontSize').value

    const textBox=document.createElement('div')
    textBox.classList.add('textBox', 'textBox-selected');

    textBox.setAttribute('contenteditable', 'true');
    textBox.setAttribute('onclick', "event.stopPropagation(); this.focus(); ")
    textBox.addEventListener('mousedown', function (event) {

    if (event.button === 1 || event.button === 2) {
        event.preventDefault();
    }
});

    textBox.addEventListener('auxclick', function (event) {
        event.preventDefault();
        this.classList.add('textBox-selected');
});

    textBox.addEventListener('contextmenu', function (event) {
        event.preventDefault();
});

    if (textBoxFont=="MKD"){
        textBox.style.fontFamily = 'Calibri';
    }      
    else if (textBoxFont=="CSL"){
        textBox.style.fontFamily = 'Irmologion';
    }    
    
    textBox.style.fontSize = textBoxFontSize + 'pt' 

    if (document.getElementById('textBoxRed').checked){
        textBox.style.color='#ed0000'
    }

    const textBoxPosition = document.getElementById('textBoxPosition').value

    if(textBoxPosition == 'top'){
        textBox.style.setProperty('top', '0')

    }
    else if(textBoxPosition == 'mid'){
        textBox.style.setProperty('top', '350px')
    }
    else if(textBoxPosition == 'bottom'){
        textBox.style.setProperty('top', '850px')
    }

    if (document.getElementById('twoColumns').checked){
        textBox.style.setProperty('column-count', '2')
    }


    paperContent.appendChild(textBox)
}

export function newLineAtStart(){

    const line=document.createElement('div')
    line.classList.add('newlineAtStart');
   
    paperContent.insertBefore(line, paperContent.firstChild)
}

export function deleteNewLineAtStart(){
    const linesOnTop = document.getElementsByClassName('newLineAtStart');
    if (linesOnTop.length!=0){
        linesOnTop[linesOnTop.length-1].remove()
    }
}

export function addTitleMartira(startingMartiria, position){

    if (document.getElementById("startMartiria") == null ){
        const titleMartiriaPlaceholder = document.createElement('div')
        titleMartiriaPlaceholder.setAttribute("id", "startMartiria")
        titleMartiriaPlaceholder.innerHTML=`<div id="startNote"></div><div id="startTempo"></div>`;
    paperContent.insertBefore(titleMartiriaPlaceholder, paperContent.firstChild)
    }
      
    const possition = document.getElementById(position)
    possition.innerHTML = startingMartiria;
}


export function activetePageNumbers(){
    const numberInput = document.getElementById('pageNumberInput')
    
    window.getComputedStyle(numberInput).getPropertyValue('visibility') == 'hidden' ? numberInput.style.setProperty('visibility', 'visible') :  numberInput.style.setProperty('visibility', 'hidden')
    
}

export function updatePageNumber(value){
        document.getElementById('pageNumber').innerText = value;
}



export function justify(){
    
    window.getComputedStyle(paperContent).justifyContent == 'flex-start' ? paperContent.style.justifyContent = 'space-between' : paperContent.style.justifyContent = 'flex-start';   
}

export function turnOffFooter(){
    state.footerOn = false;
}