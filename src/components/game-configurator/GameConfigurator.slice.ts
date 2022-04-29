import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app.store';
import { Cell, CellPosition, CellStatus } from '../cell/Cell';

export type GameConfig = {
  cells: CellStatus[][];
  cellSize: number;
  updateEveryMs: number; // number of milliseconds between a state update and the next
}

const initialState: GameConfig = {
  cellSize: 48,
  updateEveryMs: 1000,
  cells: [[]],
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

export const gameConfiguratorSlice = createSlice({
  name: 'GameConfigurator',
  initialState,
  reducers: {
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
  setCellSize,
  reset,
} = gameConfiguratorSlice.actions;

// selectors
export const dimensionsSelector = (state: RootState) => ({
  rowsCount: state.GameConfigurator.cells.length,
  columnsCount: state.GameConfigurator.cells[0].length,
});
export const cellsSelector = (state: RootState) => state.GameConfigurator.cells;
export const cellSizeSelector = (state: RootState) => state.GameConfigurator.cellSize;
export const updateEveryMsSelector = (state: RootState) => state.GameConfigurator.updateEveryMs;

export default gameConfiguratorSlice.reducer;
