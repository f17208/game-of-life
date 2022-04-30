import { ChangeEvent, FC, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  GameStatus,
  setGenerationCount,
  setStatus,
  cellSizeSelector,
  setCellSize,
  setDimensions,
  setCells,
  setUpdateEveryMs,
  updateEveryMsSelector,
  areCellsConfiguredSelector,
  dimensionsSelector,
} from '../game-state/GameState.slice';

import {
  STEP_UPDATE_EVERY_MS,
  MAX_UPDATE_EVERY_MS,
  MIN_UPDATE_EVERY_MS,
  STEP_CELL_SIZE,
  MIN_CELL_SIZE,
  MAX_CELL_SIZE,
  MIN_ROWS_COUNT,
  MIN_COLUMNS_COUNT,
} from '../../utils/constants';

import { loadFromFileContent } from '../../utils/load-cells-from-file';
import { Button } from '../common/button/Button';
import { FileInput } from '../common/file-input/FileInput';

type UpdateDimensionsProps = {
  rows?: number;
  columns?: number;
};

export const GameConfigurator: FC = () => {
  const dispatch = useDispatch();

  const cellSize = useSelector(cellSizeSelector);
  const updateEveryMs = useSelector(updateEveryMsSelector);
  const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(true);

  const { rowsCount, columnsCount } = useSelector(dimensionsSelector);

  // can start game if has any cells
  const canStartGame = useSelector(areCellsConfiguredSelector);

  const onFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const files = e?.target?.files;
    if (files && files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        const { result } = reader;
        if (result) {
          try {
            const configuration = loadFromFileContent(result.toString()); // TODO handle arraybuffer
            dispatch(setDimensions(configuration.dimensions));
            dispatch(setCells(configuration.cells));
            dispatch(setGenerationCount(configuration.generation));
          } catch (e) {
            console.error(e);
            alert((e as Error).message);
          }
        } else {
          // eslint-disable-next-line
          alert('Error: cannot read file'); // ... TODO improve this
        }
      };
    }
  }, [dispatch]);

  const onStartGame = useCallback(() => {
    const nextStatus = isAutoplayEnabled
      ? GameStatus.playing
      : GameStatus.paused;
    dispatch(setStatus(nextStatus));
  }, [dispatch, isAutoplayEnabled]);

  const updateDimensions = useCallback(({ rows, columns }: UpdateDimensionsProps) => {
    dispatch(
      setDimensions({
        rowsCount: rows === undefined ? rowsCount : rows,
        columnsCount: columns === undefined ? columnsCount : columns,
      }),
    );
  }, [dispatch, rowsCount, columnsCount]);

  return (
    <div>
      <h4>Configure game</h4>
      <div>
        <div className="flex items-center">
          Load configuration from file:&nbsp;
          <FileInput
            onChange={onFileChange}
            max={1}
            accept=".txt"
          />
        </div>
        <div>
          Rows (min {MIN_ROWS_COUNT}):&nbsp;
          <input
            type="number"
            value={rowsCount}
            min={MIN_ROWS_COUNT}
            onChange={e => updateDimensions({ rows: +e.target.value })}
          />
        </div>
        <div>
          Columns (min {MIN_COLUMNS_COUNT}):&nbsp;
          <input
            type="number"
            disabled={rowsCount === 0}
            value={columnsCount}
            min={MIN_COLUMNS_COUNT}
            onChange={e => updateDimensions({ columns: +e.target.value })}
          />
        </div>
        <div>
          update every {updateEveryMs / 1000} seconds:
          <div>
            <input
              type="range"
              className="accent-primary"
              disabled={!canStartGame}
              min={MIN_UPDATE_EVERY_MS}
              max={MAX_UPDATE_EVERY_MS}
              step={STEP_UPDATE_EVERY_MS}
              value={updateEveryMs}
              onChange={e => dispatch(setUpdateEveryMs(+e.target.value))}
            />
          </div>
        </div>
        <div>
          cell size: {cellSize}px
          <div>
            <input
              type="range"
              className="accent-primary"
              disabled={!canStartGame}
              min={MIN_CELL_SIZE}
              max={MAX_CELL_SIZE}
              step={STEP_CELL_SIZE}
              value={cellSize}
              onChange={e => dispatch(setCellSize(+e.target.value))}
            />
          </div>
        </div>
        <div>
          autoplay:&nbsp;
          <input
            type="checkbox"
            checked={isAutoplayEnabled}
            onChange={() => setIsAutoplayEnabled(autoplay => !autoplay)}
          />
        </div>

        {canStartGame && (
          <div>
            <Button onClick={onStartGame}>
              Start game!
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
