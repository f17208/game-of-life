import { FC, useMemo } from 'react';

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
      className={[
        'border border-grey-500',
        state === CellStatus.alive ? 'bg-primary' : '',
      ].join(' ')}
      type="button"
      onClick={() => onClick(position, oppositeState)}
      style={{
        width: size,
        height: size,
      }}
    />
  );
};
