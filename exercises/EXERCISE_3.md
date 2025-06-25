# Exercise 3: Production Performance Profiling with react-native-release-profiler

## Overview
Learn to profile React Native app performance in release builds using `react-native-release-profiler`. This exercise covers recording traces, downloading them from Android emulator, symbolication, and analysis with SpeedScope.

## Why Profile in Release Mode?
- Debug builds have performance overhead (GC, debug markers, logs)  
- Release builds show real-world performance
- Catch production-specific issues
- Profile on actual user devices

## Setup

### 2. Build Release Version
```bash
# Android
npx react-native run-android --variant=release

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
# Replace com.yourapp.package with your actual app bundle ID
npx react-native-release-profiler --fromDownload --appId com.performanceworkshops
```

## Symbolication & Processing

### 1. Using CLI (Recommended)
The CLI automatically processes and symbolicates traces:
```bash
npx react-native-release-profiler --fromDownload --appId com.performanceworkshops
```

### 2. Manual Processing for iOS/Web
```bash
npx react-native-release-profiler --local ./path/to/profile.json
```

### 3. What Symbolication Does
- Converts memory addresses to readable function names
- Maps minified/obfuscated code back to source
- Adds source map information for better debugging

## Analyzing Traces in SpeedScope

### 1. Open SpeedScope
Go to [https://speedscope.app](https://speedscope.app) in your browser.

### 2. Load Your Trace
- Click "Browse" or drag the processed trace file
- SpeedScope supports multiple formats (Chrome tracing, Hermes profiles, etc.)
  
## Tips & Best Practices

### Recording
- Profile 10-30 second sessions (longer = larger files)
- Focus on specific user interactions
- Record both cold and warm app states

### Analysis
- Compare before/after optimization traces
- Focus on self-time for actual bottlenecks
- Look at call patterns, not just individual slow functions
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
