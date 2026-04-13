import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';

describe('App Component', () => {
  it('renders the header and title', () => {
    render(<App />);
    expect(screen.getByText(/Coach-Load/i)).toBeInTheDocument();
    expect(screen.getByText(/Passenger Intelligence/i)).toBeInTheDocument();
  });

  it('renders the train selector and selects a train', () => {
    render(<App />);
    const rajdhaniButton = screen.getByText(/Mumbai Rajdhani/i);
    fireEvent.click(rajdhaniButton);
    expect(screen.getByText(/TS CODE: 12952/i)).toBeInTheDocument();
  });

  it('updates user position when clicking Move Right', () => {
    render(<App />);
    const moveRightButton = screen.getByLabelText(/Move position right/i);
    fireEvent.click(moveRightButton);
    expect(screen.getByText(/Position 2/i)).toBeInTheDocument();
  });

  it('shows Gemini Smart Insights', () => {
    render(<App />);
    expect(screen.getByText(/Gemini AI Smart Insight/i)).toBeInTheDocument();
    expect(screen.getByText(/Recommend boarding/i)).toBeInTheDocument();
  });
});
