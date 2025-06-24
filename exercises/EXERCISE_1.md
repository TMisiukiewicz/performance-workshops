# Exercise 1: Using React DevTools to Analyze "Add to Favorites" Performance

## Overview
In this exercise, you'll use React DevTools Profiler to measure and analyze what happens when a user adds a book to their favorites. This will help you identify performance bottlenecks, unnecessary re-renders, and optimization opportunities.

## Learning Objectives
- Learn how to use the React DevTools Profiler
- Understand the concept of component re-renders and their performance impact
- Identify performance bottlenecks in state updates
- Analyze the cascade effect of state changes across components

## Prerequisites
- iOS or Android app running
- Basic understanding of React component lifecycle

## Part 1: Baseline Measurement

### Step 1: Open React DevTools
1. **Start the Metro server**
   ```bash
   npm run start
   ```

2. Open your browser's developer tools (`j` in Metro)
3. Click on the "Profiler ⚛️" tab
4. Make sure "Record why each component rendered" is enabled (gear icon → Profiler)

### Step 2: Record the Favorite Action
1. **Start a new recording** in the Profiler
2. **Click the heart icon** on one book to add it to favorites
3. **Wait 2-3 seconds** for any async operations to complete
4. **Stop recording**
5. **Download the profile trace**

### Step 3: Analyze the Favorite Action Results
Look for the following in the profiler:

1. **Component Re-renders**
   - Which components re-rendered when you clicked the heart?
   - How many times did `BookListItem` components re-render?
   - Did the `HomeScreen` component re-render?

2. **Render Duration**
   - What was the total time for the favorite action?
   - Which component took the longest to render?
   - Were there any components that rendered multiple times?

3. **Render Reasons**
   - Click on individual components to see why they rendered
   - Look for "Props changed", "State changed", "Context changed"

## Part 3: Understanding the Performance Issues

### Step 5: Analyze the Current Implementation

Look at the current code structure:

**In `HomeScreen.tsx`:**
```typescript
const favoriteBookIds = useAppSelector(
    state => state.favorites.favoriteBookIds,
  );
```

```typescript
<BookListItem id={item} favoriteBookIds={favoriteBookIds} />
```

## Part 4: Implementing and measuring improvements

### Step 6: Implement performance improvements

1. **Checkout branch <branch_with_solution>**

### Step 7: Record the Favorite action again
1. **Record a profile trace again**
2. **Download the profile trace**


## Part 5: Compare results from React Profiler

### Step 7: Use online tool to compare the results
1. Go to https://kacper-mikolajczak.github.io/rcc/
2. Upload both downloaded profile traces
3. Analyze the output of the report

## Expected Outcomes

After completing this exercise, you should understand:

- How to use React DevTools Profiler effectively
- The performance impact of state updates in Redux/React
- Why prop changes cause cascading re-renders
- The difference between necessary and unnecessary re-renders

---

## 📚 Additional Resources

- [React DevTools Profiler Documentation](https://react.dev/learn/react-developer-tools#profiler)
- [Optimizing Performance - React Docs](https://react.dev/learn/render-and-commit)
- [Redux Performance Patterns](https://redux.js.org/tutorials/fundamentals/part-6-async-logic#performance-and-normalizing-data)
