import { BASE_URL } from '../constants/Services';

export const sing_up = async () => {
    try {
      const response = await fetch(`${BASE_URL}/course/not-assigned`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
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