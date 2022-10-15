"use strict";

/**
 * 1. When user click play btn,
 *  1) bugs and carrots appear randomly. //
 *    a) appear first //
 *    b) positions Randomly //
 *  2) Timer start from 10 to 0. //
 *    a) when it's 0, show 'you lost' box. //
 *  3) When I click bug, counter will be increased. //
 *    a) when I click every bugs in 10 secs, show 'you won' box
 *
 * 2. When I click 'stop' btn,
 *  1) show 'replay' btn
 *  2) Stop the timer
 *
 * 3. When I click 'replay' btn,
 *  1) Game starts like #1
 *
 * 4. Sound!
 */

let counterBtn = document.querySelector(".counter");
const playBtn = document.querySelector(".playBtn");
const pauseBtn = document.querySelector(".pauseBtn");
const replayBox = document.querySelector(".replaySection");
const lostBox = document.querySelector(".lostSection");
const wonBox = document.querySelector(".wonSection");
const bugSection = document.querySelector(".bugSection");
let timer = document.querySelector(".timer");
let originReplay = document.querySelector(".originReplay");
let lostReplay = document.querySelector(".lostReplay");
let wonReplay = document.querySelector(".wonReplay");
// let bug = document.querySelectorAll(".bugImg");
// let carrot = document.querySelectorAll(".carrImg");

let timeLeft = 5;

playBtn.addEventListener("click", () => {
  playBtn.style.display = "none";
  pauseBtn.style.width = 40 + "px";
  pauseBtn.style.height = 40 + "px";
  pauseBtn.style.padding = 3 + "%";
  pauseBtn.style.fontSize = 40 + "px";

  bugSection.style.display = "block";

  timerStart();

  pauseBtn.addEventListener("click", () => {
    replayBox.style.display = "block";
    lostBox.style.display = "none";
    clearInterval();
    timeLeft = 0;
    deactivateBugsCarrots();
  });

  randomPosition();
  carrotCounter();
  carrotFind();

  // carrotFindAll();

  bug.forEach((array) => {
    array.addEventListener("click", (event) => {
      lostBox.style.display = "block";
      timeLeft = 0;
      deactivateBugsCarrots();
    });
  });
});

let bug = [];
let carrot = [];

let bugs = document.createElement("img");
let bugs1 = document.createElement("img");
function createBug() {
  console.log('Im in createBug');
  bugs.setAttribute("class", "bugImg");
  bugs.setAttribute("src", "./img/bug.png");
  bug.push(bugs);
  bugs1.setAttribute("class", "bugImg");
  bugs1.setAttribute("src", "./img/bug.png");
  bug.push(bugs1);
  bugSection.appendChild(bugs);
  bugSection.appendChild(bugs1);
  console.log('bugsection' + bugSection);
}

let carrots = document.createElement("img");
let carrots1 = document.createElement("img");
function createCarrot() {
  console.log('Carrots:' + carrots);
  console.log('Im in createCarrot');
  carrots.setAttribute("class", "carrImg");
  carrots.setAttribute("src", "./img/carrot.png");
  carrot.push(carrots);
  carrots1.setAttribute("class", "carrImg");
  carrots1.setAttribute("src", "./img/carrot.png");
  carrot.push(carrots1);
  bugSection.appendChild(carrots);
  bugSection.appendChild(carrots1);
  console.log('Carrotsection' + bugSection);
}

function removeCarrot() {
  bugSection.removeChild(carrots);
  bugSection.removeChild(carrots1);
}

function removeBug() {
  bugSection.removeChild(bugs);
  bugSection.removeChild(bugs1);
}

function deactivateBugsCarrots() {
  bugs.style.pointerEvents = "none";
  bugs1.style.pointerEvents = "none";
  carrots.style.pointerEvents = "none";
  carrots1.style.pointerEvents = "none";
}

function activateBugsCarrots() {
  bugs.style.pointerEvents = "auto";
  bugs1.style.pointerEvents = "auto";
  carrots.style.pointerEvents = "auto";
  carrots1.style.pointerEvents = "auto";
}

function randomPosition() {
  console.log('removeBug 다음줄 in randomPosition');

  createBug();
  createCarrot();

  let winWidth = 700;
  let winHeight = 150;

  carrot.forEach((array) => {
    let thisDiv = array;

    // get random numbers for each element
    let randomTop = getRandomNumber(winHeight);
    let randomLeft = getRandomNumber(winWidth);

    // update top and left position
    thisDiv.style.top = randomTop + "px";
    thisDiv.style.left = randomLeft + "px";

    function getRandomNumber(max) {
      return Math.random() * max;
    }
  });

  bug.forEach((array) => {
    let thisDiv = array;

    // get random numbers for each element
    let randomTop = getRandomNumber(winHeight);
    let randomLeft = getRandomNumber(winWidth);

    // update top and left position
    thisDiv.style.top = randomTop + "px";
    thisDiv.style.left = randomLeft + "px";

    function getRandomNumber(max) {
      return Math.random() * max;
    }
  });
}

function updateTimer() {
  timeLeft = timeLeft - 1;
  if (timeLeft > 0) {
    document.querySelector(".timer").innerHTML = `0:${timeLeft}`;
  } else if (timeLeft == 0) {
    document.querySelector(".timer").innerHTML = `0:${timeLeft}`;
    showLostBox();
  }
}

function showLostBox() {
  console.log(timeLeft);
  lostBox.style.display = "block";
  deactivateBugsCarrots();
}

function timerStart() {
  timer = setInterval(updateTimer, 1000);
  updateTimer();
  lostBox.style.display = "none";
}

function carrotCounter() {
  let i = 0;
  carrot.forEach((array) => {
    array.addEventListener("click", () => {
      counterBtn.innerHTML = 1 + i;
      i++;
      checker(i);
    });
  });
}

function checker(counter) {
  console.log(carrot.length);
  console.log(counter);
  if (carrot.length == counter) {
    wonBox.style.display = "block";
    timeLeft = 0;
    deactivateBugsCarrots();
  }
}

function carrotFind() {
  carrot.forEach((array) => {
    array.addEventListener("click", (event) => {
      event.target.style.display = "none";
    });
  });
}

lostReplay.addEventListener("click", () => {
  lostBox.style.display = "none";
  counterBtn.innerHTML = 0;
  carrotCounter();
  carrotFind();
  timeLeft = 5;
  clearInterval(timer);
  timerStart();
  removeCarrot();
  removeBug();
  console.log('removeBug 다음줄');
  randomPosition();
  activateBugsCarrots();
});

wonReplay.addEventListener("click", () => {
  wonBox.style.display = "none";
  counterBtn.innerHTML = 0;
  carrotCounter();
  carrotFind();
  timeLeft = 5;
  clearInterval(timer);
  timerStart();
  removeCarrot();
  removeBug();
  randomPosition();
  activateBugsCarrots();
});

originReplay.addEventListener("click", () => {
  replayBox.style.display = "none";
  counterBtn.innerHTML = 0;
  carrotCounter();
  carrotFind();
  timeLeft = 5;
  clearInterval(timer);
  timerStart();
  removeCarrot();
  removeBug();
  randomPosition();
  activateBugsCarrots();
});
