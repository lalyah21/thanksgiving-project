const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
let cards;
let interval;
let firstCard = false;
let secondCard = false;


const items = [
    { name: "bee", image: "https://i.ibb.co/3p8vdh9/bee.png" },
    { name: "crocodile", image: "https://i.ibb.co/WWvmR5N/crocodile.png" },
    { name: "macaw", image: "https://i.ibb.co/fkMvzRS/macaw.png" },
    { name: "gorilla", image: "https://i.ibb.co/KGKZK1S/gorilla.png" },
    { name: "tiger", image: "https://i.ibb.co/TPnM1wL/tiger.png" },
    { name: "monkey", image: "https://i.ibb.co/CvKXKfp/monkey.png" },
    { name: "chameleon", image: "https://i.ibb.co/Dtd37dC/chameleon.png" },
    { name: "piranha", image: "https://i.ibb.co/6B1vbPv/piranha.png" },
    { name: "anaconda", image: "https://i.ibb.co/cttGvnK/anaconda.png" },
    { name: "sloth", image: "https://i.ibb.co/ck41svT/sloth.png" },
    { name: "cockatoo", image: "https://i.ibb.co/YRyrKhz/cockatoo.png" },
    { name: "toucan", image: "https://i.ibb.co/wSWNhmg/toucan.png" }
];


let seconds = 0,
  minutes = 0;

let movesCount = 0,
  winCount = 0;


const timeGenerator = () => {
  seconds += 1;
 
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
 
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};


const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};


const generateRandom = (size = 4) => {
 
  let tempArray = [...items];
  
  let cardValues = [];
 
  size = (size * size) / 2;
  
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
   
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
    
    gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before">?</div>
        <div class="card-after">
        <img src="${cardValues[i].image}" class="image"/></div>
     </div>
     `;
  }
  
  gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;

 
  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      
      if (!card.classList.contains("matched")) {
        
        card.classList.add("flipped");
       
        if (!firstCard) {
          
          firstCard = card;
          
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          
          movesCounter();
          
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            
            firstCard = false;
            
            winCount += 1;
            
            if (winCount == Math.floor(cardValues.length / 2)) {
              result.innerHTML = `<h2>You Won</h2>
            <h4>Moves: ${movesCount}</h4>`;
              stopGame();
            }
          } else {
           
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};


startButton.addEventListener("click", () => {
  movesCount = 0;
  seconds = 0;
  minutes = 0;
  
  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");
  
  interval = setInterval(timeGenerator, 1000);
 
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
  initializer();
});


stopButton.addEventListener(
  "click",
  (stopGame = () => {
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);
  })
);


const initializer = () => {
  result.innerText = "";
  winCount = 0;
  let cardValues = generateRandom();
  console.log(cardValues);
  matrixGenerator(cardValues);
};