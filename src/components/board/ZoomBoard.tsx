import { FC } from 'react';

import { MAX_CELL_SIZE, MIN_CELL_SIZE, STEP_CELL_SIZE } from '../../utils/constants';
import { ZoomIcon } from '../common/icons';
import { Input } from '../common/input/Input';

export type ZoomBoardProps = {
  cellSize: number;
  onChangeCellSize?: (cellSize: number) => void;
};

export const ZoomBoard: FC<ZoomBoardProps> = ({
  cellSize,
  onChangeCellSize,
}) => {
  return (
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
  );
};
