import { ChangeEvent, FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadFromFileContent } from '../../utils/load-cells-from-file';
import { Board } from '../board/Board';
import { CellPosition, CellStatus } from '../cell/Cell';
import { GameStatus, setGenerationCount, setStatus,
  cellSizeSelector,
  GameConfig,
  cellsSelector,
  setCellSize,
  setDimensions,
  setCells,
  setUpdateEveryMs,
  updateEveryMsSelector,
  setIntoCells,
} from '../common/GameState.slice';

export type GameConfiguratorProps = {
  onComplete: (gameConfig: GameConfig) => void;
};

export const GameConfigurator: FC<GameConfiguratorProps> = ({ onComplete }) => {
  const cellSize = useSelector(cellSizeSelector);
  const updateEveryMs = useSelector(updateEveryMsSelector);
  const cells = useSelector(cellsSelector);

  const dispatch = useDispatch();

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
    dispatch(setStatus(GameStatus.paused));
  }, [dispatch]);

  // can start game if has any cells
  const canStartGame = cells.flatMap(
    rows => rows.map(cell => cell),
  ).length > 0;

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

      <Board
        cells={cells}
        cellSize={cellSize}
        onClickCell={(position: CellPosition, status: CellStatus) => {
          dispatch(setIntoCells({ position, status }));
        }}
      />
    </div>
  );
};
