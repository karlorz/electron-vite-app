import { render, screen, act } from '@testing-library/react';
import * as React from 'react';
import App from '../App';

describe('App', () => {
  beforeEach(() => {
    // Clear any previous renders
    jest.clearAllMocks();
  });

  it('renders welcome message', async () => {
    await act(async () => {
      render(<App />);
    });
    const welcomeElement = screen.getByText(/Welcome to your application!/i);
    expect(welcomeElement).toBeInTheDocument();
  });

  it('renders without crashing', async () => {
    let container: HTMLElement | undefined;
    await act(async () => {
      const result = render(<App />);
      container = result.container;
    });
    expect(container).toBeTruthy();
  });

  it('contains ElectronInfo component', async () => {
    await act(async () => {
      render(<App />);
    });
    const titleElement = screen.getByText(/Electron \+ Vite \+ React/i);
    expect(titleElement).toBeInTheDocument();
  });
});
