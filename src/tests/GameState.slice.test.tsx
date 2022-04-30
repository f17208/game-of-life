import * as path from 'path'; 
import { readFileSync } from 'fs';

import reducer, {
  nextState,
  GameConfig,
  GameStatus,
} from '../components/game-state/GameState.slice';
import { loadFromFileContent } from '../utils/load-cells-from-file';

test('should update the state correctly', () => {
  const sampleData1 = readFileSync(path.resolve(__dirname, "../data/sample-1.txt")).toString(); 
  const config1 = loadFromFileContent(sampleData1);

  const sampleData2 = readFileSync(path.resolve(__dirname, "../data/sample-2.txt")).toString();
  const config2 = loadFromFileContent(sampleData2);

  const previousState: GameConfig = {
    cells: config1.cells,
    updateEveryMs: 100,
    generationCount: config1.generation,
    autoPlay: false,
    cellSize: 1,
    status: GameStatus.paused,
  };

  const expectedState = {
    ...previousState,
    cells: config2.cells,
    generationCount: config2.generation,
  }
  
  const newState = reducer(previousState, nextState());

  expect(newState.cells).toEqual(expectedState.cells);
  expect(newState.generationCount).toEqual(expectedState.generationCount);
});

test('should detect invalid columns in configuration (1)', () => {
  const sampleData = readFileSync(path.resolve(__dirname, "../data/sample-error-1.txt")).toString();
  const expectedMessage = 'Invalid columns in configuration: expected columnsCount 17, found 16, at line number 0';

  expect(() => loadFromFileContent(sampleData))
    .toThrow(expectedMessage)
});

test('should detect invalid columns in configuration (2)', () => {
  const sampleData = readFileSync(path.resolve(__dirname, "../data/sample-error-2.txt")).toString();
  const expectedMessage = 'Invalid columns in configuration: expected columnsCount 16, found 17, at line number 1';

  expect(() => loadFromFileContent(sampleData))
    .toThrow(expectedMessage)
});

test('should detect invalid symbol in configuration', () => {
  const sampleData = readFileSync(path.resolve(__dirname, "../data/sample-error-3.txt")).toString();
  const expectedMessage = 'Invalid symbol in configuration: expected "*", "." or " ", found "A", at line number 4, position 8';

  expect(() => loadFromFileContent(sampleData))
    .toThrow(expectedMessage)
});

test('should detect invalid generation in configuration', () => {
  const sampleData = readFileSync(path.resolve(__dirname, "../data/sample-error-4.txt")).toString();
  const expectedMessage = 'Invalid generation in configuration';

  expect(() => loadFromFileContent(sampleData))
    .toThrow(expectedMessage)
});