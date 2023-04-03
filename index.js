const inputSlider=document.querySelector("[slider]");
const lengthDisplay=document.querySelector("[data-lengthDisplay]");
const passwordDisplay=document.querySelector(".display");
const copyButton=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[copy-msg]");
const upperCaseCheck=document.querySelector("#uppercase");
const lowerCaseCheck=document.querySelector("#lowercase");
const numbersCheck=document.querySelector("#numbers");
const symbolsCheck=document.querySelector("#symbols");
const dataIndicator=document.querySelector("[data-indicator]");
const generatebtn=document.querySelector(".generate-password");
const allCheckBox=document.querySelectorAll("input[type=checkbox]"); // queryAll is used not query 
const sym='~!@#$%^&*()[]{};:<>,.?/\|';



let password="";
let passwordLength=10;
let checkCount=0;
handleSlider();
function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText = passwordLength;
     
}
//setIndicator("#0ffc");


function setIndicator(color){
    dataIndicator.style.backgroundColor=color;
}

function generaterandonInt(min ,max){
   return  Math.floor(Math.random()*(max-min)) + min;
}
function generateNumber(){
    return generaterandonInt(0,9);
}

function generatelowerCase(){
    return String.fromCharCode(generaterandonInt(97, 123));

}
function generateupperCase(){
    return String.fromCharCode(generaterandonInt(65, 91))
}

function generatesymbol(){
    const randNum=generaterandonInt(0, sym.length);
    return sym.charAt(randNum);
}

function calcStrength(){
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSymbol=false;

    if(upperCaseCheck.checked) hasUpper=true;
    if(lowerCaseCheck.checked) hasLower=true;
    if(numbersCheck.checked) hasNum=true;
    if(symbolsCheck.checked) hasSymbol=true;

    if(hasLower && hasUpper  && (hasNum || hasSymbol ) && passwordLength>=8){
        setIndicator("#0f0");
    }

    else if((hasLower || hasUpper) && (hasNum || hasSymbol) && passwordLength>=6 ){
        setIndicator("#ff0");
    }

    else{
        setIndicator("#f00");
    }
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="Copied";
    }
    catch{
        copyMsg.innerText="Failed to copy";
    }
    copyMsg.classList.add("active");

    setTimeout(() => {

        copyMsg.classList.remove("active");
    }, 2000);
}

function handleCheckBox(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        
        }
    })

    // corner case

    if(checkCount>passwordLength){
        passwordLength=checkCount;
        handleSlider();
    }
}


allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change', handleCheckBox);
})



inputSlider.addEventListener('input', (x) => {
    passwordLength=x.target.value;
    handleSlider();
}) 

copyButton.addEventListener('click', ()=>{
    if(passwordDisplay.value){
        copyContent();
    }
})

generatebtn.addEventListener('click', () =>{
    if(checkCount<=0){
        return;
    }

    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider(); 
    }

    password="";
    let arr=[];

    if(upperCaseCheck.checked)
        arr.push(generateupperCase);
    if(lowerCaseCheck.checked)
        arr.push(generatelowerCase);
    if(symbolsCheck.checked)
        arr.push(generatesymbol);
    if(numbersCheck.checked)
        arr.push(generateNumber);

    //mandatory task
    for(let i=0; i<arr.length;i++){
        password+=arr[i]();

    }
    // random addition
    for(let i=0; i<passwordLength-arr.length;i++){
        let random=generaterandonInt(0, arr.length);
        password+=arr[random]();
    }
    passwordDisplay.value=password;
 
    calcStrength();
    
});

