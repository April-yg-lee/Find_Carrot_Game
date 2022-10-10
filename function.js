"use strict";

/**
 * 1. When user click play btn,
 *  1) bugs and carrots appear randomly.
 *    a) appear first // 
 *    b) positions Randomly
 *  2) Timer start from 10 to 0. //
 *    a) when it's 0, show 'you lost' box. //
 *  3) When I click bug, counter will be increased.
 *    a) when I click every bugs in 10 secs, show 'you won' box
 *
 * 2. When I click 'stop' btn,
 *  1) show 'replay' btn
 *  2) Stop the timer
 *
 * 3. When I click 'replay' btn,
 *  1) Game starts like #1
 */

const playBtn = document.querySelector(".playBtn");
const replayBox = document.querySelector(".replaySection");
const lostBox = document.querySelector(".lostSection");
const wonBox = document.querySelector(".wonSection");
const bugSection = document.querySelector(".bugSection");
let timer = document.querySelector(".timer");
let originReplay = document.querySelector('.originReplay');
let lostReplay = document.querySelector('.lostReplay');
let wonReplay = document.querySelector('.wonReplay');
let bug = document.querySelectorAll('.bugImg');
let carrot = document.querySelectorAll('.carrImg');


let timeLeft = 5;

playBtn.addEventListener("click", () => {
  bugSection.style.display = "block";
  start();
});


function gameOver() {
  lostBox.style.display = "block";
}

function updateTimer() {
  timeLeft = timeLeft - 1;
  if (timeLeft >= 0) {
    document.querySelector(".timer").innerHTML = `0:${timeLeft}`;
  } else {
    gameOver();
  }
}

function start() {
  timer = setInterval(updateTimer, 1000);
  updateTimer();
  lostBox.style.display = 'none';
}

lostReplay.addEventListener('click', ()=> {
  timeLeft = 5;
  start();
})

// bug.addEventListener('click',(event)=> {
//   console.log(event.target);
// })

carrot.forEach((array) => {
  array.addEventListener('click', (event)=> {
    // console.log(event.target);
    // event.target.style.backgroundColor = 'yellow';
    event.target.style.display = 'none';
    
    if (timeLeft > 0 && !bugSection.contains(array)) {
      console.log('hello');
      wonBox.style.display = "block";
    } 
  })
})


