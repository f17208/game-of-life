import { configureStore } from '@reduxjs/toolkit';
import gameRunnerReducer from './components/game-runner/GameRunner.slice';
import gameConfiguratorReducer from './components/game-configurator/GameConfigurator.slice';

export const store = configureStore({
  reducer: {
    GameRunner: gameRunnerReducer,
    GameConfigurator: gameConfiguratorReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
