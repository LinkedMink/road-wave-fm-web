import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';

import AppContainer from './AppContainer';
import store from './store';

test('should render root app without build errors when initialized', async () => {
  render(
    <React.StrictMode>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </React.StrictMode>,
  );

  await waitFor(() => screen.getByRole('heading'));

  const headerEl = screen.getByRole('heading');
  expect(headerEl).toBeInTheDocument();
});
