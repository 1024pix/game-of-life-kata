const { expect } = require('chai');

// Business rules
// 1. Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
// 2. Any live cell with more than three live neighbours dies, as if by overcrowding.
// 3. Any live cell with two or three live neighbours lives on to the next generation.
// 4. Any dead cell with exactly three live neighbours becomes a live cell.

// Implementation contraints
// - grid is 2-dimensional
// - grid size is 9*9
//
// TODO:
// - return cell neighbors
// - handle edge cases
// - apply generation rule to a cell (keep it alive, kill it or make it live again)
// - count alive cells from a cell list

function countAliveCells(cells) {
  const reducer = (previousValue, currentValue) =>
    currentValue === '*' ? previousValue + 1 : previousValue;
  return cells.reduce(reducer, 0);
}

function countAliveNeighbours(cellMatrix, x, y) {
  const topLeft = getStatus(cellMatrix, x-1, y-1);
  const top = getStatus(cellMatrix, x-1, y)
  const topRight = getStatus(cellMatrix, x-1, y+1);
  const right = getStatus(cellMatrix, x, y+1);
  const bottomRight = getStatus(cellMatrix, x+1, y+1);
  const bottom = getStatus(cellMatrix, x+1, y);
  const bottomLeft = getStatus(cellMatrix, x+1, y-1);
  const left = getStatus(cellMatrix, x, y-1);
  const cells = [ topLeft, top, topRight, right, bottomRight, bottom, bottomLeft, left ];

return countAliveCells(cells);
}

function getStatus(cellMatrix, x, y) {
  if (x < 0 || y < 0) {
    return '.'
  }

  if (y >= cellMatrix.length) {
    return '.'
  }

  if (x >= cellMatrix[0].length) {
    return '.'
  }

  return cellMatrix[y][x];
}

describe('game of life', function () {
  it('should count alive cells from a cell list', () => {
    // given
    const cells = ['.', '*', '.', '*', '*'];

    // when
    const result = countAliveCells(cells);

    // then
    expect(result).to.equal(3);
  });

  it('should count alive cell from a cell list', () => {
    // given
    const cells = ['.', '.', '.', '.', '*'];

    // when
    const result = countAliveCells(cells);

    // then
    expect(result).to.equal(1);
  });

  it('should count no alive cell from a cell list', () => {
    // given
    const cells = ['.', '.', '.', '.', '.'];

    // when
    const result = countAliveCells(cells);

    // then
    expect(result).to.equal(0);
  });

  describe('#countAliveNeighbours', function () {
    it('should return 8', () => {
      // given
      const cellMatrix = [
        ['*', '*', '*'],
        ['*', '.', '*'],
        ['*', '*', '*'],
      ];

      // when
      const result = countAliveNeighbours(cellMatrix, 1, 1);

      // then
      expect(result).to.equal(8);
    });

    it('should return 7 if top left cell is dead', () => {
      // given
      const cellMatrix = [
        ['.', '*', '*'],
        ['*', '.', '*'],
        ['*', '*', '*'],
      ];

      // when
      const result = countAliveNeighbours(cellMatrix, 1, 1);

      // then
      expect(result).to.equal(7);
    });

    it('should return 6 if top 2 left cells are dead', () => {
      // given
      const cellMatrix = [
        ['.', '.', '*'],
        ['*', '.', '*'],
        ['*', '*', '*'],
      ];

      // when
      const result = countAliveNeighbours(cellMatrix, 1, 1);

      // then
      expect(result).to.equal(6);
    });

    it('should return 6 if top 2 left cells are dead', () => {
      // given
      const cellMatrix = [
        ['.', '.', '*'],
        ['*', '.', '*'],
        ['*', '*', '*'],
      ];

      // when
      const result = countAliveNeighbours(cellMatrix, 0, 0);

      // then
      expect(result).to.equal(1);
    });
  });
});
