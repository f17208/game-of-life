import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app.store';

// used static properties as enum
export class GameRunnerStatus {
  static playing = 'playing';

  static paused = 'paused';

  static stopped = 'stopped';
}

export type GameRunnerState = {
  status: GameRunnerStatus;
  generationCount: number;
}

const initialState: GameRunnerState = {
  status: GameRunnerStatus.stopped,
  generationCount: 0,
};

export const gameRunnerSlice = createSlice({
  name: 'GameRunner',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<GameRunnerStatus>) => {
      state.status = action.payload;
    },
    setGenerationCount: (state, action: PayloadAction<number>) => {
      state.generationCount = action.payload;
    },
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setStatus,
  reset,
  setGenerationCount,
} = gameRunnerSlice.actions;

// selectors
export const statusSelector = (state: RootState) => state.GameRunner.status;
export const generationCountSelector = (state: RootState) => state.GameRunner.generationCount;

export default gameRunnerSlice.reducer;
