const { expect } = require('chai');

// Business rules
// 1. Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
// 2. Any live cell with more than three live neighbours dies, as if by overcrowding.
// 3. Any live cell with two or three live neighbours lives on to the next generation.
// 4. Any dead cell with exactly three live neighbours becomes a live cell.

// Implementation constraints
// - grid is 2-dimensional
// - grid size is 9*9
//
// TODO:
// - return cell neighbors
// - handle edge cases
// - apply generation rule to a cell (keep it alive, kill it or make it live again)
// - count alive cells from a cell list

function calculateNextGeneration(cellMatrix) {
  const newCellMatrix = [...cellMatrix];

  for(let i = 0; i < cellMatrix.length; i++) {
    for (let j = 0; j < cellMatrix[i].length; j++) {
      const cell = cellMatrix[i][j];
      const aliveNeighbours = countAliveNeighbours(cellMatrix, i, j);

      if (cell === '*' && aliveNeighbours < 2) {
        newCellMatrix[i][j] = '.';
      }

      if (cell === '*' && aliveNeighbours > 3) {
        newCellMatrix[i][j] = '.';
      }

      // if (cell === '.' && aliveNeighbours === 3) {
      //   newCellMatrix[i][j] = '*';
      // }
    }
  }

  console.table(newCellMatrix);
  return newCellMatrix;
}

function countAliveCells(cells) {
  const reducer = (previousValue, currentValue) =>
    currentValue === '*' ? previousValue + 1 : previousValue;
  return cells.reduce(reducer, 0);
}

function countAliveNeighbours(cellMatrix, i, j) {
  const topLeft = getStatus(cellMatrix, i-1, j-1);
  const top = getStatus(cellMatrix, i-1, j)
  const topRight = getStatus(cellMatrix, i-1, j+1);
  const right = getStatus(cellMatrix, i, j+1);
  const bottomRight = getStatus(cellMatrix, i+1, j+1);
  const bottom = getStatus(cellMatrix, i+1, j);
  const bottomLeft = getStatus(cellMatrix, i+1, j-1);
  const left = getStatus(cellMatrix, i, j-1);
  const cells = [ topLeft, top, topRight, right, bottomRight, bottom, bottomLeft, left ];

  return countAliveCells(cells);
}

function getStatus(cellMatrix, i, j) {
  if (i < 0 || j < 0) {
    return '.'
  }

  if (i >= cellMatrix.length) {
    return '.'
  }

  if (j >= cellMatrix[0].length) {
    return '.'
  }

  return cellMatrix[i][j];
}

describe('game of life', function () {

  describe('#next', function() {
    it('verifies rule 1', function() {
      // given
      const cellMatrix = [
        ['.', '.', '.'],
        ['.', '*', '.'],
        ['.', '.', '.'],
      ];

      // when
      const nextGeneration = calculateNextGeneration(cellMatrix);

      // then
      expect(nextGeneration).to.deep.equal([
        ['.', '.', '.'],
        ['.', '.', '.'],
        ['.', '.', '.'],
      ]);
    });

    // 2. Any live cell with more than three live neighbours dies, as if by overcrowding.
    it('verifies rule 2', function() {
      // given
      const cellMatrix = [
        ['.', '*', '.'],
        ['*', '*', '*'],
        ['.', '*', '.'],
      ];

      // when
      const nextGeneration = calculateNextGeneration(cellMatrix);

      // then
      expect(nextGeneration).to.deep.equal([
        ['.', '*', '.'],
        ['*', '.', '*'],
        ['.', '*', '.'],
      ]);
    });

    it('verifies rule 3', function() {
      // given
      const cellMatrix = [
        ['.', '*', '.'],
        ['.', '*', '*'],
        ['.', '*', '.'],
      ];

      // when
      const nextGeneration = calculateNextGeneration(cellMatrix);

      // then
      expect(nextGeneration).to.deep.equal([
        ['.', '*', '.'],
        ['.', '*', '*'],
        ['.', '*', '.'],
      ]);
    });

    // it('verifies rule 4', function() {
    //   // given
    //   const cellMatrix = [
    //     ['.', '*', '.'],
    //     ['.', '.', '*'],
    //     ['.', '*', '.'],
    //   ];
    //
    //   // when
    //   const nextGeneration = calculateNextGeneration(cellMatrix);
    //
    //   // then
    //   expect(nextGeneration).to.deep.equal([
    //     ['.', '*', '.'],
    //     ['.', '*', '*'],
    //     ['.', '*', '.'],
    //   ]);
    // });
  });

  describe('#countAliveCells', function() {

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

    it('should return 0 for top left corner', () => {
      // given
      const cellMatrix = [
        ['.', '.', '*', '.'],
        ['.', '.', '.', '.'],
        ['*', '*', '*', '*'],
        ['.', '.', '*', '.'],
      ];

      // when
      const result = countAliveNeighbours(cellMatrix, 0, 0);

      // then
      expect(result).to.equal(0);
    });

    it('should return 1 for top right corner', () => {
      // given
      const cellMatrix = [
        ['.', '.', '*', '.'],
        ['.', '.', '.', '.'],
        ['*', '*', '*', '*'],
        ['.', '.', '*', '.'],
      ];

      // when
      const result = countAliveNeighbours(cellMatrix, 0, 3);

      // then
      expect(result).to.equal(1);
    });

    it('should return 2 for bottom left corner', () => {
      // given
      const cellMatrix = [
        ['.', '.', '*', '.'],
        ['.', '.', '.', '.'],
        ['*', '*', '*', '*'],
        ['.', '.', '*', '.'],
      ];

      // when
      const result = countAliveNeighbours(cellMatrix, 3, 0);

      // then
      expect(result).to.equal(2);
    });

    it('should return 3 for bottom right corner', () => {
      // given
      const cellMatrix = [
        ['.', '.', '*', '.'],
        ['.', '.', '.', '.'],
        ['*', '*', '*', '*'],
        ['.', '.', '*', '.'],
      ];

      // when
      const result = countAliveNeighbours(cellMatrix, 3, 3);

      // then
      expect(result).to.equal(3);
    });

    it('should return 0 for matrix center', () => {
      // given
      const cellMatrix = [
        ['*', '*', '*', '*', '*'],
        ['*', '.', '.', '.', '*'],
        ['*', '.', '.', '.', '*'],
        ['*', '.', '.', '.', '*'],
        ['*', '*', '*', '*', '*'],
      ];

      // when
      const result = countAliveNeighbours(cellMatrix, 2, 2);

      // then
      expect(result).to.equal(0);
    });

    it('should return 1 top', () => {
      // given
      const cellMatrix = [
        ['.', '*', '.'],
        ['.', '.', '*'],
        ['.', '*', '.'],
      ];

      // when
      const result = countAliveNeighbours(cellMatrix, 0, 1);

      // then
      expect(result).to.equal(1);
    });
  });
});
