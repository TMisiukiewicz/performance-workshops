# Exercise 3: Production Performance Profiling with react-native-release-profiler

## Overview
Learn to profile React Native app performance in release builds using `react-native-release-profiler`. This exercise covers recording traces, downloading them from Android emulator, symbolication, and analysis with SpeedScope.

## Why Profile in Release Mode?
- Debug builds have performance overhead (GC, debug markers, logs)  
- Release builds show real-world performance
- Catch production-specific issues
- Profile on actual user devices

## Part 1: Setup

### Step 1: Drag and drop `main.apk` file from `/artifacts` folder to Android emulator
<attached video>

## Part 2: Recording a Trace

1. Open the app (cold start)
2. Open three-dot menu and go to Settings
3. Enable Debug FAB
4. Go back to Login screen
5. Open FAB and enable performance profiling
6. Press "Login"
7. Once navigated to the `HomeScreen`, open FAB again and stop recording

## Part 3: Downloading Trace from Android Emulator

### Step 2: Generate sourcemaps

```bash
npm run bundle:android
```

### Step 3. Download profile trace using react-native-release-profiler CLI
```bash
npm run downloadtrace:android
```

## Part 4: Analyzing Trace in SpeedScope

### Step 4: Using Speedscope
1. Go to [https://speedscope.app](https://speedscope.app) in your browser.
2. Click "Browse" or drag the processed trace file
3. Write down key findings

## Part 5: Measurements after fixes

### Step 5: Drag and drop `exercise-3.apk` file from `/artifacts` folder to Android emulator

### Step 6: Repeat all the rest of the steps from main

### Step 7: Write down findings and compare them with baseline measurements
  
## Tips & Best Practices

### Recording
- Narrow down the problem you are profiling, but leave some profiling space before and after
- Focus on specific user interactions

### Analysis
- Compare before/after optimization traces
- Focus on self-time for actual bottlenecks
- Test fixes with new traces

## Troubleshooting

### Common Issues:
- **Empty traces**: Ensure you're running in release mode
- **No symbolication**: Check if source maps are available
- **CLI fails**: Try manual adb pull method
- **Large files**: Reduce profiling duration
