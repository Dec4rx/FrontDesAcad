import { BASE_URL } from '../constants/Services';

export const getCompletedCourses = async (id: number) => {
    try {
      const response = await fetch(`${BASE_URL}/professor-course/${id}/finished`, {
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