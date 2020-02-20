'use strict'

startGame(10, 10, 15);

function startGame(WIDTH, HEIGHT, BOMBS) {
  const field = document.querySelector('.field');
  field.innerHTML = '<button></button>'.repeat(WIDTH * HEIGHT);
  const cells = [...field.children];
  
  const bombs = [...Array(WIDTH * HEIGHT).keys()]
    .sort(() => Math.random() - 0.5)
    .slice(0, BOMBS);

  let closedCount = WIDTH * HEIGHT;

  field.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') {
      return;
    }

    const index = cells.indexOf(e.target);
    const column = index % WIDTH;
    const row = (index - column) / WIDTH;
    open(row, column);
  });

  function isValid(row, column) {
    return row >= 0 && row < HEIGHT && column >= 0 && column < WIDTH;
  }

  function isBomb(row, column) {
    if (!isValid(row, column)) return false;

    const index = row * WIDTH + column;

    return bombs.includes(index);
  }

  function getCount(row, column) {
    let count = 0;
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        if (isBomb(row + y, column + x)) {
          count++;
        }
      }
    }
    return count;
  }

  function open(row, column) {
    if (!isValid(row, column)) return;

    const index = row * WIDTH + column;
    const cell = cells[index];

    if (cell.disabled === true) return;

    cell.disabled = true;
    cell.className = 'active';

    if (isBomb(row, column)) {
      cell.innerHTML = 'X';
      alert('You lost!');
      startGame(10, 10, BOMBS - 1);
    }

    closedCount--;

    if (closedCount <= BOMBS) {
      alert('You won!');
      startGame(10, 10, 15);
    }

    const count = getCount(row, column);

    if (count !== 0) {
      cell.innerHTML = count;
      return;
    }

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        open(row + y, column + x);
      }
    }
  }
}