import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import { Cell, CellPosition, CellStatus } from '../cell/Cell';
import { IconButton } from '../common/button/IconButton';

import { MAX_CELL_SIZE, MIN_CELL_SIZE, STEP_CELL_SIZE } from '../../utils/constants';
import { Input } from '../common/input/Input';

import { ReactComponent as ClearIcon } from '../assets/clear.svg';
import { ReactComponent as ZoomIcon } from '../assets/zoom.svg';
import { SaveBoard } from '../common/save-board/SaveBoard';

export type BoardDimensions = {
  x: number;
  y: number;
};

export type BoardProps = {
  cells: CellStatus[][];
  cellSize: number;
  onChangeCellSize?: (cellSize: number) => void;
  onClickCell: (position: CellPosition, status: CellStatus) => void;
  containerProps?: Partial<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
  generationCount?: number;
  onResetGenerations?: () => void;
};

export const Board: FC<BoardProps> = ({
  cells,
  cellSize,
  onChangeCellSize,
  onClickCell,
  containerProps,
  generationCount,
  onResetGenerations,
}) => {
  return (
    <div>
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

      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center space-x-1">
          {onChangeCellSize && <>
            <ZoomIcon className="h-6 fill-primary" />
            <Input
              type="range"
              className="accent-primary"
              min={MIN_CELL_SIZE}
              max={MAX_CELL_SIZE}
              step={STEP_CELL_SIZE}
              value={cellSize}
              onChange={e => onChangeCellSize(+e.target.value)}
            />
          </>}
        </div>

        {generationCount !== undefined && (
          <div className="flex space-x-2 items-center pt-1">
            <span>
              Gen #{generationCount}&nbsp;
            </span>
            {onResetGenerations && (
              <IconButton disabled={!generationCount} onClick={onResetGenerations}>
                <ClearIcon className="h-4 fill-white" />
              </IconButton>
            )}
            <SaveBoard cells={cells} generationCount={generationCount} />
          </div>
        )}
      </div>

    </div>
  );
};
