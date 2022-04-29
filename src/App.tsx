import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { GameConfigurator } from './components/game-configurator/GameConfigurator';
import { GameRunner } from './components/game-runner/GameRunner';
// import { GameRunner } from './components/game-runner/GameRunner';
import { GameStatus, setStatus, statusSelector } from './components/common/GameState.slice';

function App() {
  const gameStatus = useSelector(statusSelector);
  // const gameConfig = useSelector();
  const dispatch = useDispatch();

  const onCompleteConfiguration = useCallback(() => {
    dispatch(setStatus(GameStatus.paused));
  }, [dispatch]);

  return (
    <div>
      {
        gameStatus === GameStatus.stopped
          ? <GameConfigurator onComplete={onCompleteConfiguration} />
          : <GameRunner />
      }
    </div>
  );
}

export default App;
