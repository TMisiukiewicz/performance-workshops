# Exercise 5: Performance Regression Testing with Reassure

## Overview
In this exercise, you'll use **Reassure** to measure React Native component performance and detect regressions. You'll establish baseline measurements, test performance improvements, and analyze statistical results to understand the impact of code changes.

## Why Use Reassure?
- **Automated regression detection**: Catch performance issues before code review
- **Statistical analysis**: Get confidence intervals and significance testing
- **Real data testing**: Test with your actual app data (5000 books, 3000 authors)
- **Component-focused**: Measure React component render performance specifically

## Prerequisites
- Reassure already set up and configured
- Performance tests already written in `__perf__/` directory
- Large mock datasets available in `/mocks` folder

## Part 1: Baseline Measurements

### Step 1: Run Baseline Performance Tests
```bash
npm run test:perf:baseline
```

This will:
- Run all performance tests multiple times with statistical analysis
- Test BookListItem component rendering
- Test HomeScreen rendering with 5000 books
- Test search performance with realistic queries
- Save baseline measurements to `.reassure/baseline.perf`

**Note**: This can take  several minutes due to the large dataset - be patient and ideally do not use your Mac for stability reasons!

### Step 2: Analyze Baseline Results
Look at the console output and note:
- Which components take the longest to render?
- How long does HomeScreen initial render take with 5000 books?
- How does search performance compare to initial render?
- What's the render count for each test?


## Part 2: Testing Performance Improvements

### Step 3: Checkout `perf/exercise-5`


### Step 4: Run Current Measurements and Compare
```bash
npm run test:perf
```

This will:
- Run the same performance tests with the optimized code
- Automatically compare against the baseline
- Generate a detailed performance comparison report
- Show statistical significance of changes

## Part 3: Analyze the Results

### Step 5: Review the Performance Report

Look for these sections in the output:

#### Significant Changes To Duration
These are performance changes that are statistically significant and worth investigating:
```
HomeScreen initial render performance [render]: 
45.2 ms → 32.1 ms (-13.1 ms, -29.0%) | 1 → 1
```

#### Meaningless Changes To Duration  
These are changes within normal variance - not actionable:
```
BookListItem performance [render]: 
1.3 ms → 1.4 ms (+0.1 ms, +7.7%) | 1 → 1
```

#### Render Count Changes
Changes in how many times components render:
```
HomeScreen search performance [render]: 
12.3 ms → 8.7 ms (-3.6 ms, -29.3%) | 3 → 1
```

### Step 6: Understanding the Results

**Reading the Format:**
- `45.2 ms → 32.1 ms` = Before and after render times
- `(-13.1 ms, -29.0%)` = Absolute and percentage change
- `| 1 → 1` = Render count before and after

**What to Look For:**
- **Negative percentages** = Performance improvements (faster)
- **Positive percentages** = Performance regressions (slower)
- **Render count changes** = Optimization of re-renders

### Step 7: Document Your Findings

Answer these questions based on the report:

1. **What was the biggest performance improvement?**
   - Which test showed the largest time reduction?
   - What percentage improvement was achieved?

2. **Were there any performance regressions?**
   - Did any tests become slower?
   - Are they statistically significant or just noise?

3. **How did search performance change?**
   - Compare search vs initial render improvements
   - Did render counts change for search operations?

4. **What optimizations were most effective?**
   - Which scenarios benefited most from the changes?
   - Are the improvements consistent across different test scenarios?

## Part 4: Exploring the Optimizations

### Step 8: Check What Changed
```bash
git diff main..perf/exercise-5
```

### Step 9: Correlate Code Changes to Performance Impact

For each optimization you find:
- Which performance test would be affected?
- Does the measured improvement match your expectations?
- Are there any surprising results?

## Key Takeaways

**Statistical Significance Matters:**
- Only focus on "Significant Changes" - ignore meaningless variance
- Reassure uses proper statistical analysis to filter noise

**Real Data Testing:**
- Testing with 5000 books gives realistic performance insights
- Small optimizations can have big impacts at scale

**Multiple Metrics:**
- Render duration and render count are both important
- Sometimes render count matters more than duration

## 📚 Additional Resources

- [Reassure Documentation](https://callstack.github.io/reassure/)
- [React.memo Documentation](https://react.dev/reference/react/memo)
- [useMemo Best Practices](https://react.dev/reference/react/useMemo)
