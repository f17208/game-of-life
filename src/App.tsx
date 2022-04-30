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
  setCellSize,
  setIntoCell,
  statusSelector,
} from './components/game-state/GameState.slice';
import { Board } from './components/board/Board';

import './App.css';

import { CellPosition, CellStatus } from './components/cell/Cell';
import { H4 } from './components/common/headings/h1';
import { BoardToolBar } from './components/board/BoardToolBar';

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
    <div className="p-6 space-y-4 h-full">
      <span className="flex justify-center">
        {
          gameStatus === GameStatus.stopped
            ? <H4>New game</H4>
            : <H4>Play game!</H4>
        }
      </span>
      <div className="container mx-auto h-full">
        <div className="max-w-md mx-auto mb-4">
          {
            gameStatus === GameStatus.stopped
              ? <GameConfigurator />
              : <GameRunner />
          }
        </div>
        {areCellsConfigured && (
          <div className="App-Board-container">
            <Board
              containerProps={{
                className: 'App-Board rounded-lg bg-slate-100 border-2 border-primary',
              }}
              cells={cells}
              cellSize={cellSize}
              onClickCell={onClickCell}
            />
            <div className="max-w-lg mx-auto">
              <BoardToolBar
                cells={cells}
                cellSize={cellSize}
                onChangeCellSize={newValue => dispatch(setCellSize(newValue))}
                generationCount={generationCount}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
