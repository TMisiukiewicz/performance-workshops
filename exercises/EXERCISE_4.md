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
- Flashlight installed
- Maestro installed
- Android device or emulator running

## Part 1: Baseline Measurements

### Step 1: Drag and drop `main.apk` file from `/artifacts` folder to Android emulator
<attached video>

### Step 2: Analyze the `flows/search-books.yml` file

### Step 3: Run the automated baseline measurements on the app:
```bash
flashlight test --bundleId com.performanceworkshops --testCommand "maestro test flows/search-books.yml" --resultsFilePath baseline.json --iterationCount 3
```

For stability reasons, do not use your Mac until it's done

## Part 2: Measurements after improvements

### Step 4: Checkout `perf/exercise-4` branch

### Step 5: Drag and drop `exercise-4.apk` file from `/artifacts` folder to Android emulator

### Step 6: Run measurements again

```bash
flashlight test --bundleId com.performanceworkshops --testCommand "maestro test flows/search-books.yml" --resultsFilePath exercise-4.json --iterationCount 3
```

For stability reasons, do not use your Mac until it's done

## Part 3: Analyze results

### Step 5: Open comparison of the recordings

```bash
flashlight report baseline.json exercise-4.json
```

Look for these key metrics in your reports:
- **Performance Score**: Overall score (0-100)
- **Average FPS**: Frame rate during scrolling
- **CPU Usage**: Processor utilization %
- **RAM Usage**: Memory consumption

**Take notes**:
- What's the average performance score across 3 runs?
- Are there consistent FPS drops during scrolling?
- How much RAM is being used?
- Any CPU spikes during scroll interactions?

## Expected Outcomes

After completing this exercise, you should understand:

- How to set up automated performance testing with Flashlight.dev
- How to measure and compare mobile app performance objectively
- The relationship between code changes and measurable performance metrics

### Common Issues:
- **CLI not found**: Ensure `@flashlight.dev/cli` is installed globally
- **Device not detected**: Check `adb devices` and ensure device is connected
- **Inconsistent results**: Run more iterations, check for background processes, ensure device stays awake
- **No performance difference**: Verify you're using correct build

## 📚 Resources

- [Flashlight.dev Documentation](https://flashlight.dev/)
- [React Native Performance Guide](https://reactnative.dev/docs/performance)
- [Mobile Performance Testing Best Practices](https://web.dev/mobile-performance-testing/)
