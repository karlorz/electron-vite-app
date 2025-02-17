import { render, screen } from '@testing-library/react';
import * as React from 'react';
import App from '../App';

describe('App', () => {
  it('renders welcome message', () => {
    render(<App />);
    const welcomeElement = screen.getByText(/Welcome to your application!/i);
    expect(welcomeElement).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  it('contains ElectronInfo component', () => {
    render(<App />);
    const titleElement = screen.getByText(/Electron \+ Vite \+ React/i);
    expect(titleElement).toBeInTheDocument();
  });
});
