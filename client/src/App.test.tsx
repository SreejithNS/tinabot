import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders form with Image', () => {
  render(<App />);
  const labelElement = screen.getByText(/Image/i);
  expect(labelElement).toBeInTheDocument();
});
