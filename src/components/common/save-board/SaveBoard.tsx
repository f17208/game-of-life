import { format } from 'date-fns';
import { FC } from 'react';
import { getBoardDimensions } from '../../../utils/game-of-life';
import { boardToFileContent } from '../../../utils/save-board-to-file';

import { ReactComponent as DownloadIcon } from '../../assets/file-download.svg';
import { CellStatus } from '../../cell/Cell';
import { Button, ButtonProps } from '../button/Button';

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
    <span>Save</span>
  </Button>;
};
