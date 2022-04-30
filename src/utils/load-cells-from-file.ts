import { CellStatus } from '../components/cell/Cell';

export function loadFromFileContent(content: string) {
  const lines = content.split('\n');

  const [
    generationLine,
    dimensionsLine,
    ...cellsLines
  ] = lines;

  const generationRegExp = /Generation (.*):/;
  const generationRegExpResult = generationLine.match(generationRegExp);

  const generation = generationRegExpResult === null
    ? -1
    : +generationRegExpResult[1];

  if (generation === -1 || Number.isNaN(generation)) {
    throw new Error('Invalid generation in configuration');
  }
  const [rowsCount, columnsCount] = dimensionsLine.split(' ').map(x => +x);

  if (Number.isNaN(rowsCount) || Number.isNaN(columnsCount)) {
    throw new Error('Invalid rows/column count in configuration');
  }

  if (cellsLines.length !== rowsCount) {
    throw new Error([
      'Invalid rows in configuration:',
      `expected rowsCount ${rowsCount}, found ${cellsLines.length},`,
    ].join(' '));
  }

  const cells = cellsLines.map((line, lineIndex) => {
    const splittedLine = line.split(' ');
    if (splittedLine.length !== columnsCount) {
      throw new Error([
        'Invalid columns in configuration:',
        `expected columnsCount ${columnsCount}, found ${splittedLine.length},`,
        `at line number ${lineIndex}`,
      ].join(' '));
    }
    return splittedLine.map((char, charIndex) => {
      if (char === '*') {
        return CellStatus.alive;
      } if (char === '.') {
        return CellStatus.dead;
      }
      throw new Error([
        'Invalid symbol in configuration:',
        `expected "*", "." or " ", found "${char}",`,
        `at line number ${lineIndex}, position ${charIndex}`,
      ].join(' '));
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
