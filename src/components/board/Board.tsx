import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import { omit } from 'lodash';

import { Cell, CellPosition, CellStatus } from '../cell/Cell';

export type BoardProps = {
  cells: CellStatus[][];
  cellSize: number;
  onClickCell: (position: CellPosition, status: CellStatus) => void;
  containerProps?: Partial<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
};

export const Board: FC<BoardProps> = ({
  cells,
  cellSize,
  onClickCell,
  containerProps,
}) => {
  return (
    <div
      className={`overflow-x-auto whitespace-nowrap ${containerProps?.className || ''}`}
      {...omit(containerProps, 'className')}
    >
      <div className="innerContainer">
        {
          cells.map((row, x) => {
            return <div
              key={`row-${x}`}
              style={{ height: cellSize }}
            >
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
    </div>
  );
};
