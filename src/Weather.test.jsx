// Weather.test.js

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import Weather from './Weather';

jest.mock('axios');

describe('Weather component', () => {
  it('should fetch and display weather data for a city', async () => {
    const mockedData = {
      forecast: {
        forecastday: [
          {
            date: '2024-06-01',
            day: {
              maxtemp_c: 25,
              mintemp_c: 20,
              condition: {
                text: 'Partly cloudy',
                icon: 'http://example.com/partly-cloudy.png'
              }
            }
          }
        ]
      }
    };

    axios.get.mockResolvedValueOnce({ data: mockedData });

    render(<Weather />);

    const cityInput = screen.getByPlaceholderText('Enter city name');
    const searchButton = screen.getByText('Search');

    userEvent.type(cityInput, 'London');
    userEvent.click(searchButton);

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    expect(axios.get).toHaveBeenCalledWith('http://api.weatherapi.com/v1/forecast.json?key=53675578cd9b4541826173002241705&q=London&days=7&aqi=no&alerts=no');
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText('Partly cloudy')).toBeInTheDocument());
    expect(screen.getByText('25°C / 20°C')).toBeInTheDocument();
    expect(screen.getByAltText('Partly cloudy')).toBeInTheDocument();
  });

  it('should display error message if failed to fetch weather data', async () => {
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch weather data'));

    render(<Weather />);

    const cityInput = screen.getByPlaceholderText('Enter city name');
    const searchButton = screen.getByText('Search');

    userEvent.type(cityInput, 'InvalidCity');
    userEvent.click(searchButton);

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText('Error: Failed to fetch weather data')).toBeInTheDocument());
  });
});
