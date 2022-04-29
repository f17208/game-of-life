import { CellStatus } from '../components/cell/Cell';

export function loadFromFileContent(content: string) {
  const lines = content.split('\n');

  const [
    generationLine,
    dimensionsLine,
    ...cellsLines
  ] = lines;

  const generation = +generationLine.split(' ')[1].replace(':', ''); // TODO use regex
  const [rowsCount, columnsCount] = dimensionsLine.split(' ').map(x => +x);

  if (cellsLines.length !== rowsCount) {
    throw new Error('Invalid rows count in configuration');
  }

  const cells = cellsLines.map(line => {
    const splittedLine = line.split(' ');
    if (splittedLine.length !== columnsCount) {
      throw new Error('Invalid columns count in configuration');
    }
    return splittedLine.map(char => {
      if (char === '*') {
        return CellStatus.alive;
      } if (char === '.') {
        return CellStatus.dead;
      }
      throw new Error('Invalid symbol');
    });
  });

  const configuration = {
    dimensions: {
      rowsCount,
      columnsCount,
    },
    generation,
    cells,
  };

  return configuration;
}
