import { FC, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateEveryMsSelector,
  GameStatus,
  statusSelector,
  nextState,
  setStatus,
} from '../game-state/GameState.slice';

export type GameRunnerProps = {};

export const GameRunner: FC<GameRunnerProps> = () => {
  const gameStatus = useSelector(statusSelector);
  const updateEveryMs = useSelector(updateEveryMsSelector);
  const isPlaying = gameStatus === GameStatus.playing;

  const dispatch = useDispatch();

  const onNextState = useCallback(() => {
    dispatch(nextState());
  }, [dispatch]);

  const onConfigure = useCallback(() => {
    dispatch(setStatus(GameStatus.stopped));
  }, [dispatch]);

  const onTogglePause = useCallback(() => {
    let nextStatus: GameStatus | null = null;
    switch (gameStatus) {
      case GameStatus.playing: nextStatus = GameStatus.paused; break;
      case GameStatus.paused: nextStatus = GameStatus.playing; break;
      default: break;
    }
    if (nextStatus) {
      dispatch(setStatus(nextStatus));
    }
  }, [gameStatus, dispatch]);

  // eslint-disable-next-line no-undef
  const updateInterval = useRef<NodeJS.Timer | null>(null);
  useEffect(() => {
    if (isPlaying) {
      if (updateInterval.current) {
        clearInterval(updateInterval.current);
      }
      updateInterval.current = setInterval(() => {
        onNextState();
      }, updateEveryMs);
    }
    return () => {
      if (updateInterval.current) {
        clearInterval(updateInterval.current);
      }
    };
  }, [isPlaying, onNextState, updateEveryMs]);

  return (
    <div>
      <div>
        <h4>Play game!</h4>
      </div>
      <div>
        <button
          type="button"
          onClick={onConfigure}
        >
          ← Configure
        </button>

        <button
          type="button"
          disabled={isPlaying}
          onClick={onNextState}
        >
          Next
        </button>

        <button
          type="button"
          onClick={onTogglePause}
        >
          { gameStatus === GameStatus.paused ? 'Play' : 'Pause' }
        </button>
      </div>
    </div>
  );
};
