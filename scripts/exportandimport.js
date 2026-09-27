import { addTextboxIDs } from "./notes.js";
import {neumesimportarea, paperContent} from "./dom.js"
import { state } from "./state.js";



function pretty(baseHtml){
    const indent = "    "
    let indentCount = 0;
    let result = ""

    let tokens = baseHtml.match(/<[^>]+>|[^<]+/g);
    

    for (let token of tokens) {
    
        token = token.trim()
        
        if (token === "") {
        continue;
        }

        if (token.startsWith("</")){
            indentCount--;
            result += indent.repeat(indentCount) + token + "\n"
            if (indentCount === 0) {
                 result += "\n";
            }
        
        }

        else if (token.startsWith("<")){

            result += indent.repeat(indentCount) + token + "\n"
            indentCount++;

        }


        else result += indent.repeat(indentCount) + token + "\n"

    }
    return result;
}


export function exportNotes(){

    activeteNoteButtons('importNeumes');

    
    neumesimportarea.value = pretty(paperContent.innerHTML)

}

export function savePDF(){

    const isJustified = window.getComputedStyle(paperContent).justifyContent == 'space-between';

    const options = {
        margin:       0,
        filename:     'content.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 4 },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };


    html2pdf().from(paperContent).set(options).toPdf().get('pdf').then(function(pdf) {

            const dateNow = new Date().toString().slice(0, -42)
                const metadata = {
                    title: 'Neumes '+dateNow,
                    subject: 'Neumes '+dateNow,
                    author: 'NeumesApp Version=' +state.version + " j=" + isJustified,
                    keywords: paperContent.innerHTML
        };


        pdf.setProperties(metadata);

        const pageHeight = pdf.internal.pageSize.getHeight();
        const pageWidth = pdf.internal.pageSize.getWidth();


        if (state.footerOn) {
            pdf.setFontSize(8)
            pdf.setFont('Helvetica', 'italic')
            pdf.text(
                "Created using Neumes © (neumes25.github.io/neumes)",
                pageWidth/2,
                pageHeight-7,
                {align:'center'}
            )
        }


        pdf.save();
    });

}

export function importNeumes(){ 

    paperContent.innerHTML = neumesimportarea.value

    addTextboxIDs()
}

export async function readUpload(){

    const upload = document.getElementById('Upload')
    const file = upload.files[0]

    const arrayBuffer = await file.arrayBuffer();

    const pdf = await pdfjsLib.getDocument({data: arrayBuffer}).promise;

    const {info, metadata} = await pdf.getMetadata();
    
    neumesimportarea.value=info.Keywords

    // neumesimportarea.innerText=pretty(info.Keywords)

    importNeumes()

    console.log(info.Author)
    
    if(info.Author.toString().includes('true')){
        paperContent.style.justifyContent = 'space-between'
    }
    else{
        paperContent.style.justifyContent = 'flex-start'
    }
}