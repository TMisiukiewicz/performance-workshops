import React from 'react';
import {measureRenders} from 'reassure';
import {Provider} from 'react-redux';

import {store} from '../store';
import HomeScreen from '../screens/HomeScreen';

const TestWrapper = ({children}: {children: React.ReactNode}) => {
  return <Provider store={store}>{children}</Provider>;
};

// Basic render performance test
test('HomeScreen initial render performance', async () => {
  await measureRenders(<HomeScreen />, {
    wrapper: TestWrapper,
    runs: 3,
  });
}, 30000);
