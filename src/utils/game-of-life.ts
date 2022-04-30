import { CellStatus } from '../components/cell/Cell';

export function getBoardDimensions(cells: CellStatus[][]) {
  return {
    rowsCount: cells.length,
    columnsCount: cells.length > 0 ? cells[1].length : 0,
  };
}

export function getNeighbors(i: number, j: number, cells: CellStatus[][]) {
  const rowsCount = cells.length;
  const columnsCount = cells[0]?.length || 0;

  if (rowsCount === 0 && columnsCount === 0) return [];

  const neighborPositions = [
    [i - 1, j - 1], // top left
    [i + 1, j - 1], // bottom left
    [i - 1, j], // top
    [i + 1, j], // bottom
    [i - 1, j + 1], // top right
    [i + 1, j + 1], // bottom right
    [i, j - 1], // left
    [i, j + 1], // right
  ].filter(([x, y]) => ( // this will filter out non-existing cells
    x >= 0 && x < rowsCount && y >= 0 && y < columnsCount
  ));

  return neighborPositions.map(([x, y]) => cells[x][y]);
}

export function getNextState(cells: CellStatus[][]) {
  return cells.map((row, i) => {
    return row.map((cell, j) => {
      const neighbors = getNeighbors(i, j, cells);

      const countAliveNeighbors = neighbors
        .filter(neighbor => neighbor === CellStatus.alive)
        .length;

      if (countAliveNeighbors < 2 || countAliveNeighbors > 3) {
        return CellStatus.dead;
      }
      if (countAliveNeighbors === 3) {
        return CellStatus.alive;
      }
      return cell;
    });
  });
}

export function getBoard(rowsCount: number, columnsCount: number, values?: CellStatus[][]) {
  const toReturn: CellStatus[][] = [];

  for (let i = 0; i < rowsCount; i++) {
    if (!toReturn[i]) {
      toReturn[i] = new Array(columnsCount);
    }

    for (let j = 0; j < columnsCount; j++) {
      if (values && (i < values.length && j < values[i].length)) {
        toReturn[i][j] = values[i][j];
      } else {
        toReturn[i][j] = CellStatus.dead;
      }
    }
  }
  return toReturn;
}
