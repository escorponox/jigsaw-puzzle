import shuffle from './shuffle';
import {dragOver, dropPiece, pickImage} from './drag-and-drop';
import styles from '../styles/app.scss'

//DOM caching
const hexagons = Array.from(document.querySelectorAll('.c-puzzle__hexagon'));
const piecesContainer = document.querySelector('.c-pieces');
const pieces = Array.from(document.querySelectorAll('.c-pieces__piece'));
const start = document.getElementById('start');
const hint = document.getElementById('hint');
const reset = document.getElementById('reset');
const hardMode = document.getElementById('hard-mode');
const timer = document.getElementById('timer');
const solved = document.getElementById('solved');
const unsolved = document.getElementById('unsolved');
const startSound = document.getElementById('start-audio');
const failSound = document.getElementById('fail-audio');
const winSound = document.getElementById('win-audio');
const resetSound = document.getElementById('reset-audio');

let remainingTime = 300;
let timerIntervalID;
let remainingHints = 3;

const updateTimer = time => {
  time > 60 ? timer.classList.remove('alert') : timer.classList.add('alert');
  timer.innerHTML = `${~~(time / 60)}:${time % 60 < 10 ? '0' : ''}${time % 60}`;
};

const updateHints = times => hint.innerHTML = `Hint${times ? ` (${times})` : ''}`;

const resetGame = () => {
  unsolved.classList.remove('show');
  piecesContainer.classList.remove('show');
  hexagons.forEach(hexagon => hexagon.classList.remove('finished'));
  pieces.forEach(piece => piecesContainer.appendChild(piece));
  remainingTime = hardMode.checked ? 180 : 300;
  remainingHints = hardMode.checked ? 0 : 3;
  updateHints(remainingHints);
  start.disabled = false;
  hint.disabled = true;
  reset.disabled = true;
  hardMode.disabled = false;
  solved.classList.add('show');
  clearInterval(timerIntervalID);
  updateTimer(remainingTime);
};

const failed = () => {
  failSound.play();
  resetGame();
};

const resetButton = () => {
  resetSound.play();
  resetGame();
};

const win = () => {
  winSound.play();
  hexagons.forEach(hexagon => hexagon.classList.add('finished'));
  clearInterval(timerIntervalID);
};

const timerInterval = () => remainingTime > 0 ? updateTimer(--remainingTime) : failed();


const checkResolved = () => {
  const resolved = hexagons.every(hexagon => {
    return hexagon.firstElementChild && (hexagon.firstElementChild.getAttribute('data-piece') === hexagon.getAttribute('data-piece'))
  });
  if (resolved) {
    win();
  }
};

const dropAndCheck = (event) => {
  dropPiece(event);
  checkResolved();
};

const showHint = () => {
  solved.classList.add('show');
  updateHints(--remainingHints);
  window.addEventListener('mouseup', hideHint);
};

const hideHint = () => {
  solved.classList.remove('show');
  if(!remainingHints) {
    hint.disabled = true;
  }
  window.removeEventListener('mouseup', hideHint);
};

const startGame = (event) => {
  startSound.play();
  shuffle(piecesContainer);
  start.disabled = true;
  if (!hardMode.checked) {
    hint.disabled = false;
  }
  reset.disabled = false;
  hardMode.disabled = true;
  piecesContainer.classList.add('show');
  solved.classList.remove('show');
  unsolved.classList.add('show');
  timerIntervalID = setInterval(timerInterval, 1000);
};

const toggleHardMode = (event) => {
  remainingTime = event.target.checked ? 180 : 300;
  remainingHints = event.target.checked ? 0 : 3;
  updateTimer(remainingTime);
  updateHints(remainingHints);
};

hexagons.forEach((hexagon) => {
  hexagon.addEventListener('drop', dropAndCheck);
  hexagon.addEventListener('dragover', dragOver);
  hexagon.addEventListener('dragstart', pickImage);
});

piecesContainer.addEventListener('drop', dropPiece);
piecesContainer.addEventListener('dragover', dragOver);

pieces.forEach((piece) => piece.addEventListener('dragstart', pickImage));

start.addEventListener('click', startGame);
reset.addEventListener('click', resetButton);
hint.addEventListener('mousedown', showHint);
hardMode.addEventListener('change', toggleHardMode);

// https://webpack.github.io/docs/hot-module-replacement.html
if (module.hot) {
  module.hot.accept();
}
