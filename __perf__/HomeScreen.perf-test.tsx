import React from 'react';
import {measureRenders} from 'reassure';
import {Provider} from 'react-redux';
import {fireEvent, screen} from '@testing-library/react-native';

import {store} from '../store';
import HomeScreen from '../screens/HomeScreen';

const TestWrapper = ({children}: {children: React.ReactNode}) => {
  return <Provider store={store}>{children}</Provider>;
};

// Test initial render performance with large dataset (5000 books)
test('HomeScreen initial render performance with large dataset', async () => {
  await measureRenders(<HomeScreen />, {
    wrapper: TestWrapper,
    runs: 3, // Fewer runs due to large dataset
  });
}, 30000);

// Test search performance with realistic query
test('HomeScreen search performance - common book title', async () => {
  const scenario = async () => {
    const searchInput = screen.getByTestId('search-input');

    // Search for a common word that might appear in many book titles
    fireEvent.changeText(searchInput, 'The');

    // Give time for filtering to complete
    await new Promise(resolve => setTimeout(resolve, 100));
  };

  await measureRenders(<HomeScreen />, {
    wrapper: TestWrapper,
    scenario,
    runs: 3,
  });
}, 30000);

// Test search performance with author name
test('HomeScreen search performance - author search', async () => {
  const scenario = async () => {
    const searchInput = screen.getByTestId('search-input');

    // Search for an author name pattern
    fireEvent.changeText(searchInput, 'Smith');

    await new Promise(resolve => setTimeout(resolve, 100));
  };

  await measureRenders(<HomeScreen />, {
    wrapper: TestWrapper,
    scenario,
    runs: 3,
  });
}, 30000);

// Test search performance with no results
test('HomeScreen search performance - no results', async () => {
  const scenario = async () => {
    const searchInput = screen.getByTestId('search-input');

    // Search for something that definitely won't exist
    fireEvent.changeText(searchInput, 'ZZZZZZNONEXISTENT');

    await new Promise(resolve => setTimeout(resolve, 50));
  };

  await measureRenders(<HomeScreen />, {
    wrapper: TestWrapper,
    scenario,
    runs: 3,
  });
}, 30000);

// Test clearing search performance
test('HomeScreen search clear performance with large dataset', async () => {
  const scenario = async () => {
    const searchInput = screen.getByTestId('search-input');

    // First apply a filter
    fireEvent.changeText(searchInput, 'Fiction');
    await new Promise(resolve => setTimeout(resolve, 50));

    // Then clear it (this should re-render all 5000 books)
    fireEvent.changeText(searchInput, '');
    await new Promise(resolve => setTimeout(resolve, 100));
  };

  await measureRenders(<HomeScreen />, {
    wrapper: TestWrapper,
    scenario,
    runs: 3,
  });
}, 30000);

// Test multiple rapid search operations (stress test)
test('HomeScreen rapid search operations performance', async () => {
  const scenario = async () => {
    const searchInput = screen.getByTestId('search-input');

    // Simulate rapid typing/searching
    const queries = ['a', 'ar', 'art', 'ar', 'a', ''];

    for (const query of queries) {
      fireEvent.changeText(searchInput, query);
      await new Promise(resolve => setTimeout(resolve, 20));
    }
  };

  await measureRenders(<HomeScreen />, {
    wrapper: TestWrapper,
    scenario,
    runs: 2, // Fewer runs for stress test
  });
}, 45000);
