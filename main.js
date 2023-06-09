// ---------- All DOM elements----------
const form = document.getElementById('form');
const userInput = document.getElementById('userInput');
const output = document.getElementById('output');
const historyButton = document.getElementById('historyButton');
const closeButton = document.getElementById('closeButton');
const historyDeleteBtn = document.getElementById('historyDeleteBtn');
const historyCard = document.querySelector('.history-card');

// ---- variable for clipBoard ----
let copyString = '';

// ---- Local storage variable
const storage = {
        localUserStorage: JSON.parse(localStorage.getItem('encryptStorage')) ?? [],
        hasStorage: false
    }

// --- Object for encrypt functions ---
const vowelMap = {
    a: "ai",
    e: "enter",
    i: "imes",
    o: "ober",
    u: "ufat"
};

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    const buttonClicked = event.submitter;

    //Validación con expresión regular del input del usuario
    const regex = /^[a-z0-9_\-!¡ .¿?,\s]*$/g;
    const string = new String(userInput.value)
    const val = string.match(regex) ?? false;

    if (val && userInput.value.trim() != ''){
        historyAdd(userInput.value, buttonClicked.value);

        if (buttonClicked.value == "encriptar"){
            encrypt();
        }

        else if (buttonClicked.value == "desencriptar"){
        decrypt();
        }
    }
    else{
        userInput.setAttribute('placeholder', "Por favor escribe algo :)");
        const infoIcon = document.getElementById('info-icon').src = "images/info-warning.svg";
        const infoText = document.getElementById('info-text').classList.add('warning-js');
        userInput.focus();
    }
});


userInput.addEventListener('keypress', ()=>{
    const infoIcon = document.getElementById('info-icon').src = "images/info.svg";
    const infoText = document.getElementById('info-text').classList.remove('warning-js');
    userInput.setAttribute('placeholder', "Ingrese el texto aquí");
});

historyButton.addEventListener('click', ()=>{
    historyButton.style.visibility = 'hidden';
    historyCard.classList.add('show_historyCard-js');
});

closeButton.addEventListener('click', ()=>{
    historyButton.style.visibility = 'visible';
    historyCard.classList.remove('show_historyCard-js');
});

historyDeleteBtn.addEventListener('click', ()=>{
    storage.localUserStorage = [];
    localStorage.removeItem('encryptStorage');
    
    const paragraphs = document.querySelectorAll('[data-history]');
    paragraphs.forEach(parag =>{
        parag.remove();
    })
});

function encrypt() {
    const dataEncrypted = userInput.value.replace(/[aeiou]/g, (vowel) => vowelMap[vowel]);
       
    outputContent(dataEncrypted);
    copyString = dataEncrypted;
}


function decrypt() {
    let dataEncrypted = userInput.value;

    for (key in vowelMap){
        const regEx = new RegExp(vowelMap[key], 'g');
        dataEncrypted = dataEncrypted.replace(regEx, key);
    }

        outputContent(dataEncrypted);
        copyString = dataEncrypted;
}


function outputContent(dataEncrypted) {
    output.innerHTML = 
        `<span class="textoCodificado-js">${dataEncrypted}</span>
        <button class="copyButton-js" onClick=copyOutput()>Copiar</button>`;

    userInput.value = '';        
    userInput.setAttribute('placeholder', "Ingrese el texto aquí");
}


function copyOutput(){
        navigator.clipboard.writeText(copyString)
            .then(() => {
                output.innerHTML = ''
                
                bodymovin.loadAnimation({
                    container: document.getElementById('output'),
                    path: 'animations/79952-successful.json',
                    render: 'svg',
                    loop: false,
                    autoplay: true
                });


                setTimeout(()=>{
                    output.innerHTML =
                    `<div class="card-img"></div>
                    <span><b>Ningún mensaje fue encontrado</b><br><br>
                        Ingresa el texto que desees encriptar o desencriptar.
                    </span>`;
                }, 1600)
            })
            .catch(()=> alert("Something went wrong"));
}


function historyAdd(input, submitter) {
    const paragraph = document.createElement('p');
    paragraph.classList.add('history-card-data');
    paragraph.setAttribute('data-history', 'data');
    paragraph.innerHTML = `<b>${submitter}:</b> ${input}`;
    historyCard.appendChild(paragraph);

    const storageMap = {
        'submitter': submitter,
        'input': input
    }

    if(storage.hasStorage){
        storage.localUserStorage.push(storageMap);
        localStorage.setItem('encryptStorage', JSON.stringify(storage.localUserStorage));
    }
}


// --------- animation code ------------
const animtation = bodymovin.loadAnimation({
    container: document.getElementById('typingAnimation'),
    path: 'animations/93884-typing.json',
    render: 'svg',
    loop: true,
    autoplay: true
});

// ------- Local storage history filler --------
    document.addEventListener('DOMContentLoaded',()=>{
        if (storage.localUserStorage.length > 0){
            storage.localUserStorage.forEach(element =>{
                historyAdd(element.input, element.submitter);
            })
        }
        storage.hasStorage = true
    })
