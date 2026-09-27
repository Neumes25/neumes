import {state} from './state.js'
import {textInputArea} from './dom.js'

export function addText(){

    const textString = textInputArea.value.replaceAll('\n', " ")
    const textArray = textString.split(" ").filter(value => value !=" " && value!="");
    
    for (let i=0; i<Math.min(state.countTextNote, textArray.length); i++){
        
        const noteText = document.getElementById(i.toString());
        noteText.innerText = textArray[i]
    }
}

export function getTextFromNeumes(){

    let text2String = ''
    for(let i=0; i<state.countTextNote; i++){
    
        text2String += document.getElementById(i.toString()).innerText + ' ';
    }

    textInputArea.value = text2String;
}

export function removeAccents(){

    withAccents = textInputArea.value;
    removedAccents = withAccents.split('').filter(char => !/['12@~]/.test(char)).join('');

const characterMap = new Map([
    ['$', '#'],    ['%', '#'],    ['0', 'о'],    ['4', '3'],    ['5', '3'],    ['E', 'е'],    ['H', 'њ'],    ['h', 'ы'],    ['S', 'z'],    ['s', 'z'],    ['Y', 'у'],    ['y', 'у'],    ['A', 'а'],    ['a', 'а'],    ['e', 'е'],    ['|', 'z3'],    ['ѓ', 'а3'],    ['ќ', 'ў'],    ['Ќ', 'Ў'],    ['ћ', 'я'],    ['Ћ', 'Я'],    ['ё', 'э'],    ['±', 'я'],    ['Ё', 'э'],    ['џ', 'o'],    ['Ј', 'І'],    ['ј', 'i3'],    ['j', 'і'],    ['J', 'ї']
]);

for (const [from, to] of characterMap) {
    removedAccents = removedAccents.replaceAll(from, to);
}
    textInputArea.value=removedAccents;    
}


export function addAccentsBack(){
    console.log('not working now')
    // textInputArea.value = '';
    // textInputArea.value = withAccents;
}


export function removePunctuation(){
  
    textInputArea.value=textInputArea.value.split('').filter(char => !/[,.:;!?*()/]/.test(char)).join('');
}

export function copyToClipboard(value){
    navigator.clipboard.writeText(value)
}