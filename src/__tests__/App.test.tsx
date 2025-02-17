import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders welcome message', () => {
    render(<App />);
    const welcomeElement = screen.getByText(/Welcome to your application!/i);
    expect(welcomeElement).toBeInTheDocument();
  });
});
