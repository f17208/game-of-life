import { FC } from 'react';

import { MAX_CELL_SIZE, MIN_CELL_SIZE, STEP_CELL_SIZE } from '../../utils/constants';
import { Input } from '../common/input/Input';

import { ReactComponent as ZoomIcon } from '../assets/zoom.svg';
import { SaveBoard } from '../save-board/SaveBoard';
import { CellStatus } from '../cell/Cell';

export type BoardToolBarProps = {
  cells: CellStatus[][];
  cellSize: number;
  onChangeCellSize?: (cellSize: number) => void;
  generationCount?: number;
};

export const BoardToolBar: FC<BoardToolBarProps> = ({
  cells,
  cellSize,
  onChangeCellSize,
  generationCount,
}) => {
  return (
    <div className="flex items-center justify-between pt-2">
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
        <div className="flex space-x-2 items-center">
          <SaveBoard cells={cells} generationCount={generationCount} />
        </div>
      )}
    </div>
  );
};
