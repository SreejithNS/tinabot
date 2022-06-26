import React from 'react';
import { render, screen } from '@testing-library/react';
import PredictionForm from './predictionform';

test('Renders form with label and input field', () => {
    render(<PredictionForm />);
    const labelElement = screen.getByLabelText(/Image/i);
    expect(labelElement).toBeInTheDocument();

    const inputElement = screen.getByTestId('image');
    expect(inputElement).toBeInTheDocument();
});
