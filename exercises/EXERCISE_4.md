# Exercise 4: Mobile Performance Profiling with Flashlight

## Overview
Learn to measure FPS, CPU and RAM usage using [Flashlight](https://flashlight.dev/), a Lighthouse-like tool for mobile apps. This exercise covers running measurements, and comparing before/after optimization results.

## Why Use Flashlight?
- **Real lower-end device testing**: See performance on actual hardware that matches your users
- **No installation required**: Works with any app (Native, RN, Flutter), even production builds
- **Deterministic measurements**: Averages results over multiple iterations 
- **Multiple metrics**: FPS, CPU, RAM usage combined into a performance score
- **Spot regressions early**: Catch performance issues before users do

## Prerequisites
- Android release build of the app
- Several books added to favorites (so Authors list has content to scroll)
- Node.js installed
- Android device or emulator running

## Part 1: Baseline Measurements

### Step 1: Prepare the App State
1. **Build and install release version**:
   ```bash
   npx react-native run-android --variant=release
   ```

2. **Set up test data**:
   - Navigate to Home screen
   - Add at least 10-15 books to favorites (click heart icons)
   - Go to Favorites screen
   - Switch to "Authors" tab to verify you have multiple authors with books

### Step 2: Install Flashlight CLI

```bash
npm install -g @flashlight.dev/cli
```

### Step 3: Create Flashlight Test Script

Create a test file `flashlight-authors-scroll.yml`:

```yaml
appId: com.performanceworkshops
---
- launchApp
- assertVisible: "Login"
- tap: "Login"
- assertVisible: "Your Favorites"
- tap: "Authors"
- assertVisible: "Authors"
- scroll:
    on: "Authors"
    down: 2000
- scroll:
    on: "Authors" 
    up: 2000
- scroll:
    on: "Authors"
    down: 3000
- scroll:
    on: "Authors"
    up: 1500
```

### Step 4: Run Baseline Measurements

1. **Ensure device is connected**:
   ```bash
   adb devices
   ```

2. **Run 3 measurements locally**:
   ```bash
   # Run 1
   flashlight test --apk android/app/build/outputs/apk/release/app-release.apk --testScript flashlight-authors-scroll.yml --output baseline-run-1.json
   
   # Run 2  
   flashlight test --apk android/app/build/outputs/apk/release/app-release.apk --testScript flashlight-authors-scroll.yml --output baseline-run-2.json
   
   # Run 3
   flashlight test --apk android/app/build/outputs/apk/release/app-release.apk --testScript flashlight-authors-scroll.yml --output baseline-run-3.json
   ```

   Each test takes ~2-3 minutes to complete.

### Step 5: Analyze Baseline Results

Look for these key metrics in your reports:
- **Performance Score**: Overall score (0-100)
- **Average FPS**: Frame rate during scrolling
- **CPU Usage**: Processor utilization %
- **RAM Usage**: Memory consumption
- **Jank**: Frame drops and stutters

**Take notes**:
- What's the average performance score across 3 runs?
- Are there consistent FPS drops during scrolling?
- How much RAM is being used?
- Any CPU spikes during scroll interactions?

**View results**:
```bash
# View summary of a report
flashlight report baseline-run-1.json

# Or open JSON files directly to examine detailed metrics
cat baseline-run-1.json | jq '.performanceScore'
```

## Part 2: Optimized Version Testing

### Step 6: Switch to Optimized Branch
```bash
git checkout perf/exercise-4
```

### Step 7: Build Optimized Version
```bash
# Clean and rebuild
cd android && ./gradlew clean && cd ..
npx react-native run-android --variant=release
```

### Step 8: Re-run Performance Tests

1. **Verify app state**:
   - Ensure you still have favorited books
   - Navigate to Authors tab to confirm test scenario

2. **Run 3 more measurements locally**:
   ```bash
   # Run 1
   flashlight test --apk android/app/build/outputs/apk/release/app-release.apk --testScript flashlight-authors-scroll.yml --output optimized-run-1.json
   
   # Run 2  
   flashlight test --apk android/app/build/outputs/apk/release/app-release.apk --testScript flashlight-authors-scroll.yml --output optimized-run-2.json
   
   # Run 3
   flashlight test --apk android/app/build/outputs/apk/release/app-release.apk --testScript flashlight-authors-scroll.yml --output optimized-run-3.json
   ```

## Part 3: Performance Comparison & Analysis

### Step 9: Compare Results

Create a comparison table:

| Metric | Baseline Avg | Optimized Avg | Improvement |
|--------|-------------|---------------|-------------|
| Performance Score | ___ | ___ | ___% |
| Average FPS | ___ | ___ | ___% |
| CPU Usage | ___% | ___% | ___% |
| RAM Usage | ___MB | ___MB | ___MB |

### Step 10: Analyze the Improvements

**Key areas to investigate**:

1. **FlatList Performance**: 
   - Are fewer components being rendered?
   - Is scrolling smoother (higher FPS)?

2. **Memory Usage**:
   - Reduced RAM usage during scrolling?
   - Less garbage collection pressure?

3. **CPU Efficiency**:
   - Lower CPU usage during interactions?
   - More consistent performance?

4. **Render Optimization**:
   - Fewer re-renders of list items?
   - Better component memoization?

## Expected Outcomes

After completing this exercise, you should understand:

- How to set up automated performance testing with Flashlight.dev
- The impact of list rendering optimizations on real devices
- How to measure and compare mobile app performance objectively
- The relationship between code changes and measurable performance metrics

### Common Optimizations You Might See:

- **FlatList props**: `removeClippedSubviews`, `initialNumToRender`, `maxToRenderPerBatch`
- **Component memoization**: `React.memo`, `useMemo`, `useCallback`
- **Data structure optimizations**: Normalized state, reduced computations
- **Render prop improvements**: Avoiding inline functions and objects

## Part 4: Advanced Analysis (Optional)

### Step 11: Deep Dive into Metrics

1. **Frame timing analysis**: Look for frame drops > 16ms
2. **Memory patterns**: Check for memory leaks or excessive allocations  
3. **CPU profiling**: Identify which operations cause CPU spikes
4. **Network usage**: Monitor any data fetching during scrolling

### Step 12: Create Performance Test Suite

Consider creating additional test scenarios:
- Fast scrolling vs slow scrolling
- Large datasets vs small datasets  
- Different device types/specs
- Various network conditions

## Troubleshooting

### Common Issues:
- **Test script fails**: Verify element selectors match your app's accessibility labels
- **CLI not found**: Ensure `@flashlight.dev/cli` is installed globally
- **Device not detected**: Check `adb devices` and ensure device is connected
- **Inconsistent results**: Run more iterations, check for background processes, ensure device stays awake
- **No performance difference**: Verify you're on the correct optimized branch

## 📚 Resources

- [Flashlight.dev Documentation](https://flashlight.dev/)
- [React Native Performance Guide](https://reactnative.dev/docs/performance)
- [FlatList Performance Tips](https://reactnative.dev/docs/optimizing-flatlist-configuration)
- [Mobile Performance Testing Best Practices](https://web.dev/mobile-performance-testing/)

## Exercise Deliverables

1. **Test script**: Your `flashlight-authors-scroll.yml` file
2. **Baseline measurements**: 3 JSON reports from initial version
3. **Optimized measurements**: 3 JSON reports from improved version  
4. **Performance comparison**: Table showing before/after metrics
5. **Analysis report**: Summary of improvements and insights gained
