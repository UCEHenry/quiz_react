/** @jest-environment jsdom */
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App Title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Quiz Wars/i);
  expect(linkElement).toBeInTheDocument();
});
