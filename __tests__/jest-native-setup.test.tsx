import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';

it('enables @testing-library/jest-native matchers', () => {
  const { getByText } = render(<Text>Hello</Text>);
  expect(getByText('Hello')).toHaveTextContent('Hello');
});

