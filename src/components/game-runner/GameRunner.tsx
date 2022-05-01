import { FC, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../common/button/Button';
import { ArrowNextIcon, CogIcon, PauseIcon, PlayIcon } from '../common/icons';
import { Typography } from '../common/typography/Typography';

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

  /**
   * this handles the main loop of the game
   * sets the interval when the game is playing and clears it when it's not
   */
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
        <Typography>Options</Typography>
      </Button>

      <Button
        disabled={isPlaying}
        onClick={onNextState}
      >
        <ArrowNextIcon className={iconClassName} />
        <Typography>Next</Typography>
      </Button>

      <Button onClick={onTogglePause}>
        {
          gameStatus === GameStatus.paused
            ? <PlayIcon className={iconClassName} />
            : <PauseIcon className={iconClassName} />
        }
        <Typography>
          { gameStatus === GameStatus.paused ? 'Play' : 'Pause' }
        </Typography>
      </Button>
    </div>
  );
};
