import { FC, useMemo } from 'react';
import { Cell, CellProps } from '../cell/Cell';

export type BoardDimensions = {
  x: number;
  y: number;
}

export type BoardProps = {
  dimensions: BoardDimensions;
};

export const Board: FC<BoardProps> = ({ dimensions }) => {

  const { x: sizeX, y: sizeY } = dimensions;

  const cellsConfiguration = useMemo(() => {
    const toReturn : CellProps[] = [];
    return toReturn;
  }, [sizeX, sizeY])

  return (
    <div>
      {
        cellsConfiguration.map((cell, x) => {
          return <Cell {...cell} />
        })
      }
    </div>
  );
};
