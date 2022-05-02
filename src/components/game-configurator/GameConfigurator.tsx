import { ChangeEvent, FC, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  GameStatus,
  setGenerationCount,
  setStatus,
  setDimensions,
  setCells,
  setUpdateEveryMs,
  updateEveryMsSelector,
  areCellsConfiguredSelector,
  dimensionsSelector,
  generationCountSelector,
} from '../game-state/GameState.slice';

import {
  STEP_UPDATE_EVERY_MS,
  MAX_UPDATE_EVERY_MS,
  MIN_UPDATE_EVERY_MS,
  MIN_ROWS_COUNT,
  MIN_COLUMNS_COUNT,
} from '../../utils/constants';

import { loadFromFileContent } from '../../utils/load-cells-from-file';
import { Button } from '../common/button/Button';
import { FileInput } from '../common/file-input/FileInput';
import { Input } from '../common/input/Input';
import { Typography } from '../common/typography/Typography';
import { PlayIcon } from '../common/icons';

type UpdateDimensionsProps = {
  rows?: number;
  columns?: number;
};

export const GameConfigurator: FC = () => {
  const dispatch = useDispatch();
  const generationsCount = useSelector(generationCountSelector);

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
            const configuration = loadFromFileContent(result.toString());
            dispatch(setDimensions(configuration.dimensions));
            dispatch(setCells(configuration.cells));
            dispatch(setGenerationCount(configuration.generation));
          } catch (err) {
            console.error(err);
            alert((err as Error).message);
          }
        } else {
          // eslint-disable-next-line
          alert('Error: cannot read file');
        }
      };
    }
  }, [dispatch]);

  /**
   * if autoplay is enabled, it starts the game in "playing" state
   * otherwise it will be paused (this is meant for using manual next step)
   */
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
    <div className="container">
      <div className="space-y-2">
        <div className="flex items-center space-x-4 justify-between">
          <Typography>Load configuration from file</Typography>
          <FileInput
            id="upload-config-input"
            onChange={onFileChange}
            max={1}
            accept=".txt"
          />
        </div>

        <div className="flex items-center space-x-4 justify-between">
          <Typography>Board dimensions (min {MIN_ROWS_COUNT}x{MIN_COLUMNS_COUNT})</Typography>
          <span className="flex space-x-1">
            <Input
              id="configure-rows-input"
              type="number"
              value={rowsCount}
              min={MIN_ROWS_COUNT}
              onChange={e => updateDimensions({ rows: +e.target.value })}
              style={{ maxWidth: 55, textAlign: 'center' }}
            />
            <Typography>x</Typography>
            <Input
              id="configure-columns-input"
              type="number"
              disabled={!rowsCount}
              value={columnsCount}
              min={MIN_COLUMNS_COUNT}
              onChange={e => updateDimensions({ columns: +e.target.value })}
              style={{ maxWidth: 55, textAlign: 'center' }}
            />
          </span>
        </div>

        <div className="flex items-center space-x-4 justify-between">
          <Typography>Start from generation #</Typography>
          <span className="flex space-x-1">
            <Input
              id="configure-generations-input"
              type="number"
              value={generationsCount}
              min={0}
              onChange={e => dispatch(setGenerationCount(+e.target.value))}
              style={{ maxWidth: 125, textAlign: 'center' }}
            />
          </span>
        </div>

        <div className="flex items-center space-x-4 justify-between">
          <Typography>Update every:</Typography>
          <span className="flex items-center space-x-2">
            <Input
              id="configure-update-ms-input"
              type="range"
              className="accent-primary"
              disabled={!canStartGame}
              min={MIN_UPDATE_EVERY_MS}
              max={MAX_UPDATE_EVERY_MS}
              step={STEP_UPDATE_EVERY_MS}
              value={updateEveryMs}
              onChange={e => dispatch(setUpdateEveryMs(+e.target.value))}
            />
            <span>{(updateEveryMs / 1000).toFixed(1)}s</span>
          </span>
        </div>

        <div className="flex justify-between space-x-4 items-center">
          <div className="flex space-x-4 items-center">
            <Typography>Enable autoplay</Typography>
            <Input
              id="configure-autoplay-input"
              type="checkbox"
              className="accent-primary"
              checked={isAutoplayEnabled}
              onChange={() => setIsAutoplayEnabled(autoplay => !autoplay)}
            />
          </div>
          <div>
            <Button
              disabled={!canStartGame}
              onClick={onStartGame}
            >
              <PlayIcon className="h-4 w-fit fill-white" />
              <Typography>Play Game!</Typography>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
