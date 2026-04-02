module.exports = {
  root: true,
  extends: '@react-native-community',

  overrides: [
    {
      files: [
        '**/__tests__/**/*.[jt]s?(x)',
        '**/?(*.)+(spec|test).[jt]s?(x)',
      ],
      extends: ['plugin:testing-library/react-native'],
    },
  ],
};