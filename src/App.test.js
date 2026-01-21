import { render, screen } from '@testing-library/react';
import App from './App';

test('renders dashboard title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Analytics Dashboard/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders version badge', () => {
  render(<App />);
  const versionElement = screen.getByText(/v1.0.0/i);
  expect(versionElement).toBeInTheDocument();
});

test('renders stats cards', () => {
  render(<App />);
  const revenueElement = screen.getByText(/Total Revenue/i);
  const usersElement = screen.getByText(/Total Users/i);
  expect(revenueElement).toBeInTheDocument();
  expect(usersElement).toBeInTheDocument();
});