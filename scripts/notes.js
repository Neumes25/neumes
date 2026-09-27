import {state} from './state.js'

export function addTextboxIDs(){
    const textboxes=document.querySelectorAll('.text')
    textboxes.forEach((textbox, index) => {
        textbox.id=index
    })
    state.countTextNote = textboxes.length
}

export function addNoteWithText(note, font){

    const newText = document.createElement('div')
    newText.classList.add("text")
    newText.innerText=''
    
    const newNote = document.createElement('div')
    newNote.innerHTML=note
    newNote.classList.add(font, 'note', 'withText')
    

    newNote.appendChild(newText)

    const selected = document.querySelector('.note.selected')
        if (selected){
            selected.after(newNote)
        }
        else {
            paperContent.appendChild(newNote)   
        }
    addTextboxIDs()
}

export function addNoteNoText(note, font){

    const newNote = document.createElement('div')
    newNote.innerHTML=note
    newNote.classList.add(font)
    newNote.classList.add('note')
    
    
    const selected = document.querySelector('.note.selected')
        if (selected){
            selected.after(newNote)
        }
        else {
           paperContent.appendChild(newNote)   
        }  
    addTextboxIDs()    
}


export function addIson(note){
    
    const newNote = document.createElement('div')
    newNote.innerHTML=note
    newNote.classList.add('special2', 'note', 'red', 'ison')

      
    const selected = document.querySelector('.note.selected')
        if (selected){
            selected.after(newNote)
        }
        else {
           paperContent.appendChild(newNote)   
        }  
    addTextboxIDs()    
}


export function addMartiria(note, font){
    
    const newMartiria = document.createElement('div')
    newMartiria.innerHTML=note
    newMartiria.classList.add(font, 'red', 'note')
       
    const selected = document.querySelector('.note.selected')
        if (selected){
            selected.after(newMartiria)
        }
        else {
           paperContent.appendChild(newMartiria)   
        }  
    addTextboxIDs()       
}


export function addTemporalNote(note, font){

    const selected = document.querySelector('.note.selected')
    let parentNote
        if (selected){
            parentNote = selected;
        }
        else {
           parentNote = paperContent.lastChild;   
        }  
   
    const newNote = document.createElement('span')
    newNote.innerHTML=note
    newNote.classList.add(font)
    newNote.classList.add('note')
    
    parentNote.insertBefore(newNote, parentNote.lastElementChild)
}


export function addFtora(note, font='ftora'){

    const selected = document.querySelector('.note.selected')
    let parentNote
        if (selected){
            parentNote = selected;
            
        }
        else {
           parentNote = paperContent.lastChild;   
        }  
        
        const newNote = document.createElement('span')
        newNote.innerHTML=note
        newNote.classList.add(font)
                
        parentNote.insertBefore(newNote, parentNote.lastChild)       
}

export function makeOxeia(){

    const oxeiaMapings = new Map([
    ["psaltica|1", "1"],     ["psaltica|2", "2"],    ["psaltica|3", "3"],    ["psaltica|4", "4"],    ["psaltica|5", "5"],    ["psaltica|6", "6"],    ["psaltica|7", "7"],    ["psaltica|8", "8"],    ["psaltica|9", "9"],    ["special|0", "I"],     ["special|1", "W"],    ["special|2", "E"],    ["psaltica|0", "I"],    ["special2|9", "I"],    ["psaltica|~", "~"],    ["psaltica|!", "!"],    ["psaltica|I", "!"],    ["special|\\", "`"],    ["psaltica|-", "-"],    ["psaltica|@", "@"],    ["psaltica|#", "#"],    ["psaltica|$", "$"],    ["psaltica|P", "P"],    ["psaltica|o", "o"],    ["psaltica|O", "O"],    ["psaltica|l", "l"],    ["psaltica|L", "L"],    ["psaltica|=", "="],    ["special|u", "%"],     ["special|i", "^"],    ["psaltica|U", "U"],    ["psaltica|Y", "Y"],    ["psaltica|T", "T"],    ["psaltica|R", "R"],    ["special|t", "&"],     ["special|5", "*"],    ["special|8", "("],    ["special|9", "j"],    ["special|T", "J"],    ["special|Y", "º"],    ["special|y", "_"],    ["psaltica|_", "\\"],    ["psaltica|s", "s"],    ["psaltica|S", "S"],    ["psaltica|x", "x"],    ["psaltica|X", "X"],    ["psaltica|h", "h"],    ["psaltica|H", "H"],    ["psaltica|d", "d"],    ["psaltica|D", "D"],    ["psaltica|f", "f"],    ["psaltica|F", "F"],    ["psaltica|g", "g"],    ["psaltica|G", "G"],    ["psaltica|{", "{"],    ["psaltica|[", "["],    ["psaltica|]", "]"],    ["psaltica|'", "'"]
]);

    const reverseOxeiaMapings = new Map([
    ["1", ["psaltica", "1"]],    ["2", ["psaltica", "2"]],    ["3", ["psaltica", "3"]],    ["4", ["psaltica", "4"]],    ["5", ["psaltica", "5"]],    ["6", ["psaltica", "6"]],    ["7", ["psaltica", "7"]],    ["8", ["psaltica", "8"]],    ["9", ["psaltica", "9"]],    ["Q", ["special", "0"]],    ["W", ["special", "1"]],    ["E", ["special", "2"]],     // Ambiguous: could be psaltica|0, special|0 or special2|9. Chose psaltica|0 because it is the primary note font.
    ["I", ["psaltica", "0"]],    ["~", ["psaltica", "~"]],    ["!", ["psaltica", "!"]],    ["`", ["special", "\\"]],    ["-", ["psaltica", "-"]],    ["@", ["psaltica", "@"]],    ["#", ["psaltica", "#"]],    ["$", ["psaltica", "$"]],    ["P", ["psaltica", "P"]],    ["o", ["psaltica", "o"]],    ["O", ["psaltica", "O"]],    ["l", ["psaltica", "l"]],    ["L", ["psaltica", "L"]],    ["=", ["psaltica", "="]],    ["%", ["special", "u"]],    ["^", ["special", "i"]],     ["U", ["psaltica", "U"]],    ["Y", ["psaltica", "Y"]],    ["T", ["psaltica", "T"]],    ["R", ["psaltica", "R"]],    ["&", ["special", "t"]],    ["*", ["special", "5"]],    ["(", ["special", "8"]],    ["j", ["special", "9"]],    ["J", ["special", "T"]],    ["º", ["special", "Y"]],    ["_", ["special", "y"]],    ["\\", ["psaltica", "_"]],    ["s", ["psaltica", "s"]],    ["S", ["psaltica", "S"]],    ["x", ["psaltica", "x"]],    ["X", ["psaltica", "X"]],    ["h", ["psaltica", "h"]],    ["H", ["psaltica", "H"]],    ["d", ["psaltica", "d"]],    ["D", ["psaltica", "D"]],    ["f", ["psaltica", "f"]],    ["F", ["psaltica", "F"]],    ["g", ["psaltica", "g"]],    ["G", ["psaltica", "G"]],    ["{", ["psaltica", "{"]],    ["[", ["psaltica", "["]],    ["]", ["psaltica", "]"]],    ["'", ["psaltica", "'"]]
]);

    
    const note = document.querySelector('.note.selected')

    if (!note) {
    console.warn("No note selected.");
    return;
}

    if (note.classList[0]!='oxeia') {

    const font = note.classList[0];
    const character = note.firstChild.textContent.trim();
    const key = `${font}|${character}`

    const replacement = oxeiaMapings.get(key);

    if (replacement === undefined) {
        console.warn(`Character cannot be converted: ${key}`);
        return false;
    }

        note.classList.replace(font, "oxeia");
        note.firstChild.textContent = replacement;
    }
    else {

   const reverse = reverseOxeiaMapings.get(note.firstChild.textContent);

    if (!reverse) {
        console.warn(`Character cannot be converted back: ${note.firstChild.textContent}`);
    return;
    }

    const [font, character] = reverse;
    note.classList.replace("oxeia", font);
    note.firstChild.textContent = character;
    }
}

export function deleteNote(){

    document.querySelector('.note.selected')?.remove()
    addTextboxIDs()
}

export function choose(elements){
    const selectedNotes=document.getElementsByClassName("selected");
    Array.from(selectedNotes).forEach(selectedNote => {
        
        selectedNote.classList.remove("selected")
    });
    elements.classList.add("selected")
}

export function moveRight(){

    const selectedElement = document.querySelectorAll('.selected, .textBox-selected');

    if (selectedElement.length == 0) return;
        selectedElement[0].style.left = parseInt(window.getComputedStyle(selectedElement[0]).left) + 1 + 'px';
}

export function moveLeft(){
    const selectedElement = document.querySelectorAll('.selected, .textBox-selected');

    if (selectedElement.length == 0) return;
        selectedElement[0].style.left = parseInt(window.getComputedStyle(selectedElement[0]).left) - 1 + 'px';
}

export function moveDown(){
    const selectedElement = document.querySelectorAll('.selected, .textBox-selected');

    if (selectedElement.length == 0) return;
        selectedElement[0].style.top = parseInt(window.getComputedStyle(selectedElement[0]).top) + 1 + 'px';

}

export function moveUp(){
    const selectedElement = document.querySelectorAll('.selected, .textBox-selected');

    if (selectedElement.length == 0) return;
        selectedElement[0].style.top = parseInt(window.getComputedStyle(selectedElement[0]).top) - 1 + 'px';

}

export function newSpace(){
    
    const whiteSpace=document.createElement('div')
    whiteSpace.classList.add('white');
    paperContent.appendChild(whiteSpace)
}



export function newLine(){
    
    const line=document.createElement('div')
    line.classList.add('newline');
   
    paperContent.appendChild(line)
}


export function getNextNote(note){

    if (note.firstElementChild){
        return note.firstElementChild
    }

    if(note.nextElementSibling){
        return note.nextElementSibling
    }

    let parent = note.parentElement

    while(parent && parent != paper){

        if (parent.nextElementSibling){
            return parent.nextElementSibling
        }

        parent = parent.parentElement
    }

    return null
}

export function getPreviousNote(el) {

    if (el.previousElementSibling) {

        let prev = el.previousElementSibling;

        while (prev.lastElementChild) {
            prev = prev.lastElementChild;
        }

        return prev;
    }

    return el.parentElement;
}