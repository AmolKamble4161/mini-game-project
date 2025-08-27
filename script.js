let choices = document.querySelectorAll('.choice');
let msg = document.getElementById('msg');
let userScoreLable = document.getElementById('userScore');
let compScoreLable = document.getElementById('compScore');

// choice selected lables
let userLable = document.getElementById('userLable');
let compLable = document.getElementById('compLable');

// sprink animation on who win
let userSprink = document.querySelector('.userSprink');
let compSprink = document.querySelector('.compSprink');

let userScore = 0;
let compScore = 0;

// let make computer choice random()
const genCompChoice = () => {
    const options = ['rock', 'paper', 'scissors'];
    let randInx = Math.floor(Math.random() * 3);
    return options[randInx];
}

// compare boths choices
const playGame = (userChoice) => {
    // generated Computer choice
    const compChoice = genCompChoice();

    // If select same - darw game
    if(userChoice === compChoice){
        drowGame();
    }else{
        let userWin = true;
        if(userChoice === 'rock'){
            //paper, scissors
            userWin = compChoice === 'paper' ? false : true;
        }else if(userChoice === 'paper'){
            //rock, scissors
            userWin = compChoice === 'scissors' ? false : true;
        }else {
            //rock, paper
            userWin = compChoice === 'rock' ? false : true;
        }
        showWiner(userWin, userChoice, compChoice);
    }
    // show choices in lable
    lableEffect(userChoice, compChoice);
}

const drowGame = () => {
    msg.innerText = 'Draw Game';
    msg.style.backgroundColor = "#465362";
}

// capitalize word
const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

// show winner + score update + little animations and background color change
const showWiner = (userWin, userChoice, compChoice) => {
    if(userWin){
        createParticles(userSprink);
        userScore++;
        userScoreLable.innerText = userScore;
        msg.innerText = `You Win! Your ${capitalize(userChoice)} Bets ${capitalize(compChoice)}`;
        msg.style.backgroundColor = "green";
    }else{
        createParticles(compSprink);
        compScore++;
        compScoreLable.innerText = compScore;
        msg.innerText = `You Loss! ${capitalize(compChoice)} Bets Your ${capitalize(userChoice)}`;
        msg.style.backgroundColor = "red";
    }
}

// porgram start form this function after click or user choice
choices.forEach((choice) => {
    choice.addEventListener('click', () => {

        let userChoice = choice.getAttribute('id');
        playGame(userChoice);    
    });
});


// fade-up animation effects on labels of both oprands
const lableEffect = (userChoice, compChoice) => {
    // access the span tag - old
    const oldSpanUser = userLable.querySelector("span");
    const oldSpanComp = compLable.querySelector("span");
    // create a new span tag - new
    const newSpanUser = document.createElement("span");
    const newSpanComp = document.createElement("span");
    // innitial values to new tag
    newSpanUser.innerText = `${capitalize(userChoice)}`;
    newSpanComp.innerText = `${capitalize(compChoice)}`;
    // position down
    newSpanUser.style.transform = "translateY(100%)";
    newSpanComp.style.transform = "translateY(100%)";

    userLable.appendChild(newSpanUser);
    compLable.appendChild(newSpanComp);
    
    // trigger animation
    requestAnimationFrame(() => {
      oldSpanUser.style.transform = "translateY(-100%)";
      oldSpanUser.style.opacity = "0";
      oldSpanComp.style.transform = "translateY(-100%)";
      oldSpanComp.style.opacity = "0";

      newSpanUser.style.transform = "translateY(0)";
      newSpanComp.style.transform = "translateY(0)";
    });
    
    // clean up
    setTimeout(() => {
      if (oldSpanUser) oldSpanUser.remove();
      if (oldSpanComp) oldSpanComp.remove();
    }, 400); 
}

// function to create particles
let symbolIndex = 0; // start at first symbol
const symbols = ["✨","⭐","🌟","🦋","🌸"];

function createParticles(parent) {
    // pick current symbol
    const symbol = symbols[symbolIndex];

    for (let i = 0; i < 8; i++) {
        const particle = document.createElement("span");
        particle.classList.add("particle");
        particle.innerText = symbol;

        // random position inside box
        const x = Math.random() * parent.offsetWidth - 10;
        const y = Math.random() * parent.offsetHeight - 10;
        particle.style.left = x + "px";
        particle.style.top = y + "px";

        parent.appendChild(particle);

        // remove after animation
        setTimeout(() => {
            particle.remove();
        }, 2000);
    }

    // move to next symbol (and loop back when reaching the end)
    symbolIndex = (symbolIndex + 1) % symbols.length;
}
