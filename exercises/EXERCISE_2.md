# Exercise 2: Profiling React Native with Chrome DevTools

## Overview
In this exercise, we'll learn how to use Chrome DevTools to profile JavaScript performance in React Native applications. We'll set up port forwarding and use Chrome's profiler to identify performance bottlenecks.

## Prerequisites
- Chromium-based browser installed
- Metro bundler running
- Physical device or emulator with the app running

## Part 1: Setting Up Chrome DevTools

### Step 1: Configure Port Forwarding
1. Open browser and navigate to `chrome://inspect` (if using any other chromium-based browser, simply replace `chrome` with its name, e.g. `arc`)
2. Click on "Configure..." next to "Discover network targets"
3. Add the following ports:
   - `8081` (Metro bundler default port)
4. Click "Done"

### Step 3: Connect to Your App
1. In the `chrome://inspect` page, you should see your app listed under "Remote Target"
2. Click "inspect" next to your app entry
3. This opens Chrome DevTools connected to your React Native JavaScript context

## Part 2: Performance Profiling

### Step 4: Navigate to Performance Tab
1. In the opened DevTools window, click on the "Performance" tab
2. You'll see options to record performance profiles

### Step 5: Record a Performance Profile
1. Click the record button (circle icon) in the Performance tab
2. Interact with your app to trigger the performance issue you want to analyze:
3. Click the stop button to end recording
4. Download the recorded profile

## Part 3: Exercise

### Scenario: Optimize the navigation between two screens
1. Open the app (cold start)
2. Start recording in Chrome DevTools
3. Press "Login"
4. Stop recording once it navigated to the `HomeScreen`
5. Download the profile trace
**IF PROFILING IN CHROME DOES NOT WORK FOR YOU**
1. Open the app (cold start)
2. Open three-dot menu and go to Settings
3. Enable Debug FAB
4. Go back to Login screen
5. Open FAB and enable performance profiling
6. Press "Login"
7. Once navigated to the `HomeScreen`, open FAB again and stop recording
8. Open terminal, type `open `, hit `<cmd+v>` and hit Enter 

### Analyze the profile trace
1. Open https://www.speedscope.app/
2. Upload recorded profile trace
3. Analyze it to see where does it spend the most of time
4. Note the key findings and results

### What to Look For:
- **Long Tasks**: long JavaScript execution blocks
- **Frequent Re-renders**: Multiple renders of the same components

## Part 4: Optimize the code

### Step 6: Implement Optimizations
1. **Checkout branch <branch_with_solution>**

### Step 7: Re-profile and Compare
1. After implementing optimizations, repeat the profiling process
2. Compare the new profile with the original
3. Look for improvements in:
   - Reduced JavaScript execution time
   - Fewer long tasks

## Part 5: Advanced Profiling Techniques

## Troubleshooting

### Common Issues:
- **DevTools not connecting**: Check that Metro is running
- **Port forwarding not working**: Verify ports are correctly configured in `chrome://inspect`
- **Profile data missing**: Ensure you're interacting with the app during recording

## Exercise Deliverables

1. **Before Profile**: Screenshot of performance profile showing bottlenecks
2. **Optimized Code**: Show the specific code changes made
3. **After Profile**: Screenshot showing performance improvements
4. **Analysis Report**: Brief summary of:
   - Issues identified
   - Optimizations implemented
   - Performance gains achieved

## Resources
- [Chrome DevTools Performance Documentation](https://developer.chrome.com/docs/devtools/performance/)
- [React Native Performance Guide](https://reactnative.dev/docs/performance)
- [Metro Bundler Configuration](https://facebook.github.io/metro/docs/configuration)
