// services/authService.js
import { BASE_URL } from '../constants/Services';
import { Sing_up, Login } from './interfaces/AuthInterfaces';

export const sing_up = async (data: Sing_up) => {
  try {
    const response = await fetch(`${BASE_URL}/professor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};


export const login = async (data: Login) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };
  