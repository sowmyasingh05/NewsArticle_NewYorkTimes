// App.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from './App';

// Mock the axios module
jest.mock('axios');

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state', () => {
    render(<App />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders articles list on successful fetch', async () => {
    const articles = [
      { title: 'Article 1', abstract: 'Abstract 1', published_date: '2024-07-12', url: '#', media: [] },
      { title: 'Article 2', abstract: 'Abstract 2', published_date: '2024-07-13', url: '#', media: [] },
    ];
    axios.get.mockResolvedValueOnce({ data: { results: articles } });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/NY Times Most Popular Articles/i)).toBeInTheDocument();
      expect(screen.getByText(/Article 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Article 2/i)).toBeInTheDocument();
    });
  });

  test('handles fetch error', async () => {
    axios.get.mockRejectedValueOnce(new Error('Fetch error'));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/error: fetch error/i)).toBeInTheDocument();
    });
  });

  test('displays article details when an article is clicked', async () => {
    const articles = [
      { title: 'Article 1', abstract: 'Abstract 1', published_date: '2024-07-12', url: '#', media: [] },
    ];
    axios.get.mockResolvedValueOnce({ data: { results: articles } });

    render(<App />);

    await waitFor(() => {
      fireEvent.click(screen.getByText(/Article 1/i));
    });

    expect(screen.getByText(/Abstract 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Published Date: 2024-07-12/i)).toBeInTheDocument();
  });

  test('returns to article list when back button is clicked', async () => {
    const articles = [
      { title: 'Article 1', abstract: 'Abstract 1', published_date: '2024-07-12', url: '#', media: [] },
    ];
    axios.get.mockResolvedValueOnce({ data: { results: articles } });

    render(<App />);

    await waitFor(() => {
      fireEvent.click(screen.getByText(/Article 1/i));
    });

    expect(screen.getByText(/Abstract 1/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /back to articles/i }));

    await waitFor(() => {
      expect(screen.getByText(/NY Times Most Popular Articles/i)).toBeInTheDocument();
    });
  });
});
