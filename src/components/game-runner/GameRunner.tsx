import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useInterval } from 'react-use';
import { CellPosition, CellStatus } from '../cell/Cell';
import { GameConfig } from '../game-configurator/GameConfigurator.slice';
import { GameRunnerStatus, statusSelector } from './GameRunner.slice';

export type GameRunnerProps = {
  config: GameConfig;
  onCellClick: (position: CellPosition, state: CellStatus) => void;
};

export const GameRunner: FC<GameRunnerProps> = ({ config, onCellClick }) => {
  const { dimensions, initialState, updateEveryMs } = config;
  const gameStatus = useSelector(statusSelector);
  const isPlaying = gameStatus === GameRunnerStatus.playing;

  const [cellSize, setCellSize] = useState(24);

  // board state
  // game state

  useInterval(
    () => {
      // update state
    },
    isPlaying ? updateEveryMs : null,
  );

  return (
    <div>
      ...
    </div>
  );
};
