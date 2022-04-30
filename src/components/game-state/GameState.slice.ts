import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app.store';
import { getBoard, getNextState } from '../../utils/game-of-life';
import { CellPosition, CellStatus } from '../cell/Cell';

import {
  DEFAULT_UPDATE_EVERY_MS,
  DEFAULT_CELL_SIZE,
  DEFAULT_ROWS_COUNT,
  DEFAULT_COLUMNS_COUNT,
} from '../../utils/constants';

export class GameStatus {
  static playing = 'playing';

  static paused = 'paused';

  static stopped = 'stopped';
}

export type GameConfig = {
  cells: CellStatus[][];
  cellSize: number;
  updateEveryMs: number; // number of milliseconds between a state update and the next
  status: GameStatus;
  generationCount: number;
  autoPlay: boolean; // automatically play after configuration
};

const initialState: GameConfig = {
  cellSize: DEFAULT_CELL_SIZE,
  updateEveryMs: DEFAULT_UPDATE_EVERY_MS,
  cells: getBoard(DEFAULT_ROWS_COUNT, DEFAULT_COLUMNS_COUNT),
  status: GameStatus.stopped,
  generationCount: 0,
  autoPlay: true,
};

export type SetDimensionsInput = {
  rowsCount: number,
  columnsCount: number,
};

export type SetIntoCellInput = {
  position: CellPosition;
  status: CellStatus;
};

export type SetCellsInput = CellStatus[][];

export const gameStateSlice = createSlice({
  name: 'GameState',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<GameStatus>) => {
      state.status = action.payload;
    },
    setGenerationCount: (state, action: PayloadAction<number>) => {
      state.generationCount = action.payload;
    },
    setDimensions: (state, action: PayloadAction<SetDimensionsInput>) => {
      const { rowsCount, columnsCount } = action.payload;
      state.cells = getBoard(rowsCount, columnsCount, state.cells);
    },
    setIntoCell: (state, action: PayloadAction<SetIntoCellInput>) => {
      const { status, position: { x, y } } = action.payload;
      state.cells[x][y] = status;
    },
    setCells: (state, action: PayloadAction<SetCellsInput>) => {
      state.cells = action.payload;
    },
    /**
     * calculates next state of the board and sets it into cells
     * increments generationCount by 1 immediately after
     */
    nextState: (state) => {
      state.cells = getNextState(state.cells);
      state.generationCount += 1;
    },
    setUpdateEveryMs: (state, action: PayloadAction<number>) => {
      state.updateEveryMs = action.payload;
    },
    setCellSize: (state, action: PayloadAction<number>) => {
      state.cellSize = action.payload;
    },
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setDimensions,
  setCells,
  setIntoCell,
  setUpdateEveryMs,
  setStatus,
  setGenerationCount,
  setCellSize,
  nextState,
  reset,
} = gameStateSlice.actions;

// selectors
export const dimensionsSelector = (state: RootState) => ({
  rowsCount: state.GameState.cells.length,
  columnsCount: state.GameState.cells.length > 0 ? state.GameState.cells[0].length : 0,
});
export const cellsSelector = (state: RootState) => state.GameState.cells;
export const cellSizeSelector = (state: RootState) => state.GameState.cellSize;
export const updateEveryMsSelector = (state: RootState) => state.GameState.updateEveryMs;
export const statusSelector = (state: RootState) => state.GameState.status;
export const generationCountSelector = (state: RootState) => state.GameState.generationCount;
export const areCellsConfiguredSelector = (state: RootState) => state.GameState.cells.flatMap(
  rows => rows.map(cell => cell),
).length > 0;

export default gameStateSlice.reducer;
