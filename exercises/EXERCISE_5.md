# Exercise 5: Performance Testing with Reassure

In this exercise, you'll learn how to use **Reassure** - a performance testing companion for React Native that helps you measure and track performance regressions over time.

## What is Reassure?

Reassure allows you to:
- Measure render performance of React Native components
- Measure execution time of functions
- Compare performance between different versions of your code
- Generate statistical reports with confidence intervals
- Detect performance regressions before they reach production

## Setup

### 1. Install Reassure

```bash
npm install --save-dev @callstack/reassure
```

### 2. Create Performance Test Directory

```bash
mkdir __perf__
```

### 3. Add Performance Test Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "test:perf": "reassure",
    "test:perf:measure": "reassure --measure",
    "test:perf:compare": "reassure --compare"
  }
}
```

### 4. Configure Reassure

Create `reassure.config.js` in your project root:

```javascript
module.exports = {
  runs: 20,
  warmupRuns: 3,
  outputFile: '.reassure/current.perf',
  verbose: true,
  testingLibrary: 'react-native',
};
```

## Test Implementation

### Test 1: BookListItem Component Performance

Create `__perf__/BookListItem.perf.test.tsx`:

```tsx
import React from 'react';
import {measureRenders} from '@callstack/reassure';
import {Provider} from 'react-redux';
import {store} from '../store';
import BookListItem from '../components/BookListItem';

// Mock data setup
const mockBook = {
  id: '1',
  title: 'The Great Gatsby',
  authorId: 'author1',
  publishedDate: '1925-04-10',
  lastRead: '2024-01-15',
};

const mockAuthor = {
  id: 'author1',
  name: 'F. Scott Fitzgerald',
};

const mockComments = [
  {
    id: 'comment1',
    bookId: '1',
    author: 'John Doe',
    content: 'Amazing book! Really enjoyed the symbolism and themes.',
  },
];

// Mock the selectors
jest.mock('../store', () => {
  const actualStore = jest.requireActual('../store');
  return {
    ...actualStore,
    selectBookById: jest.fn(() => mockBook),
    selectAuthorById: jest.fn(() => mockAuthor),
    selectCommentsByBookId: jest.fn(() => mockComments),
  };
});

const TestWrapper = ({children}: {children: React.ReactNode}) => (
  <Provider store={store}>{children}</Provider>
);

describe('BookListItem Performance', () => {
  test('measures BookListItem render performance', async () => {
    await measureRenders(
      <BookListItem id="1" favoriteBookIds={[]} />,
      {
        wrapper: TestWrapper,
        runs: 20,
        warmupRuns: 3,
      }
    );
  });

  test('measures BookListItem performance with favorite state', async () => {
    await measureRenders(
      <BookListItem id="1" favoriteBookIds={['1']} />,
      {
        wrapper: TestWrapper,
        runs: 20,
        warmupRuns: 3,
      }
    );
  });

  test('measures BookListItem with user interaction', async () => {
    await measureRenders(
      <BookListItem id="1" favoriteBookIds={[]} />,
      {
        wrapper: TestWrapper,
        runs: 15,
        warmupRuns: 2,
        scenario: async (view) => {
          const favoriteButton = view?.getByRole('button');
          if (favoriteButton) {
            // Simulate user tapping the favorite button
            await favoriteButton.props.onPress();
          }
        },
      }
    );
  });
});
```

### Test 2: HomeScreen Performance

Create `__perf__/HomeScreen.perf.test.tsx`:

```tsx
import React from 'react';
import {measureRenders} from '@callstack/reassure';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {store} from '../store';
import HomeScreen from '../screens/HomeScreen';

// Mock react-navigation
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

const TestWrapper = ({children}: {children: React.ReactNode}) => (
  <Provider store={store}>
    <NavigationContainer>
      {children}
    </NavigationContainer>
  </Provider>
);

describe('HomeScreen Performance', () => {
  test('measures HomeScreen initial render', async () => {
    await measureRenders(
      <HomeScreen />,
      {
        wrapper: TestWrapper,
        runs: 15,
        warmupRuns: 2,
      }
    );
  });

  test('measures HomeScreen with search interaction', async () => {
    await measureRenders(
      <HomeScreen />,
      {
        wrapper: TestWrapper,
        runs: 10,
        warmupRuns: 2,
        scenario: async (view) => {
          const searchInput = view?.getByPlaceholderText('Search by book or author');
          if (searchInput) {
            // Simulate typing in search
            await searchInput.props.onChangeText('gatsby');
            await searchInput.props.onChangeText('gatsby great');
            await searchInput.props.onChangeText('');
          }
        },
      }
    );
  });
});
```

### Test 3: Function Performance

Create `__perf__/utils.perf.test.tsx`:

```tsx
import {measureFunction, measureAsyncFunction} from '@callstack/reassure';
import {formatDate} from '../utils';

// Mock some heavy computation functions
const heavyDataProcessing = (data: any[]) => {
  // Simulate expensive operations
  return data
    .map(item => ({...item, processed: true}))
    .filter(item => item.processed)
    .sort((a, b) => a.id.localeCompare(b.id));
};

const asyncDataFetch = async () => {
  // Simulate async operation (ensure this is properly mocked in tests)
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({data: 'mock data'});
    }, 10);
  });
};

describe('Function Performance Tests', () => {
  test('measures formatDate function performance', async () => {
    const testDate = '2024-01-15T10:30:00Z';
    
    await measureFunction(
      () => formatDate(testDate),
      {
        runs: 100,
        warmupRuns: 10,
      }
    );
  });

  test('measures heavy data processing', async () => {
    const mockData = Array.from({length: 1000}, (_, i) => ({
      id: `item-${i}`,
      value: Math.random(),
    }));

    await measureFunction(
      () => heavyDataProcessing(mockData),
      {
        runs: 20,
        warmupRuns: 3,
      }
    );
  });

  test('measures async function performance', async () => {
    await measureAsyncFunction(
      async () => await asyncDataFetch(),
      {
        runs: 30,
        warmupRuns: 5,
      }
    );
  });
});
```

### Test 4: Redux Selector Performance

Create `__perf__/selectors.perf.test.tsx`:

```tsx
import {measureFunction} from '@callstack/reassure';
import {selectCommentsByBookId, selectBookById} from '../store';

// Mock state
const mockState = {
  books: Array.from({length: 1000}, (_, i) => ({
    id: `book-${i}`,
    title: `Book ${i}`,
    authorId: `author-${i % 100}`,
    publishedDate: '2024-01-01',
    lastRead: '2024-01-15',
  })),
  authors: Array.from({length: 100}, (_, i) => ({
    id: `author-${i}`,
    name: `Author ${i}`,
  })),
  comments: Array.from({length: 10000}, (_, i) => ({
    id: `comment-${i}`,
    bookId: `book-${i % 1000}`,
    author: `User ${i}`,
    content: `This is comment ${i}`,
  })),
  settings: {
    devPanelEnabled: false,
    fabEnabled: false,
  },
  favorites: {
    favoriteBookIds: [],
  },
};

describe('Selector Performance Tests', () => {
  test('measures selectBookById performance', async () => {
    await measureFunction(
      () => selectBookById(mockState as any, 'book-500'),
      {
        runs: 1000,
        warmupRuns: 100,
      }
    );
  });

  test('measures selectCommentsByBookId performance', async () => {
    await measureFunction(
      () => selectCommentsByBookId(mockState as any, 'book-500'),
      {
        runs: 500,
        warmupRuns: 50,
      }
    );
  });
});
```

## Running the Tests

### Step 1: Create Baseline Measurements

```bash
npm run test:perf:measure
```

This will:
- Run all performance tests
- Create baseline measurements in `.reassure/current.perf`
- Show performance statistics in the console

### Step 2: Make Code Changes

Now make some performance-related changes to your code. For example:

1. **Optimize BookListItem**: Add `React.memo` to prevent unnecessary re-renders
2. **Optimize selectors**: Use `createSelector` for better memoization
3. **Add expensive operations**: Intentionally slow down a function to see regression

### Step 3: Compare Performance

```bash
# Copy current measurements as baseline
cp .reassure/current.perf .reassure/baseline.perf

# Run tests again with your changes
npm run test:perf:measure

# Compare the results
npm run test:perf:compare
```

## Understanding the Results

Reassure will output:

### 1. Console Statistics
```
✓ BookListItem render performance (2.3ms ± 0.5ms)
  - Renders: 1.2 ± 0.1
  - Duration: 2.3ms ± 0.5ms
```

### 2. Comparison Report
After running compare, you'll see:
- **Significant Changes**: Performance changes that are statistically significant
- **Meaningless Changes**: Changes within normal variance
- **Added/Removed Scenarios**: New or deleted tests

### 3. Markdown Report
A detailed report is generated showing:
- Statistical confidence intervals
- Performance improvement/regression percentages
- Recommendations for investigation

## Best Practices

### 1. Test Realistic Scenarios
- Use actual data structures and sizes
- Test user interactions, not just static renders
- Include edge cases (empty lists, large datasets)

### 2. Proper Mocking
- Mock external dependencies (AsyncStorage, navigation)
- Keep mocks consistent between test runs
- Mock network calls and async operations

### 3. Statistical Validity
- Use sufficient runs (20+ for renders, 100+ for functions)
- Include warmup runs to eliminate JIT compilation effects
- Remove outliers to get consistent results

### 4. Continuous Monitoring
- Set up automated performance testing
- Track performance over time
- Set performance budgets and alerts

## Exercises to Try

1. **Add React.memo** to BookListItem and measure the difference
2. **Optimize the search filter** in HomeScreen with debouncing
3. **Create a slow selector** and then optimize it with proper memoization
4. **Test FlatList performance** with different `initialNumToRender` values
5. **Measure app startup time** by testing the initial screen render

## Troubleshooting

### Common Issues

1. **Inconsistent Results**: Increase warmup runs and test runs
2. **Mocking Errors**: Ensure all external dependencies are properly mocked
3. **Memory Leaks**: Use `beforeEach/afterEach` to clean up between tests
4. **Timing Issues**: Use `act()` wrapper for async operations

### Performance Investigation

When you find regressions:
1. Check the specific test scenario
2. Profile the component using React DevTools
3. Look for unnecessary re-renders
4. Check for memory leaks
5. Analyze bundle size changes

## Next Steps

After completing this exercise:
- Integrate performance testing into your development workflow
- Set up automated performance regression detection
- Create performance budgets for your app
- Monitor real-world performance metrics

Remember: Performance testing is most valuable when done consistently over time, not just as a one-off measurement!
