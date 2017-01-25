export const dragOver = (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = "copy";
};

export const dropPiece = (event) => {
  event.preventDefault();
  const destination = event.currentTarget;
  const dataEmpty = destination.getAttribute('data-empty');

  if (dataEmpty) {
    destination.appendChild(document.getElementById(event.dataTransfer.getData("text/plain")));
    if (dataEmpty === 'true') {
      destination.setAttribute('data-empty', '');
    }
    const origin = event.dataTransfer.getData("origin");
    if (origin) {
      document.getElementById(origin).setAttribute('data-empty', 'true');
    }
  }
};

export const pickImage = (event) => {
  event.dataTransfer.setData("text/plain", event.target.id);
  event.dataTransfer.dropEffect = "copy";
  if (event.target.parentNode.classList.contains('c-puzzle__hexagon')) {
    event.dataTransfer.setData("origin", event.target.parentNode.id);
  }
};
