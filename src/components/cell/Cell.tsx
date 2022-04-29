import { FC } from 'react';

export enum CellStatus {
  alive = 'alive',
  dead = 'dead',
}

export type CellPosition = {
  x: number;
  y: number;
}

export type CellProps = {
  position: CellPosition;
  size: number;
  state: CellStatus;
  onClick: (position: CellPosition, state: CellStatus) => void;
};

export const Cell: FC<CellProps> = ({ position, size, state, onClick }) => {
  return (
    <button type="button" onClick={() => onClick(position, state)}>
      ({position.x}, {position.y})
    </button>
  );
};
