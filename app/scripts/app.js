import shuffle from './shuffle';
import styles from '../styles/app.scss'

const hexagons = Array.from(document.querySelectorAll('.c-puzzle__hexagon'));
const preventDefault = (event) => event.preventDefault();


const dropPiece = (event) => {
  event.preventDefault();
  const currentTarget = event.currentTarget;

  if (currentTarget.getAttribute('data-empty') === 'true') {
    currentTarget.appendChild(document.getElementById(event.dataTransfer.getData("text/plain")));
    currentTarget.setAttribute('data-empty', 'false');
  }
};

hexagons.forEach((hexagon) => {
  hexagon.addEventListener('drop', dropPiece);
  hexagon.addEventListener('dragover', preventDefault);
  hexagon.addEventListener('dragstart', pickImage);
});


const piecesContainer = document.querySelector('.c-pieces');
const shufflePieces = () => shuffle(piecesContainer);

document.getElementById('shuffle').addEventListener('click', shufflePieces);

const pieces = Array.from(document.querySelectorAll('.c-pieces__piece'));

const pickImage = (ev) => {
  ev.dataTransfer.setData("text/plain", ev.target.id);
  ev.dataTransfer.dropEffect = "copy";
};

const dragAndDropPiecesHandlers = (piece) => {
  piece.addEventListener('dragstart', pickImage);
};

pieces.forEach(dragAndDropPiecesHandlers);


// https://webpack.github.io/docs/hot-module-replacement.html
if (module.hot) {
  module.hot.accept();
}
