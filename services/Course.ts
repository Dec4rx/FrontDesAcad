// services/courseService.js
import { BASE_URL } from '../constants/Services';
import { FormCourseRegistration } from './interfaces/Coordinators';

export const registerCourse = async (courseData: FormCourseRegistration) => {
  try {
    const response = await fetch(`${BASE_URL}/course`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(courseData),
    });

    if (!response.ok) {
      const errorData = await response.json(); // Intenta capturar el JSON con los errores del backend
      console.error('Server errors:', errorData); // Muestra los errores en la consola para depuración
      throw new Error(JSON.stringify(errorData)); // Lanza un error con los detalles capturados
    }

    return await response.json(); // Retorna la respuesta JSON si es exitosa
  } catch (error) {
    console.error('Error during course registration:', error);
    throw error; // Lanza el error para que sea capturado en el frontend
  }
};
