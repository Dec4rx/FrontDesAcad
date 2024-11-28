import { BASE_URL } from "@/constants/Services";
import { CreateSurvey, SurveyResponse } from "./interfaces/Surveys";

export const createSurvey = async (data: CreateSurvey) => {
    try {
      const response = await fetch(`${BASE_URL}/survey/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        return await response.json();
      } else {
        // Captura el error de la respuesta del servidor
        const errorData = await response.json();
  
        // Debug: Mostrar los errores capturados
        console.error('Errores del servidor:', errorData);
  
        // Lanza los errores directamente para que puedan ser capturados en el frontend
        throw errorData;
      }
    } catch (error) {
      console.error('Error durante la creación del la encuesta:', error);
  
      // Propaga el error para que el frontend lo maneje correctamente
      throw error;
    }
  }

  export const submitSurvey = async (data: SurveyResponse) => {
    // console.log("DATA para ya mandar alv--->",data);
    // console.log("DATA para ya mandar alv JSON--->",JSON.stringify(data));
    try {
      const response = await fetch(`${BASE_URL}/survey/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        return await response;
      } else {
        // Captura el error de la respuesta del servidor
        const errorData = await response;
  
        // Debug: Mostrar los errores capturados
        console.error('Errores del servidor:', errorData);
  
        // Lanza los errores directamente para que puedan ser capturados en el frontend
        throw errorData;
      }
    } catch (error) {
      console.error('Error durante la creación del la encuesta:', error);
  
      // Propaga el error para que el frontend lo maneje correctamente
      throw error;
    }
  }