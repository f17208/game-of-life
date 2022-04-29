import { FC } from 'react';

export enum CellState {
  alive = 'alive',
  dead = 'dead',
}

export type CellPosition = {
  x: number;
  y: number;
}

export type CellProps = {
  position: CellPosition;
  state: CellState;
};

export const Cell: FC<CellProps> = ({ position, state }) => {
  return (
    <div>
      ({position.x}, {position.y})
    </div>
  );
};
