import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Weather from './weather';

jest.mock('axios');

describe('Weather component', () => {
  test('renders without crashing', () => {
    render(<Weather />);
  });

  test('fetches weather data when form is submitted', async () => {
    const mockData = {
      forecast: {
        forecastday: [
          {
            date: '2024-06-03',
            day: {
              maxtemp_c: 30,
              mintemp_c: 20,
              condition: {
                icon: 'http://example.com/icon.png',
                text: 'Sunny',
              },
            },
          },
        ],
      },
    };

    axios.get.mockResolvedValueOnce({ data: mockData });

    const { getByPlaceholderText, getByText } = render(<Weather />);

    const input = getByPlaceholderText('Enter city name');
    fireEvent.change(input, { target: { value: 'New York' } });

    const searchButton = getByText('Search');
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('New York'));
    });
  });
});
