const {expect} = require('chai')

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
   const reducer = (previousValue, currentValue) => currentValue === "*" ? previousValue+1 : previousValue ;
   return cells.reduce(reducer, 0);
}

describe('game of life', function() {
   it('should count alive cells from a cell list', () => {
      // given
      const cells = [".", "*", ".", "*", "*"];

      // when
      const result = countAliveCells(cells);

      // then
      expect(result).to.equal(3);
   });

   it('should count alive cell from a cell list', () => {
      // given
      const cells = [".", ".", ".", ".", "*"];

      // when
      const result = countAliveCells(cells);

      // then
      expect(result).to.equal(1);
   });
});

