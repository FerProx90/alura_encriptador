const form = document.getElementById('form');
const userInput = document.getElementById('userInput');
const output = document.getElementById('output');
let copyString = '';

const defaultCardOutput = 
`<div class="card-img"></div>
<span><b>Ningún mensaje fue encontrado</b><br><br>
    Ingresa el texto que desees encriptar o desencriptar.
</span>`;

const encryptedHistory = [];

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
    const vowelMap = {
        a: "ai",
        e: "enter",
        i: "imes",
        o: "ober",
        u: "ufat"
    };

    encryptedHistory.push(userInput.value);

    const dataEncrypted = userInput.value.replace(/[aeiou]/g, (vowel) => vowelMap[vowel])

       
    copyString = dataEncrypted;

    output.innerHTML = 
        `<span class="textoCodificado-js">${dataEncrypted}</span>
        <button class="copyButton-js" onClick=copyOutput()>Copiar</button>`;

    userInput.value = '';
        
    userInput.setAttribute('placeholder', "Ingrese el texto aquí");
}

function desencriptar() {
    const vowelMap = {
        a: "ai",
        e: "enter",
        i: "imes",
        o: "ober",
        u: "ufat"
    };

    let dataEncrypted = userInput.value;

    for (key in vowelMap){
        const regEx = new RegExp(vowelMap[key], 'g');
        dataEncrypted = dataEncrypted.replace(regEx, key);
        console.log(dataEncrypted)
    }

        copyString = dataEncrypted;

        output.innerHTML = 
        `<span class="textoCodificado-js">${dataEncrypted}</span>
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