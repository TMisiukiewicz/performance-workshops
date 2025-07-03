# React Native Performance Workshops

> A comprehensive React Native workshop focused on performance optimization techniques, profiling tools, and regression testing

## 🎯 Overview

This workshop teaches React Native performance optimization through hands-on exercises using a book browsing app. You'll learn to identify bottlenecks, implement optimizations, and prevent performance regressions using industry-standard tools.

## 🚀 Quick Start

### Prerequisites
1. Installed Xcode and Android Studio
2. Installed Node.js
3. Cloned repository
Please install dependencies, use npm run android and npm run ios and make sure the app opens properly on both platforms
4. Flashlight installed: https://docs.flashlight.dev/#installation
5. Maestro installed: https://github.com/mobile-dev-inc/maestro-docs/blob/main/getting-started/installing-maestro/README.md

### Installation
```bash
# Clone the repository
git clone [repository-url]
cd performance-workshops

# Install dependencies
npm install

# Start Metro bundler
npm start

# Run on iOS
npm run ios

# Run on Android  
npm run android
```

## 🏗️ Project Architecture

### Core Components
```
├── App.tsx                 # Main app with navigation
├── screens/
│   ├── StartScreen.tsx     # Login/welcome screen
│   ├── HomeScreen.tsx      # Main book list with search
│   ├── FavoritesScreen.tsx # Favorite books and authors
│   └── SettingsScreen.tsx  # App configuration
├── components/
│   ├── BookListItem.tsx    # Individual book component
│   ├── DevPanel.tsx        # Development debugging tools
│   └── HeaderMenu.tsx      # Navigation header
└── store.ts               # Redux store with favorites management
```

### Performance Infrastructure
```
├── __perf__/              # Reassure performance tests
├── performance-utils.ts   # Custom performance measurement utilities
├── flows/                 # Automated UI testing flows
└── mocks/                 # Large-scale mock data generation
```

## 🔧 Available Scripts

### Development
```bash
npm start                    # Start Metro bundler
npm run ios                  # Run on iOS simulator
npm run android              # Run on Android emulator/device
npm run lint                 # ESLint code checking
npm test                     # Run Jest tests
```

### Performance Testing
```bash
npm run test:perf:baseline   # Establish performance baselines
npm run test:perf           # Run performance tests and compare
npm run test:perf:check-stability # Verify test stability
```

### Build & Profiling
```bash
npm run bundle:android       # Create production Android bundle
npm run downloadtrace:android # Download Android performance traces
```

## 🛠️ Tools & Technologies

### Core Stack
- **React Native 0.79.1**: Latest React Native with performance improvements
- **React 19.0.0**: Latest React with concurrent features
- **TypeScript**: Type safety and developer experience
- **Redux Toolkit**: State management with performance optimizations

## 📱 App Features

### Core Functionality
- **Book Browsing**: Scroll through thousands of books with smooth performance
- **Search & Filter**: Real-time search across books and authors
- **Favorites System**: Add/remove favorites with state management
- **Author Information**: Linked author data with relationship queries

## 🔍 Troubleshooting

### Common Issues

**Metro bundler connection issues:**
```bash
npm run start --reset-cache
```

**Chrome DevTools not connecting:**
1. Check `chrome://inspect` port forwarding
2. Verify Metro is running on port 8081
3. Restart app and DevTools connection

## 📚 Additional Resources

- [React Native Performance Guide](https://reactnative.dev/docs/performance)
- [React DevTools Profiler](https://react.dev/learn/react-developer-tools#profiler)
- [Reassure Documentation](https://callstack.github.io/reassure/)
- [Redux Performance Patterns](https://redux.js.org/tutorials/fundamentals/part-6-async-logic#performance-and-normalizing-data)

