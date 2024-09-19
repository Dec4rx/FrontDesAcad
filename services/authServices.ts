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

    // Captura los errores del backend si la respuesta no es 2xx
    if (!response.ok) {
      const errorData = await response.json(); // Intenta capturar el JSON con los errores del backend
      console.error('Errores del servidor:', errorData); // Muestra los errores en la consola para depuración
      throw new Error(JSON.stringify(errorData)); // Lanza un error con los detalles capturados
    }

    // Retorna la respuesta JSON si es exitosa
    return await response.json();
  } catch (error) {
    console.error('Error durante el registro:', error);
    throw error; // Lanza el error para que sea capturado en el frontend
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
  