import { FC, useMemo } from 'react';

import './Cell.css';

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
  const oppositeState = useMemo(() => {
    return state === CellStatus.alive
      ? CellStatus.dead
      : CellStatus.alive;
  }, [state]);

  return (
    <button
      className="Cell"
      type="button"
      onClick={() => onClick(position, oppositeState)}
      style={{
        width: size,
        height: size,
        background: state === CellStatus.alive ? 'black' : 'white',
      }}
    />
  );
};
