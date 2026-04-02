import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../src/Application';

test('renders app without crashing', () => {
  render(<App />);
});