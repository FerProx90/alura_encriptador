const form = document.getElementById('form');
const userInput = document.getElementById('userInput');
const output = document.getElementById('output');
let copyString = ''
const defaultCardOutput = 
`<div class="card-img"></div>
<span><b>Ningún mensaje fue encontrado</b><br><br>
    Ingresa el texto que desees encriptar o desencriptar.
</span>`;

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    const buttonClicked = event.submitter;

    //Validación con expresión regular el input del usuario
    const regex = /^[a-z0-9!¡ .¿?,]*$/g;
    const string = new String(userInput.value)
    const val = string.match(regex) ?? false;

    if (val && userInput.value.trim() != ''){
        if (buttonClicked.value == "encriptar"){
            encriptar();
        }

        else if (buttonClicked.value == "desencriptar"){
        desencriptar();
        }
    }
    else{
        userInput.setAttribute('placeholder', "Por favor escribe algo :)");
        const infoIcon = document.getElementById('info-icon').src = "images/info-warning.svg";
        const infoText = document.getElementById('info-text').classList.add('warning-js');
        userInput.focus();
    }
})

userInput.addEventListener('keypress', ()=>{
    const infoIcon = document.getElementById('info-icon').src = "images/info.svg";
    const infoText = document.getElementById('info-text').classList.remove('warning-js');
})


function encriptar() {
    const dataEcrypted = userInput.value
            .replace(/e/g, "enter")
            .replace(/i/g, "imes")
            .replace(/a/g, "ai")
            .replace(/o/g, "ober")
            .replace(/u/g, "ufat");
       
        copyString = dataEcrypted;

        output.innerHTML = 
        `<span class="textoCodificado-js">${dataEcrypted}</span>
        <button class="copyButton-js" onClick=copyOutput()>Copiar</button>`;

        userInput.value = '';
        
        userInput.setAttribute('placeholder', "Ingrese el texto aquí");
}

function desencriptar() {
    const dataEcrypted = userInput.value
            .replace(/enter/g, "e")
            .replace(/imes/g, "i")
            .replace(/ai/g, "a")
            .replace(/ober/g, "o")
            .replace(/ufat/g, "u");

        copyString = dataEcrypted;

        output.innerHTML = 
        `<span class="textoCodificado-js">${dataEcrypted}</span>
        <button class="copyButton-js" onClick=copyOutput()>Copiar</button>`;

        userInput.value = '';
        userInput.setAttribute('placeholder', "Ingrese el texto aquí");
}

function copyOutput(){
        navigator.clipboard.writeText(copyString)
            .then(() => {
                output.innerHTML =
                `<img src="images/check.svg">
                <span class="success">Texto copiado satisfactoriamente
                </span>`

                setTimeout(()=>{
                    output.innerHTML = defaultCardOutput
                }, 2000)
            })
            .catch(()=> alert("Something went wrong"));

        
}

