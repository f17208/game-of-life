import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GameConfigurator } from './components/game-configurator/GameConfigurator';
import { GameRunner } from './components/game-runner/GameRunner';
import {
  areCellsConfiguredSelector,
  cellSizeSelector,
  cellsSelector,
  GameStatus,
  generationCountSelector,
  setIntoCell,
  statusSelector,
} from './components/game-state/GameState.slice';
import { Board } from './components/board/Board';

import './App.css';
import { CellPosition, CellStatus } from './components/cell/Cell';

function App() {
  const dispatch = useDispatch();

  const gameStatus = useSelector(statusSelector);
  const cellSize = useSelector(cellSizeSelector);
  const cells = useSelector(cellsSelector);
  const generationCount = useSelector(generationCountSelector);
  const areCellsConfigured = useSelector(areCellsConfiguredSelector);

  const onClickCell = useCallback((position: CellPosition, status: CellStatus) => {
    dispatch(setIntoCell({ position, status }));
  }, [dispatch]);

  return (
    <div className="App-container">
      <div className="App-controls">
        {
          gameStatus === GameStatus.stopped
            ? <GameConfigurator />
            : <GameRunner />
        }
      </div>
      {areCellsConfigured && (
        <div className="App-board">
          <Board
            cells={cells}
            cellSize={cellSize}
            onClickCell={onClickCell}
          />
        </div>
      )}
      {generationCount > 0 && (
        <div className="App-footer">
          generation #{generationCount}
        </div>
      )}
    </div>
  );
}

export default App;
