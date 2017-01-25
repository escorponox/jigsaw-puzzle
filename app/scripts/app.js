import shuffle from './shuffle';
import styles from '../styles/app.scss'

//DOM caching
const hexagons = Array.from(document.querySelectorAll('.c-puzzle__hexagon'));
const piecesContainer = document.querySelector('.c-pieces');
const pieces = Array.from(document.querySelectorAll('.c-pieces__piece'));
const start = document.getElementById('start');
const hint = document.getElementById('hint');
const reset = document.getElementById('reset');
const hardMode = document.getElementById('hard-mode');
const solved = document.getElementById('solved');
const unsolved = document.getElementById('unsolved');

const checkResolved = () => {
  const resolved = hexagons.every(hexagon => {
    return hexagon.firstElementChild && (hexagon.firstElementChild.getAttribute('data-piece') === hexagon.getAttribute('data-piece'))
  });
  if (resolved) {
    hexagons.forEach( hexagon => {
      hexagon.classList.add('finished');
    })
  }
};

const dragOver = (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "copy";
};

const dropPiece = (event) => {
  event.preventDefault();
  const destination = event.currentTarget;
  const dataEmpty = destination.getAttribute('data-empty');

  if (dataEmpty) {
    destination.appendChild(document.getElementById(event.dataTransfer.getData("text/plain")));
    if (dataEmpty === 'true') {
      destination.setAttribute('data-empty', '');
      checkResolved();
    }
    const origin = event.dataTransfer.getData("origin");
    if (origin) {
      document.getElementById(origin).setAttribute('data-empty', 'true');
    }
  }
};

hexagons.forEach((hexagon) => {
  hexagon.addEventListener('drop', dropPiece);
  hexagon.addEventListener('dragover', dragOver);
  hexagon.addEventListener('dragstart', pickImage);
});

piecesContainer.addEventListener('drop', dropPiece);
piecesContainer.addEventListener('dragover', dragOver);

const showHint = () => solved.classList.add('show');
const hideHint = () => solved.classList.remove('show');

const startGame = (event) => {
  shuffle(piecesContainer);
  event.target.disabled = true;
  if (!hardMode.checked) {
    hint.disabled = false;
    hint.addEventListener('mousedown', showHint);
    hint.addEventListener('mouseup', hideHint);
  }
  reset.disabled = false;
  hardMode.disabled = true;
  piecesContainer.classList.add('show');
  hideHint();
  unsolved.classList.add('show');
};

document.getElementById('start').addEventListener('click', startGame);

const pickImage = (event) => {
  event.dataTransfer.setData("text/plain", event.target.id);
  event.dataTransfer.dropEffect = "copy";
  if (event.target.parentNode.classList.contains('c-puzzle__hexagon')) {
    event.dataTransfer.setData("origin", event.target.parentNode.id);
  }
};

const dragAndDropPiecesHandlers = (piece) => {
  piece.addEventListener('dragstart', pickImage);
};

pieces.forEach(dragAndDropPiecesHandlers);


// https://webpack.github.io/docs/hot-module-replacement.html
if (module.hot) {
  module.hot.accept();
}
