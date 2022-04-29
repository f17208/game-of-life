import { ChangeEvent, FC, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadFromFileContent } from '../../utils/load-cells-from-file';
import { GameStatus, setGenerationCount, setStatus,
  cellSizeSelector,
  GameConfig,
  setCellSize,
  setDimensions,
  setCells,
  setUpdateEveryMs,
  updateEveryMsSelector,
  areCellsConfiguredSelector,
} from '../common/GameState.slice';

export const GameConfigurator: FC = () => {
  const dispatch = useDispatch();

  const cellSize = useSelector(cellSizeSelector);
  const updateEveryMs = useSelector(updateEveryMsSelector);
  const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(true);

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
          const configuration = loadFromFileContent(result.toString()); // TODO handle arraybuffer
          dispatch(setDimensions(configuration.dimensions));
          dispatch(setCells(configuration.cells));
          dispatch(setGenerationCount(configuration.generation));
        } else {
          // eslint-disable-next-line
          alert('cannot read file'); // ... TODO improve this
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

  return (
    <div>
      <h4>Configure game</h4>
      {/* form dimensions ecc. */}
      <div>
        <div>
          load configuration:&nbsp;
          <input
            type="file"
            onChange={onFileChange}
          />
        </div>
        <div>
          cell size:&nbsp;
          <input
            type="number"
            value={cellSize}
            onChange={e => dispatch(setCellSize(+e.target.value))}
          />
        </div>
        <div>
          update every (ms):&nbsp;
          <input
            type="number"
            value={updateEveryMs}
            onChange={e => dispatch(setUpdateEveryMs(+e.target.value))}
          />
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
            <button
              type="button"
              onClick={onStartGame}
            >
              Start game!
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
