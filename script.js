let numKeys=document.querySelectorAll('.numKey')
let opKeys= document.querySelectorAll('.opKey')
let equal=document.querySelectorAll('.equal')
let screenUp=document.getElementById('screenUp')
let screenDown=document.getElementById('screenDown')
let backSpace= document.getElementById('back')

let num1='';
let num2='';
let numSwitch;
let op;
let result;

let clear= document.getElementById('clear')

//use X to distinguish the operations
//use argument Y when pressing an opKey or Equal
function updateScreen(x,y){
    if (!numSwitch){
    screenDown.innerHTML=num1
    }
    else{
        screenDown.innerHTML=num2
    }
    switch(x){
        case 0:
            screenUp.innerHTML= `${num1} ${y}`
            break

        case 1:
            screenUp.innerHTML+= num2;
            screenDown.innerHTML=y;
            break

        case 'c':
            screenUp.innerHTML=''
            screenDown.innerHTML=''
            break
    }

}

function input(){
    if (!numSwitch){
        num1+= this.innerHTML
    }
    else{
        num2+=this.innerHTML
    }
    updateScreen()
}

function operation(){
    numSwitch=true;
    op=this.innerHTML
    updateScreen(0,op)
}

function calculate(){
    if (num1!='' && num2!=''){
        num1=parseFloat(num1)
        num2=parseFloat(num2)
    }
    else{
        screenDown.innerHTML='No operands';
        return
    }
    switch(op){
        case '+':
            result=num1 + num2 
            break
        
        case '-':
            result=num1-num2 
            break

        case '*':
            result=num1*num2 
            break

        case '/':
            result=num1/num2 
            break
    }
    updateScreen(1,result);
    //use this to do new calculations based on the result
    num1=result;
    num2=''
}

numKeys.forEach(e=>{
    e.addEventListener('click',input)
})

opKeys.forEach(e=>{
    e.addEventListener('click',operation)
})


equal[0].addEventListener('click',calculate)

clear.addEventListener('click',()=>{
    num1='';
    num2='';
    numSwitch=false;
    op=null;
    result='';
    updateScreen('c')
})

backSpace.addEventListener('click',()=>{
    if (!numSwitch){
        let i= num1[num1.length-1]
        num1=num1.replace(i,'')
    }
    else{
        let i= num2[num2.length-1]
        num2=num2.replace(i,'')
    }
    updateScreen()
})