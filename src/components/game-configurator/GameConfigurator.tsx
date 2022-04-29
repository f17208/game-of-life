import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Board } from '../board/Board';
import { cellSizeSelector, GameConfig, initialStateSelector } from './GameConfigurator.slice';

export type GameConfiguratorProps = {
  onComplete: (gameConfig: GameConfig) => void;
};

export const GameConfigurator: FC<GameConfiguratorProps> = ({ onComplete }) => {
  const cellSize = useSelector(cellSizeSelector);
  const initialState = useSelector(initialStateSelector);

  return (
    <div>
      Configura partita
      {/* form dimensions ecc. */}

      <Board
        state={initialState}
        cellSize={cellSize}
        onCellClick={() => {}}
      />
    </div>
  );
};
