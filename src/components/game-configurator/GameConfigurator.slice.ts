import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app.store';
import { CellPosition, CellStatus } from '../cell/Cell';

export type GameConfig = {
  dimensions: {
    rowsCount: number;
    columnsCount: number;
  };
  initialState: CellStatus[][];
  cellSize: number;
  updateEveryMs: number; // number of milliseconds between a state update and the next
}

const initialState: GameConfig = {
  dimensions: {
    rowsCount: 10,
    columnsCount: 10,
  },
  cellSize: 24,
  updateEveryMs: 1000,
  initialState: [],
};

export type SetDimensionsInput = {
  rowsCount: number,
  columnsCount: number,
}

export type SetIntoInitialStateInput = {
  position: CellPosition;
  status: CellStatus;
};

export type SetInitialStateInput = CellStatus[][];

export const gameConfiguratorSlice = createSlice({
  name: 'GameConfigurator',
  initialState,
  reducers: {
    setDimensions: (state, action: PayloadAction<SetDimensionsInput>) => {
      state.dimensions = action.payload;
    },
    setIntoInitialState: (state, action: PayloadAction<SetIntoInitialStateInput>) => {
      const { status, position: { x, y } } = action.payload;
      state.initialState[x][y] = status;
    },
    setInitialState: (state, action: PayloadAction<SetInitialStateInput>) => {
      state.initialState = action.payload;
    },
    setUpdateEveryMs: (state, action: PayloadAction<number>) => {
      state.updateEveryMs = action.payload;
    },
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setDimensions,
  setInitialState,
  setIntoInitialState,
  setUpdateEveryMs,
  reset,
} = gameConfiguratorSlice.actions;

// selectors
export const dimensionsSelector = (state: RootState) => state.GameConfigurator.dimensions;
export const initialStateSelector = (state: RootState) => state.GameConfigurator.initialState;
export const cellSizeSelector = (state: RootState) => state.GameConfigurator.cellSize;
export const updateEveryMsSelector = (state: RootState) => state.GameConfigurator.updateEveryMs;

export default gameConfiguratorSlice.reducer;
