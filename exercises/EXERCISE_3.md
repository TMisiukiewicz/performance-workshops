# Exercise 3: Production Performance Profiling with react-native-release-profiler

## Overview
Learn to profile React Native app performance in release builds using `react-native-release-profiler`. This exercise covers recording traces, downloading them from Android emulator, symbolication, and analysis with SpeedScope.

## Why Profile in Release Mode?
- Debug builds have performance overhead (GC, debug markers, logs)  
- Release builds show real-world performance
- Catch production-specific issues
- Profile on actual user devices

## Setup

### 1. Drag and drop `main.apk` file from `/artifacts` folder to Android emulator
<attached video>

## Recording a Trace

1. Open the app (cold start)
2. Open three-dot menu and go to Settings
3. Enable Debug FAB
4. Go back to Login screen
5. Open FAB and enable performance profiling
6. Press "Login"
7. Once navigated to the `HomeScreen`, open FAB again and stop recording

## Downloading Trace from Android Emulator

### 1. Locate the Trace File
After stopping profiling, the trace is saved to the device's Downloads folder.

### 2. Download Using react-native-release-profiler CLI
```bash
npm run downloadtrace:android
```

## Symbolication & Processing

### 1. Generate sourcemaps

```bash
npm run bundle:android
```

### 2. Symbolicate trace

```bash
npx react-native-release-profiler --fromDownload --appId com.performanceworkshops
```

### 3. What Symbolication Does
- Converts memory addresses to readable function names
- Maps minified/obfuscated code back to source
- Adds source map information for better debugging

## Analyzing Trace in SpeedScope

### 1. Open SpeedScope
Go to [https://speedscope.app](https://speedscope.app) in your browser.

### 2. Load Your Trace
- Click "Browse" or drag the processed trace file

### 3. Write down key findings

## Measurements after fixes

### 1. Checkout `perf/exercise-2` branch

### 2. Drag and drop `exercise-2.apk` file from `/artifacts` folder to Android emulator

### 3. Repeat all the rest of the steps from main

### 4. Write down findings and compare them with baseline measurements
  
## Tips & Best Practices

### Recording
- Narrow down the problem you are profiling, but leave some profiling space before and after
- Focus on specific user interactions

### Analysis
- Compare before/after optimization traces
- Focus on self-time for actual bottlenecks
- Test fixes with new traces

### Optimization Areas
- Component rendering performance
- List/FlatList optimizations
- Image loading and caching
- Navigation transitions
- Data fetching patterns

## Troubleshooting

### Common Issues:
- **Empty traces**: Ensure you're running in release mode
- **No symbolication**: Check if source maps are available
- **CLI fails**: Try manual adb pull method
- **Large files**: Reduce profiling duration
