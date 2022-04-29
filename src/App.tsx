import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { GameConfigurator } from './components/game-configurator/GameConfigurator';
// import { GameRunner } from './components/game-runner/GameRunner';
import { GameRunnerStatus, setStatus, statusSelector } from './components/game-runner/GameRunner.slice';

function App() {
  const gameStatus = useSelector(statusSelector);
  // const gameConfig = useSelector();
  const dispatch = useDispatch();

  const onCompleteConfiguration = useCallback(() => {
    dispatch(setStatus(GameRunnerStatus.paused));
  }, [dispatch]);

  return (
    <div>
      {
        gameStatus === GameRunnerStatus.stopped
          ? <GameConfigurator onComplete={onCompleteConfiguration} />
          : null
      }
    </div>
  );
}

export default App;
