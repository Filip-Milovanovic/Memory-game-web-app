const slike = [...document.querySelectorAll(".img-box")];
//We need to shuffle first

//Random shuffle

const randomShuffle = function () {
  // document.querySelector(".grid").innerHTML = "";

  const set1 = new Set();
  const set2 = new Set();
  let randic;
  while (set1.size < 8) {
    randic = Math.trunc((Math.random() * 10) % 8);
    set1.add(randic);
  }

  while (set2.size < 8) {
    randic = Math.trunc((Math.random() * 10) % 8);
    set2.add(randic);
  }

  let bigSet = [...set1, ...set2];

  bigSet.forEach(function (el, i) {
    slike[i].src = `src/img/img-${el}.jpg`;
  });

  set1.clear();
  set2.clear();
  bigSet.splice(0, bigSet.length);
  // for (let value of set1.values()) {
  //   const html = `
  //           <div class="grid-box">
  //           <div class="color-box" ></div>
  //           <img class="hidden img-box" src="imgs/img-${value}.jpg"/>
  //           </div>
  //           `;

  //   document.querySelector(".grid").insertAdjacentHTML("afterbegin", html);
  // }

  // for (let val of set2.values()) {
  //   const html = `
  //           <div class="grid-box">
  //           <div class="color-box" ></div>
  //           <img class="hidden img-box" src="imgs/img-${val}.jpg"/>
  //           </div>
  //           `;

  //   document.querySelector(".grid").insertAdjacentHTML("afterbegin", html);
  // }
};

randomShuffle();

//Site elements

const kutije = [...document.querySelectorAll(".color-box")];

const scoreLabel = document.querySelector(".score");
const highscoreLabel = document.querySelector(".highscore");
const attemptsLabel = document.querySelector(".attempts");
const btnPlayAgain = document.querySelector(".play-again");
const afterEnd = document.querySelector(".after-end");

let score = 0,
  highscore = 100,
  attempts = 0;

let check = true; //sluzi nam da se atampts ne moze povecavati vise od jednom

//Empty array of opened images and hidden boxes (its filling up)
const openImgs = [];
const hiddenBoxes = [];

//Playing logic
let work = true;
let cnt = 0;
let rightCnt = 0;

//Init function
const init = function () {
  attempts = 0;
  attemptsLabel.textContent = attempts;
  score = 0;
  scoreLabel.textContent = `${score}`.padStart(2, 0);
  rightCnt = 0;
};

//Hide imgs
const hideImgs = function () {
  slike.forEach(function (img, i) {
    img.classList.add("hidden");
    kutije[i].classList.remove("hidden");
  });
};

init();
afterEnd.style.display = "none";

//Removing boxes and showing images
kutije.forEach(function (kutija, i) {
  kutija.addEventListener("click", function () {
    if (work) {
      check = true;
      //Reveal images bellow color-box
      kutija.classList.add("hidden");
      slike[i].classList.remove("hidden");
      //Filling arrays
      openImgs.push(slike[i]);
      hiddenBoxes.push(kutija);
      //Implementing game logic
      cnt++;
      // console.log('STiSNO')
      if (cnt >= 2) work = false;
    }
    if (!work) {
      //If images are different
      // attempts++;
      // attemptsLabel.textContent = attempts;
      if (openImgs[0].getAttribute("src") !== openImgs[1].getAttribute("src")) {
        if (check) attempts++;
        attemptsLabel.textContent = attempts;
        check = false;
        setTimeout(function () {
          openImgs.forEach(function (img, i) {
            img.classList.add("hidden");
            hiddenBoxes[i].classList.remove("hidden");
          });

          openImgs.splice(0, openImgs.length);
          hiddenBoxes.splice(0, hiddenBoxes.length);
          work = true;
          cnt = 0;
        }, 1000);
      }
      //If images are same
      else if (
        openImgs[0].getAttribute("src") === openImgs[1].getAttribute("src")
      ) {
        // img.classList.remove('hidden')
        if (check) attempts++;
        attemptsLabel.textContent = attempts;
        check = false;
        rightCnt++;
        score++;
        scoreLabel.textContent = `${score}`.padStart(2, 0);
        work = true;
        cnt = 0;
        openImgs.splice(0, openImgs.length);
        hiddenBoxes.splice(0, hiddenBoxes.length);
      }
      //When you finish the game
      if (rightCnt == 8) {
        // document.querySelector('.grid').innerHTML = ''
        //Keep all images open for 1.5s
        setTimeout(function () {
          afterEnd.style.display = "flex";
        }, 1500);
        if (attempts < highscore) {
          highscore = attempts;
          highscoreLabel.textContent = highscore;
        }
        btnPlayAgain.addEventListener("click", function () {
          randomShuffle();

          init();
          hideImgs();
          afterEnd.style.display = "none";
        });
      }
    }
    // }
  });
});
