module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'jest/expect-expect': [
      'error',
      { assertFunctionNames: ['expect', 'measureRenders'] },
    ],
  },
};
