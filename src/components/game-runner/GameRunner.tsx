import { FC, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../common/button/Button';

import { ReactComponent as CogIcon } from '../assets/cog.svg';
import { ReactComponent as ArrowNextIcon } from '../assets/arrow-next.svg';
import { ReactComponent as PlayIcon } from '../assets/play.svg';
import { ReactComponent as PauseIcon } from '../assets/pause.svg';

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

  const iconClassName = 'h-5 fill-white mr-1';

  return (
    <div className="flex space-x-2 justify-center">
      <Button onClick={onConfigure}>
        <CogIcon className={iconClassName} />
        Options
      </Button>

      <Button
        disabled={isPlaying}
        onClick={onNextState}
      >
        <ArrowNextIcon className={iconClassName} />
        Next
      </Button>

      <Button onClick={onTogglePause}>
        {
          gameStatus === GameStatus.paused
            ? <PlayIcon className={iconClassName} />
            : <PauseIcon className={iconClassName} />
        }
        { gameStatus === GameStatus.paused ? 'Play' : 'Pause' }
      </Button>
    </div>
  );
};
