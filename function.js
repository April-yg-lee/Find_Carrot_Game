"use strict";

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


const carrotSound = new Audio('./sound/carrot_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');

let timeLeft = 5;

playBtn.addEventListener("click", () => {

  playBtn.style.display = "none";
  pauseBtn.style.width = 40 + "px";
  pauseBtn.style.height = 40 + "px";
  pauseBtn.style.padding = 3 + "%";
  pauseBtn.style.fontSize = 40 + "px";

  bugSection.style.display = "block";

  timerStart();
  playSound(bgSound);

  pauseBtn.addEventListener("click", () => {
    replayBox.style.display = "block";
    lostBox.style.display = "none";
    clearInterval();
    timeLeft = 0;
    deactivateBugsCarrots();
    stopSound(bgSound);
    playSound(alertSound);

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
      playSound(bugSound);
      stopSound(bgSound);
    });
  });
});

let bug = [];
let carrot = [];

let bugs = document.createElement("img");
let bugs1 = document.createElement("img");

function createBug() {
  bugs.setAttribute("class", "bugImg");
  bugs.setAttribute("src", "./img/bug.png");
  bug.push(bugs);
  bugs1.setAttribute("class", "bugImg");
  bugs1.setAttribute("src", "./img/bug.png");
  bug.push(bugs1);
  bugSection.appendChild(bugs);
  bugSection.appendChild(bugs1);
}

let carrots;
let carrots1;

function createCarrot() {
  carrots = document.createElement("img");
  carrots1 = document.createElement("img");
  carrots.setAttribute("class", "carrImg");
  carrots.setAttribute("src", "./img/carrot.png");
  carrot.push(carrots);
  carrots1.setAttribute("class", "carrImg");
  carrots1.setAttribute("src", "./img/carrot.png");
  carrot.push(carrots1);
  bugSection.appendChild(carrots);
  bugSection.appendChild(carrots1);
}

function removeCarrot() {
  carrot = [];
  bugSection.removeChild(carrots);
  bugSection.removeChild(carrots1);
}

function removeBug() {
  bug = [];
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
    playSound(bugSound);
    stopSound(bgSound);

  }
}

function showLostBox() {
  lostBox.style.display = "block";
  deactivateBugsCarrots();
}

function timerStart() {
  timer = setInterval(updateTimer, 1000);
  updateTimer();
  lostBox.style.display = "none";
}

let CARROT_COUNT = 2;

function refreshCarrotCount() {
  CARROT_COUNT = 2;
  counterBtn.innerHTML = CARROT_COUNT;
}

function carrotCounter() {
  carrot.forEach((array) => {
    array.addEventListener("click", () => {
      counterBtn.innerHTML = CARROT_COUNT - 1;
      CARROT_COUNT--;
      checker();
    });
  });
}

function checker() {
  if (CARROT_COUNT == 0) {
    wonBox.style.display = "block";
    timeLeft = 0;
    deactivateBugsCarrots();
    playSound(winSound);
    stopSound(bgSound);
  }
}

function carrotFind() {
  carrot.forEach((array) => {
    array.addEventListener("click", (event) => {
      event.target.style.display = "none";
      playSound(carrotSound);
    });
  });
}

function gameRestart() {
  counterBtn.innerHTML = 0;
  timeLeft = 5;
  clearInterval(timer);
  timerStart();
  removeCarrot();
  removeBug();
  randomPosition();
  carrotCounter();
  carrotFind();
  activateBugsCarrots();
  playSound(bgSound);
  refreshCarrotCount();
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}

lostReplay.addEventListener("click", () => {
  lostBox.style.display = "none";
  gameRestart();

});

wonReplay.addEventListener("click", () => {
  wonBox.style.display = "none";
  gameRestart();
});

originReplay.addEventListener("click", () => {
  replayBox.style.display = "none";
  gameRestart();

});


