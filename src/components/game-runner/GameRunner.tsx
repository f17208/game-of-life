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
} from '../game-configurator/GameConfigurator.slice';
import { GameRunnerStatus, statusSelector } from './GameRunner.slice';

export type GameRunnerProps = {

};

export const GameRunner: FC<GameRunnerProps> = () => {
  const gameStatus = useSelector(statusSelector);
  const cellSize = useSelector(cellSizeSelector);
  const cells = useSelector(cellsSelector);
  const updateEveryMs = useSelector(updateEveryMsSelector);
  const isPlaying = gameStatus === GameRunnerStatus.playing;

  const dispatch = useDispatch();
  // board state
  // game state

  const onClickCell = useCallback((position: CellPosition, status: CellStatus) => {
    dispatch(setIntoCells({ position, status }));
  }, [dispatch]);

  useInterval(
    () => {
      // update state
      return 1;
    },
    isPlaying ? updateEveryMs : null,
  );

  return (
    <div>
      <Board
        cellSize={cellSize}
        cells={cells}
        onClickCell={onClickCell}
      />
    </div>
  );
};
