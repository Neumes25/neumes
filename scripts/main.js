function init(){
    paperContent.innerHTML=""
    countTextNote = 0;
    document.getElementById('textInputArea').value=""
    document.getElementById('neumesInportArea').value=""
    document.getElementById('startNote').value=""
    document.getElementById('startTempo').value=""
    document.getElementById('pageNumberInput').value="1"
    document.getElementById('Upload').value=''
    document.getElementById('startNote').innerHTML=''
    document.getElementById('startTempo').innerHTML=''
    document.getElementById('newLineFontSize').value = '16'

    countTextNote = 0;

    paperContent = document.getElementById('paperContent');

    activeteNoteButtons(' ');
}

function addNoteWithText(note, font){

    newText = document.createElement('div')
    newText.classList.add("text")
    newText.innerText=''
    newText.setAttribute("id", countTextNote)
    newText.setAttribute("onclick", "event.stopPropagation(); choose(this)")

    newNote = document.createElement('div')
    newNote.setAttribute("onclick", "choose(this)")
    newNote.innerHTML=note
    newNote.classList.add(font)
    newNote.classList.add('note')
    newNote.classList.add('withText')

    newNote.appendChild(newText)
    paperContent.appendChild(newNote)   

    countTextNote = countTextNote+1;
}


function addNoteNoText(note, font){

    newNote = document.createElement('div')
    newNote.innerHTML=note
    newNote.classList.add(font)
    newNote.classList.add('note')
    newNote.setAttribute("onclick", "choose(this)")
    paperContent.appendChild(newNote)   

}


function addIson(note){
    
    newNote = document.createElement('div')
    newNote.innerHTML=note
    newNote.classList.add('special2')
    newNote.classList.add('note')
    newNote.classList.add('red')
    newNote.classList.add('ison')
      
    paperContent.appendChild(newNote)   
}


function addMartiria(note, font){
    
    newMartiria = document.createElement('div')
    newMartiria.innerHTML=note
    newMartiria.classList.add(font)
    newMartiria.classList.add('red')
    newMartiria.classList.add('note')
    newNote.setAttribute("onclick", "choose(this)")
       
    paperContent.appendChild(newMartiria)     
}


function addTemporalNote(note, font){

    var parentNote = paperContent.lastChild;
    
    newNote = document.createElement('span')
    newNote.innerHTML=note
    newNote.classList.add(font)
    newNote.classList.add('note')
    
    parentNote.insertBefore(newNote, parentNote.lastElementChild)
}


function addFtora(note, font='ftora'){

        var parentNote = paperContent.lastChild;
        
        newNote = document.createElement('span')
        newNote.innerHTML=note
        newNote.classList.add(font)
                
        parentNote.insertBefore(newNote, parentNote.lastChild)       
}

function addText(){

    textString = document.getElementById('textInputArea').value.replaceAll('\n', " ")
    textArray = textString.split(" ")
    textArray = textArray.filter(value => value !=" " && value!="");
    

    for (i=0; i<Math.min(countTextNote, textArray.length); i++){
        
        noteText = document.getElementById(i.toString());
        noteText.innerText = textArray[i]
    }
}


function getTextFromNeumes(){

    textString2 = ''
    for(i=0; i<countTextNote; i++){
    
        textString2 = textString2 + document.getElementById(i.toString()).innerText;
        textString2 = textString2 + ' ';
    }

    document.getElementById('textInputArea').value = textString2;

    console.log(textString2)

}


function deleteNote(){
    if(paperContent.lastElementChild.classList.contains('withText')){
        countTextNote=countTextNote-1;
    }
    paperContent.lastElementChild.remove()
}


function newSpace(){
    
    whiteSpace=document.createElement('div')
    whiteSpace.classList.add('white');
    whiteSpace.setAttribute('contenteditable', 'true');
    paperContent.appendChild(whiteSpace)
}

function newLine(){
    
    newLineFont = document.getElementById('newLineFont').value
    newLineFontSize = document.getElementById('newLineFontSize').value

    line=document.createElement('div')
    line.classList.add('newline');
    line.setAttribute('contenteditable', 'true');
    line.setAttribute('onclick', "event.stopPropagation(); this.focus(); ")

    if (newLineFont=="MKD"){
        line.style.fontFamily = 'Calibri';
    }      
    else if (newLineFont=="CSL"){
        line.style.fontFamily = 'Irmologion';
    }    
    
    line.style.fontSize = newLineFontSize + 'pt' 

    if (document.getElementById('newLineRed').checked){
        line.style.color='#ed0000'
    }

    paperContent.appendChild(line)
}

function newLineAtStart(){
    line=document.createElement('div')
    line.classList.add('newline');
    line.setAttribute('contenteditable', 'true');
    line.setAttribute('onclick', "event.stopPropagation(); this.focus(); ")
    paperContent.insertBefore(line, paperContent.firstChild)
}

function exportNotes(){

    activeteNoteButtons('importNeumes');
    exportText = paperContent.innerHTML;
    document.getElementById('neumesInportArea').value = exportText;
}

function savePDF(){

    divContents = document.getElementById('print')
    printWindow = window.open('', '', 'height=1200, width=800');
    printWindow.document.write('<html><head><title>Neumes</title>');
    printWindow.document.write('<link rel="stylesheet" href="styles.css">')
    printWindow.document.write('</head><body >');
    printWindow.document.write(divContents.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();

    printWindow.print();   
}

function ImportNeumes(){ 
    neumes = document.getElementById('neumesInportArea').value
    paperContent.innerHTML = ''
    paperContent.innerHTML = neumes

    countTextNote = document.getElementsByClassName('withText').length;

}


function activeteNoteButtons(button){
    elements = document.getElementsByClassName('Button-menu');

    for (let i=0; i<elements.length; i++){

        elements[i].classList.contains(button) ? elements[i].style.display = 'block' : elements[i].style.display = 'none'       
    }
}


function addTitleMartira(startingMartiria, position){

    possition = document.getElementById(position)
    possition.innerHTML = startingMartiria;
}


function activetePageNumbers(){
    numberInput = document.getElementById('pageNumberInput')
    
    window.getComputedStyle(numberInput).getPropertyValue('visibility') == 'hidden' ? numberInput.style.setProperty('visibility', 'visible') :  numberInput.style.setProperty('visibility', 'hidden')
    
}

function updatePageNumber(value){
        document.getElementById('pageNumber').innerText = value;
}


function removeAccents(){

    withAccents = document.getElementById('textInputArea').value;
    removedAccents = withAccents.split('').filter(char => !/['12@~]/.test(char)).join('');

    characterToReplace      = ['$', '%', '0', '4', '5', 'E', 'H', 'h', 'S', 's',  'Y', 'y', 'A', 'a', 'e', '|', 'ѓ', 'ќ', 'Ќ', 'ћ', 'Ћ', 'ё', '±', 'Ё', 'џ',  'Ј', 'ј', 'j', 'J']
    characterToReplaceWith  = ['#', '#', 'о', '3', '3', 'е', 'њ', 'ы', 'z', 'z', 'у', 'у', 'а', 'а', 'е', 'z3', 'а3', 'ў', 'Ў', 'я', 'Я', 'э', 'я', 'э', 'o', 'І', 'i3', 'і', 'ї']

    
    for(let i=0; i<characterToReplace.length; i++){

        removedAccents = removedAccents.replaceAll( characterToReplace[i], characterToReplaceWith[i]  );
    }
    

    document.getElementById('textInputArea').value=removedAccents;    
}


function addAccentsBack(){

    document.getElementById('textInputArea').value = '';
    document.getElementById('textInputArea').value = withAccents;
}

function justify(){
    
    paperContent.style.justifyContent == 'flex-start' ? paperContent.style.justifyContent = 'space-between' : paperContent.style.justifyContent = 'flex-start';
    
}

function DownloadNeumes(){
    fileContent =document.getElementById('neumesInportArea').value;
    const blob =new Blob([fileContent], {type: "text/plain"})
    const url = URL.createObjectURL(blob)
    const downloadLink = document.createElement('a')
    downloadLink.href = url
    downloadLink.download = "Downaloded Neumes.html"
    downloadLink.click()
    document.body.removeChild(downloadLink)
    URL.revokeObjectURL(url)

}

   
function readUpload(){

    input = document.getElementById('Upload')

    const file = input.files[0]
    const reader = new FileReader()

    reader.onload = (e) => {
        uploadContent = e.target.result
        document.getElementById('neumesInportArea').value=uploadContent;
        
    }

    reader.readAsText(file)

    

}

function removePunctuation(){
    withPunctuation = document.getElementById('textInputArea').value;
    removedPunctuation = withPunctuation.split('').filter(char => !/[,.:;!?*()/]/.test(char)).join('');
  

    document.getElementById('textInputArea').value=removedPunctuation;  
}

function copyToClipboard(value){
    navigator.clipboard.writeText(value)
}

function choose(elements){
    selectedNotes=document.getElementsByClassName("selected");
    Array.from(selectedNotes).forEach(selectedNote => {
        
        selectedNote.classList.remove("selected")
    });
    elements.classList.add("selected")
}

function moveRight(){

    selectedElement = document.getElementsByClassName("selected")

    if (selectedElement.length == 0) return;
        selectedElement[0].style.left = parseInt(window.getComputedStyle(selectedElement[0]).left) + 3 + 'px';

}


function moveLeft(){

    selectedElement = document.getElementsByClassName("selected")

    if (selectedElement.length == 0) return;
        selectedElement[0].style.left = parseInt(window.getComputedStyle(selectedElement[0]).left) - 3 + 'px';

}


function moveDown(){

    selectedElement = document.getElementsByClassName("selected")

    if (selectedElement.length == 0) return;
        selectedElement[0].style.top = parseInt(window.getComputedStyle(selectedElement[0]).top) + 3 + 'px';

}

function moveUp(){

    selectedElement = document.getElementsByClassName("selected")

    if (selectedElement.length == 0) return;
        selectedElement[0].style.top = parseInt(window.getComputedStyle(selectedElement[0]).top) - 3 + 'px';

}



init();




document.getElementById('print').addEventListener('click', ()=> {document.getElementById('print').focus()})

document.addEventListener('keydown', (event)=>{

    console.log(event.key.toString())
    
   if((event.keyCode === 32 || event.keyCode===39) &&  document.activeElement == document.getElementById('print')) event.preventDefault()

   if (document.activeElement !== document.getElementById('print')) return
    
   
    document.getElementsByName(event.key.toString())[0]?.click()



    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) event.preventDefault()
    if (event.key == 'ArrowUp' && document.getElementsByClassName("selected") !=0)  moveUp()

    if (event.key == 'ArrowDown' && document.getElementsByClassName("selected") !=0) moveDown()
    
    if (event.key == 'ArrowLeft' && document.getElementsByClassName("selected") !=0) moveLeft()

    if (event.key == 'ArrowRight' && document.getElementsByClassName("selected") !=0) moveRight()
    
    if (event.key == "Escape") {
        document.getElementsByClassName("selected")[0].classList.remove("selected")
    }
})
