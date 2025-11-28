let gameseq = [];
let userseq = [];
let finalScore = ["0"];

let btns = ["yellow" , "red" , "green" , "purple"];
let started =false ; 
let level = 0 ;

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");

document.addEventListener("keypress" , function(){
    if(started == false){
        console.log("game started");
        started = true;
    }

    levelUp();
});
 
function btnFlash(randBtn){
    randBtn.classList.add("flash");
    setTimeout(function(){
        randBtn.classList.remove("flash");
    },250);

};

function levelUp(){
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random()*4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    btnFlash(randBtn);

    gameseq.push(randColor);
    console.log(gameseq);

};

function cheakAns(idx){
    console.log(`Current Level : ${level}`);

    if(userseq[idx] === gameseq[idx]){
        if(userseq.length == gameseq.length){
            setTimeout(levelUp , 1000 );
        }
    }
    else{
        h2.innerText = "Game Over , Press any key to start";

        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "rgb(235, 199, 136)";
        },150);
        reset();
    }
}

function btnPress(){
    let btn = this;

    btnFlash(btn);

    let clr = btns.find(c => btn.classList.contains(c));
    userseq.push(clr);

    cheakAns(userseq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");

for( btn of allBtns){
    btn.addEventListener("click" , btnPress);
};

function reset(){
    started = false ;
    gameseq = [];
    userseq = [];
    console.log(`Final Score is ${level}`);
    h2.innerText = `Game Over , Final Score is ${level} \n Press any key to Play Again`;

    topscores(level);

    level = 0 ;
}

function topscores(){
    if(finalScore[0] < level){
        finalScore[0] = level;
        h3.innerText = `Top Score : ${finalScore[0]}`;
    };
};