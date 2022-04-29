import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app.store';

// used static properties as enum
export class GameRunnerStatus {
  static playing = 'playing';

  static paused = 'paused';

  static stopped = 'stopped';
}

export type GameRunnerState = {
  status: GameRunnerStatus,
}

const initialState: GameRunnerState = {
  status: GameRunnerStatus.stopped,
};

export const gameRunnerSlice = createSlice({
  name: 'GameRunner',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<GameRunnerStatus>) => {
      state.status = action.payload;
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
} = gameRunnerSlice.actions;

// selectors
export const statusSelector = (state: RootState) => state.GameRunner.status;

export default gameRunnerSlice.reducer;
