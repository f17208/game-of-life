import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import { Cell, CellPosition, CellStatus } from '../cell/Cell';
import { IconButton } from '../common/button/IconButton';

import { ReactComponent as ClearIcon } from '../assets/clear.svg';

export type BoardDimensions = {
  x: number;
  y: number;
}

export type BoardProps = {
  cells: CellStatus[][];
  cellSize: number;
  onClickCell: (position: CellPosition, status: CellStatus) => void;
  containerProps?: Partial<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
  generationCount?: number;
  onResetGenerations?: () => void;
};

export const Board: FC<BoardProps> = ({
  cells,
  cellSize,
  onClickCell,
  containerProps,
  generationCount,
  onResetGenerations,
}) => {
  return (
    <div className="h-full">
      <div
        className="
          flex justify-center
          bg-slate-100
          border-2 border-primary
          rounded-lg
          overflow-hidden
        "
      >
        <div
          className="overflow-x-auto whitespace-nowrap h-full"
          {...containerProps}
        >
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
      {generationCount !== undefined && (
        <div className="flex space-x-2 items-center justify-end pt-1">
          <span>
            Generation #{generationCount}&nbsp;
          </span>
          {onResetGenerations && (
            <IconButton onClick={onResetGenerations}>
              <ClearIcon className="h-4 fill-white" />
            </IconButton>
          )}
        </div>
      )}
    </div>
  );
};
