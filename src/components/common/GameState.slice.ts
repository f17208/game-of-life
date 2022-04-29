import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app.store';
import { getNextState } from '../../utils/game-of-life';
import { Cell, CellPosition, CellStatus } from '../cell/Cell';

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
}

const initialState: GameConfig = {
  cellSize: 48,
  updateEveryMs: 1000,
  cells: [[]],
  status: GameStatus.stopped,
  generationCount: 0,
};

export type SetDimensionsInput = {
  rowsCount: number,
  columnsCount: number,
}

export type SetIntoCellsInput = {
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
      const newCells = new Array(rowsCount) // initialize rowsCount rows
        .fill(
          new Array(columnsCount).fill(CellStatus.dead), // fill all with dead cells
        );

      // copy old values (if possible in new board configuration)
      state.cells.forEach((row, i) => {
        row.forEach((cell, j) => {
          if (i < newCells.length && j < newCells[i].length) {
            newCells[i][j] = state.cells[i][j];
          }
        });
      });

      state.cells = newCells;
    },
    setIntoCells: (state, action: PayloadAction<SetIntoCellsInput>) => {
      const { status, position: { x, y } } = action.payload;
      state.cells[x][y] = status;
    },
    setCells: (state, action: PayloadAction<SetCellsInput>) => {
      state.cells = action.payload;
    },
    nextState: (state, action: PayloadAction<CellStatus[][]>) => {
      state.cells = getNextState(action.payload);
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
  setIntoCells,
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
  columnsCount: state.GameState.cells[0].length,
});
export const cellsSelector = (state: RootState) => state.GameState.cells;
export const cellSizeSelector = (state: RootState) => state.GameState.cellSize;
export const updateEveryMsSelector = (state: RootState) => state.GameState.updateEveryMs;
export const statusSelector = (state: RootState) => state.GameState.status;
export const generationCountSelector = (state: RootState) => state.GameState.generationCount;

export default gameStateSlice.reducer;
