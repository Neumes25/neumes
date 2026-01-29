function init(){
    version = 1.0
    document.getElementById('textInputArea').value=""
    document.getElementById('neumesInportArea').value=""
    document.getElementById('pageNumberInput').value="1"
    document.getElementById('Upload').value=''
    document.getElementById('newLineFontSize').value = '16'

    countTextNote = 0;

    paperContent = document.getElementById('paperContent');
    paper = document.getElementById('paper');
    paperPrint = document.getElementById('print');
    
    activeteNoteButtons(' ');

    paperContent.innerHTML=""
    countTextNote = 0;
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

    newLineFont = document.getElementById('newLineFont').value
    newLineFontSize = document.getElementById('newLineFontSize').value

    line=document.createElement('div')
    line.classList.add('newline', 'newLineAtStart');
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
    
    paperContent.insertBefore(line, paperContent.firstChild)
}

function deleteNewLineAtStart(){
    linesOnTop = document.getElementsByClassName('newLineAtStart');
    if (linesOnTop.length!=0){
        linesOnTop[linesOnTop.length-1].remove()
    }
}

function exportNotes(){

    activeteNoteButtons('importNeumes');
    document.getElementById('neumesInportArea').value = paperContent.innerHTML;
}

function savePDF(){

    isJustified = window.getComputedStyle(paperContent).justifyContent == 'space-between';

    const options = {
        margin:       0,
        filename:     'content.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 4 },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };


    html2pdf().from(paperPrint.innerHTML).set(options).toPdf().get('pdf').then(function(pdf) {

    date_now = new Date().toString().slice(0, -42)
        const metadata = {
            title: 'Neumes '+date_now,
            subject: 'Neumes '+date_now,
            author: 'NeumesApp Version=' +version + " j=" + isJustified,
            keywords: paperContent.innerHTML
        };

        pdf.setProperties(metadata);

        pdf.save();
    });

}

function ImportNeumes(){ 
    neumes = document.getElementById('neumesInportArea').value
    paperContent.innerHTML = ''
    paperContent.innerHTML = neumes

    countTextNote = document.getElementsByClassName('withText').length;
    console.log(length)
}


function activeteNoteButtons(button){
    elements = document.getElementsByClassName('Button-menu');

    for (let i=0; i<elements.length; i++){

        elements[i].classList.contains(button) ? elements[i].style.display = 'block' : elements[i].style.display = 'none'       
    }
}


function addTitleMartira(startingMartiria, position){

    if (document.getElementById("startMartiria") == null ){
    titleMartiriaPlaceholder = document.createElement('div')
    titleMartiriaPlaceholder.setAttribute("id", "startMartiria")
    titleMartiriaPlaceholder.setAttribute("onclick", "choose(this)")
    titleMartiriaPlaceholder.innerHTML=`<div id="startNote"></div><div id="startTempo"></div>`;
    paperContent.insertBefore(titleMartiriaPlaceholder, paperContent.firstChild)
    }
      
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
    
    window.getComputedStyle(paperContent).justifyContent == 'flex-start' ? paperContent.style.justifyContent = 'space-between' : paperContent.style.justifyContent = 'flex-start';   
}
  
async function readUpload(){

    upload = document.getElementById('Upload')
    const file = upload.files[0]

    const arrayBuffer = await file.arrayBuffer();

    pdf = await pdfjsLib.getDocument({data: arrayBuffer}).promise;

    const {info, metadata} = await pdf.getMetadata();
    
    document.getElementById('neumesInportArea').value=info.Keywords

    ImportNeumes()

    console.log(info.Author)
    
    if(info.Author.toString().includes('true')){
        paperContent.style.justifyContent = 'space-between'
    }
    else{
        paperContent.style.justifyContent = 'flex-start'
    }
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
        selectedElement[0].style.left = parseInt(window.getComputedStyle(selectedElement[0]).left) + 1 + 'px';
}

function moveLeft(){

    selectedElement = document.getElementsByClassName("selected")

    if (selectedElement.length == 0) return;
        selectedElement[0].style.left = parseInt(window.getComputedStyle(selectedElement[0]).left) - 1 + 'px';
}

function moveDown(){

    selectedElement = document.getElementsByClassName("selected")

    if (selectedElement.length == 0) return;
        selectedElement[0].style.top = parseInt(window.getComputedStyle(selectedElement[0]).top) + 1 + 'px';

}

function moveUp(){

    selectedElement = document.getElementsByClassName("selected")

    if (selectedElement.length == 0) return;
        selectedElement[0].style.top = parseInt(window.getComputedStyle(selectedElement[0]).top) - 1 + 'px';

}



init();

fontSizeDisplay = document.getElementById('fontSizeValue');
document.getElementById('newLineFontSize').addEventListener('input', ()=>{fontSizeDisplay.textContent = document.getElementById('newLineFontSize').value})


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



// For Tutorial videos

// const buttons = document.querySelectorAll("button");

// buttons.forEach(button => {
//     button.addEventListener("click", () => {
//             button.classList.remove('flash')
//             void button.offsetWidth;
//             button.classList.add('flash')
//     })

// })