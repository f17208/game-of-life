import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { store } from '../app.store';

test('successfully renders app', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  const newGameElement = screen.getByText('New game');
  expect(newGameElement).toBeInTheDocument();
});
