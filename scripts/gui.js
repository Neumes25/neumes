export function activeteNoteButtons(button){
    const elements = document.getElementsByClassName('Button-menu');

    for (let i=0; i<elements.length; i++){

        elements[i].classList.contains(button) ? elements[i].style.display = 'block' : elements[i].style.display = 'none'       
    }
}



  
export function showTextBoxMenu(){
    document.getElementById("textBoxMenu").style.getPropertyValue('display') == 'none' ? document.getElementById("textBoxMenu").style.setProperty('display', 'block') :  document.getElementById("textBoxMenu").style.setProperty('display', 'none')
}