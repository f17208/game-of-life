import { format } from 'date-fns';
import { FC } from 'react';
import { getBoardDimensions } from '../../utils/game-of-life';
import { boardToFileContent } from '../../utils/save-board-to-file';

import { CellStatus } from '../cell/Cell';
import { Button, ButtonProps } from '../common/button/Button';
import { DownloadIcon } from '../common/icons';

export interface SaveBoardProps extends Omit<ButtonProps, 'onClick'> {
  cells: CellStatus[][];
  generationCount?: number;
}

export const SaveBoard: FC<SaveBoardProps> = ({ cells, generationCount = 0, ...buttonProps }) => {
  const downloadTxtFile = () => {
    const content = boardToFileContent(cells, generationCount);
    const { rowsCount, columnsCount } = getBoardDimensions(cells);

    const today = new Date();
    const formattedDate = format(today, 'dd-MM-yyyy');

    const element = document.createElement('a');
    const file = new Blob([content], {
      type: 'text/plain',
    });
    element.href = URL.createObjectURL(file);
    element.download = `board-${rowsCount}x${columnsCount}_${formattedDate}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  return <Button onClick={downloadTxtFile} {...buttonProps}>
    <DownloadIcon className="fill-white h-6" />
    <span className="hidden md:block">Save</span>
  </Button>;
};
