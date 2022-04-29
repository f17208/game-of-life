import { useSelector } from 'react-redux';
import './App.css';
import { GameConfigurator } from './components/game-configurator/GameConfigurator';
import { GameRunner } from './components/game-runner/GameRunner';
import { GameRunnerStatus, statusSelector } from './components/game-runner/GameRunner.slice';

function App() {
  const gameStatus = useSelector(statusSelector);
  // const gameConfig = useSelector();

  return (
    <div>
      {
        gameStatus === GameRunnerStatus.stopped
          ? <GameConfigurator onComplete={() => { /* processInitialConfig */ }} />
          : null
      }
    </div>
  );
}

export default App;
