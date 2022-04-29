import { FC } from 'react';
import { Cell, CellPosition, CellStatus } from '../cell/Cell';

export type BoardDimensions = {
  x: number;
  y: number;
}

export type BoardProps = {
  cells: CellStatus[][];
  cellSize: number;
  onClickCell: (position: CellPosition, status: CellStatus) => void;
};

export const Board: FC<BoardProps> = ({ cells, cellSize, onClickCell }) => {
  return (
    <div>
      {
        cells.map((row, x) => {
          return <div key={`row-${x}`} style={{ height: cellSize }}>
            {
              row.map((cellStatus, y) => {
                return <Cell
                  key={`cell-${x}-${y}`}
                  size={cellSize}
                  position={{ x, y }}
                  state={cellStatus}
                  onClick={onClickCell}
                />;
              })
            }
          </div>;
        })
      }
    </div>
  );
};
