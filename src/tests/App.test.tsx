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
  const step1HeaderElement = screen.getByText('Game of Life');
  expect(step1HeaderElement).toBeInTheDocument();
});
