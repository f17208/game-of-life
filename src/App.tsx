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
  setGenerationCount,
  setIntoCell,
  statusSelector,
} from './components/game-state/GameState.slice';
import { Board } from './components/board/Board';

import { CellPosition, CellStatus } from './components/cell/Cell';
import { H4 } from './components/common/headings/h1';

function App() {
  const dispatch = useDispatch();

  const gameStatus = useSelector(statusSelector);
  const cellSize = useSelector(cellSizeSelector);
  const cells = useSelector(cellsSelector);
  const generationCount = useSelector(generationCountSelector);
  const areCellsConfigured = useSelector(areCellsConfiguredSelector);

  const onResetGenerations = useCallback(() => {
    dispatch(setGenerationCount(0));
  }, [dispatch]);

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
          <Board
            cells={cells}
            cellSize={cellSize}
            onClickCell={onClickCell}
            containerProps={{
              style: {
                maxHeight: gameStatus === GameStatus.stopped
                  ? '55vh'
                  : '75vh',
              },
            }}
            generationCount={generationCount}
            onResetGenerations={onResetGenerations}
          />
        )}
      </div>
    </div>
  );
}

export default App;
