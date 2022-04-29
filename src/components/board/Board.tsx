import { FC } from 'react';
import { Cell, CellPosition, CellStatus } from '../cell/Cell';

export type BoardDimensions = {
  x: number;
  y: number;
}

export type BoardProps = {
  state: CellStatus[][];
  cellSize: number;
  onCellClick: (position: CellPosition, state: CellStatus) => void;
};

export const Board: FC<BoardProps> = ({ state, cellSize, onCellClick }) => {
  return (
    <div>
      {
        state.map((row, x) => {
          return row.map((CellStatus, y) => {
            return <Cell
              size={cellSize}
              position={{ x, y }}
              state={CellStatus}
              onClick={onCellClick}
            />;
          });
        })
      }
    </div>
  );
};
