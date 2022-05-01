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
  reset,
  setCellSize,
  setIntoCell,
  statusSelector,
} from './components/game-state/GameState.slice';
import { Board } from './components/board/Board';

import './App.css';

import { CellPosition, CellStatus } from './components/cell/Cell';
import { Typography } from './components/common/typography/Typography';
import { ZoomBoard } from './components/board/ZoomBoard';
import { Button } from './components/common/button/Button';
import { SaveBoard } from './components/save-board/SaveBoard';
import { ClearIcon } from './components/common/icons';

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

  const onConfirmReset = useCallback(() => {
    /**
     * ask for confirm before actually reset state.
     * NOTE: confirm is blocking, so we don't have to pause the game explicitly.
     */
    if (window.confirm('Are you sure you want to reset?')) {
      dispatch(reset());
    }
  }, [dispatch]);

  return (
    <div className="p-6 space-y-5 h-full">
      <div className="space-y-1">
        <div className="flex justify-center">
          <Typography variant="h3">Game of Life</Typography>
        </div>
        <div className="flex justify-center">
          {
            gameStatus === GameStatus.stopped
              ? <Typography variant="h4">Setup Board</Typography>
              : <Typography variant="h4">Generation #{generationCount}</Typography>
          }
        </div>
      </div>
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
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between pt-2 pb-4">
                <ZoomBoard
                  cellSize={cellSize}
                  onChangeCellSize={newValue => dispatch(setCellSize(newValue))}
                />

                <span className="flex space-x-2">
                  <Button
                    id="reset-button"
                    variant="error"
                    onClick={onConfirmReset}
                  >
                    <ClearIcon className="h-6 w-fit fill-white" />
                    <Typography className="hidden md:block">Reset Game</Typography>
                  </Button>

                  <SaveBoard
                    id="save-board-button"
                    cells={cells}
                    generationCount={generationCount}
                  />
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
