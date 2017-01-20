import R from 'ramda';

const compose = R.compose;

const getChildren = (pieceContainer) => pieceContainer.children;

const shuffleArray = (array) => [...array].sort((a, b) => 0.5 - Math.random());

const relocateInDOM = (piece) => piece.parentNode.insertBefore(piece, null);

const shufflePieces = compose(R.forEach(relocateInDOM), shuffleArray, Array.from, getChildren);

export default shufflePieces;
