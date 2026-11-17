import { state } from './state.js';
import { paperContent, paper, paperPrint, textBoxFontSize, textInputArea, neumesimportarea, version } from './dom.js';
import { addNoteWithText, addNoteNoText, addFtora, addMartiria, addIson, addTemporalNote, makeOxeia, deleteNote, choose, moveDown, moveLeft, moveRight, moveUp, newSpace, newLine, getNextNote, getPreviousNote} from './notes.js'
import { addText, getTextFromNeumes, removeAccents, addAccentsBack, removePunctuation, copyToClipboard} from './lyrics.js'
import { importNeumes, exportNotes, savePDF, readUpload} from './exportandimport.js'
import { turnOffFooter, addTextBox, newLineAtStart, deleteNewLineAtStart, addTitleMartira, activetePageNumbers, updatePageNumber, justify} from './pagesetup.js'
import { activeteNoteButtons, showTextBoxMenu } from './gui.js' 
import { DemoMode } from './demo.js'

function init(){
    
    textInputArea.value=""
    neumesimportarea.value=""
    document.getElementById('pageNumberInput').value="1"
    document.getElementById('Upload').value=''
    textBoxFontSize.value = '16'
    version.innerText=state.version;
    state.countTextNote = 0;
    activeteNoteButtons(' ');
    paperContent.innerHTML=""
}


    paperPrint.addEventListener('click', ()=> {document.getElementById('print').focus()})


    paperContent.addEventListener("click", (event) => {
        const ob = event.target.closest(".note, .text, #startMartiria")

        if (!ob){
            return;
        }

        choose(ob)
    })

    document.addEventListener('keydown', (event)=>{
    
   if((event.keyCode === ' ' || event.keyCode==='ArrowRight') &&  document.activeElement == paperPrint) event.preventDefault()

   if (document.activeElement !== paperPrint) return;
    
    if (event.key == 'Tab'){

        event.preventDefault()

        const selectedNote = document.getElementsByClassName('selected')[0]

        if(!selectedNote) return

        const nextNote = event.shiftKey ? getPreviousNote(selectedNote) : getNextNote(selectedNote)

        selectedNote.classList.remove('selected')
        nextNote.classList.add('selected')
    }
   
    document.getElementsByName(event.key)[0]?.click()

    const selected = document.getElementsByClassName("selected");

    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) event.preventDefault()
    if (event.key == 'ArrowUp' &&  selected)  moveUp()

    if (event.key == 'ArrowDown' && selected) moveDown()
    
    if (event.key == 'ArrowLeft' && selected) moveLeft()

    if (event.key == 'ArrowRight' && selected) moveRight()
    
    if (event.key == "Escape") {
        document.getElementsByClassName("selected")[0]?.classList.remove("selected")
        document.getElementsByClassName("textBox-selected")[0]?.classList.remove("textBox-selected")
    }
})

textBoxFontSize.addEventListener('input', ()=>{document.getElementById('fontSizeValue').textContent = textBoxFontSize.value})


init();


window.state = state 
window.addNoteWithText = addNoteWithText;
window.addNoteNoText = addNoteNoText;
window.addIson = addIson;
window.addMartiria = addMartiria;
window.addTemporalNote =addTemporalNote;
window.addFtora = addFtora;
window.makeOxeia = makeOxeia;
window.exportNotes = exportNotes;
window.importNeumes = importNeumes;
window.deleteNote = deleteNote;
window.activeteNoteButtons = activeteNoteButtons;
window.addText = addText;
window.getTextFromNeumes = getTextFromNeumes;
window.newSpace = newSpace;
window.addTextBox = addTextBox;
window.addTitleMartira = addTitleMartira;
window.activetePageNumbers = activetePageNumbers;
window.updatePageNumber = updatePageNumber;
window.removeAccents = removeAccents;
window.addAccentsBack = addAccentsBack;
window.justify = justify;
window.readUpload = readUpload;
window.removePunctuation = removePunctuation;
window.copyToClipboard = copyToClipboard;
window.choose = choose;
window.showTextBoxMenu = showTextBoxMenu;
window.newLine = newLine;
window.newLineAtStart = newLineAtStart;
window.deleteNewLineAtStart  = deleteNewLineAtStart;
window.savePDF = savePDF;
window.DemoMode = DemoMode;
window.init = init;
window.turnOffFooter = turnOffFooter;

