import { BASE_URL } from '../constants/Services';
import { Professor_Course } from './interfaces/Professor_Course';

export const getInfoCourseRegistration = async () => {
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

  export const registerCourse = async (data: Professor_Course) => {
    try {
        const response = await fetch(`${BASE_URL}/professor-course`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          return await response.json();
        } else {
          throw new Error('Failed to register course');
        }
      } catch (error) {
        console.error('Error during login:', error);
        throw error;
      }

  }