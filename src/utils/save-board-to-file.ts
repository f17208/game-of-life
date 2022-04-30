import { CellStatus } from '../components/cell/Cell';
import { getBoardDimensions } from './game-of-life';

export function boardToFileContent(cells: CellStatus[][], generationCount: number) {
  const generationLine = `Generation ${generationCount}:`;
  const { rowsCount, columnsCount } = getBoardDimensions(cells);
  const dimensionsLine = `${rowsCount} ${columnsCount}`;
  const cellsLines = cells.map(row => {
    return row.map(cellStatus => {
      return cellStatus === CellStatus.alive ? '*' : '.';
    }).join(' ');
  });
  return [
    generationLine,
    dimensionsLine,
    ...cellsLines,
  ].join('\n');
}
