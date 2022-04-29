import { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInterval } from 'react-use';
import { Board } from '../board/Board';
import { CellPosition, CellStatus } from '../cell/Cell';
import {
  cellSizeSelector,
  cellsSelector,
  setIntoCells,
  updateEveryMsSelector,
  GameStatus,
  statusSelector,
  nextState,
  setStatus,
  generationCountSelector,
} from '../common/GameState.slice';

export type GameRunnerProps = {};

export const GameRunner: FC<GameRunnerProps> = () => {
  const gameStatus = useSelector(statusSelector);
  const cellSize = useSelector(cellSizeSelector);
  const cells = useSelector(cellsSelector);
  const updateEveryMs = useSelector(updateEveryMsSelector);
  const generationCount = useSelector(generationCountSelector);
  const isPlaying = gameStatus === GameStatus.playing;

  const dispatch = useDispatch();

  const onNextState = useCallback(() => {
    dispatch(nextState(cells));
  }, [dispatch, cells]);

  const onClickCell = useCallback((position: CellPosition, status: CellStatus) => {
    dispatch(setIntoCells({ position, status }));
  }, [dispatch]);

  const onConfigure = useCallback(() => {
    dispatch(setStatus(GameStatus.stopped));
  }, [dispatch]);

  const onTogglePause = useCallback(() => {
    let nextStatus: GameStatus | null = null;
    switch (gameStatus) {
      case GameStatus.playing: nextStatus = GameStatus.paused; break;
      case GameStatus.paused: nextStatus = GameStatus.playing; break;
      default: break;
    }
    if (nextStatus) {
      dispatch(setStatus(nextStatus));
    }
  }, [gameStatus, dispatch]);

  useInterval(
    onNextState,
    isPlaying ? updateEveryMs : null,
  );

  return (
    <div>
      <div>
        <button
          type="button"
          onClick={onConfigure}
        >
          ← Configure
        </button>

        <button
          type="button"
          disabled={isPlaying}
          onClick={onNextState}
        >
          Next
        </button>

        <button
          type="button"
          onClick={onTogglePause}
        >
          { gameStatus === GameStatus.paused ? 'Play' : 'Pause' }
        </button>
      </div>
      <Board
        cellSize={cellSize}
        cells={cells}
        onClickCell={onClickCell}
      />
      <div>
        generation #{generationCount}
      </div>
    </div>
  );
};
