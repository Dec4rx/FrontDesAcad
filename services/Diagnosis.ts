import { BASE_URL } from "@/constants/Services";
import { DiagnosisForm, DiagnosisFormString } from "./interfaces/AcademicHead";

export const getDiagnosis = async () => {
    try {
        const response = await fetch(`${BASE_URL}/diagnosis`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Failed');
        }
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

export const registerDiagnostic = async (data: DiagnosisForm) => {
    try {
      const response = await fetch(`${BASE_URL}/diagnosis`, {
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
      // Mostrar el error completo para debugging
      console.error('Error durante la creación del diagnóstico:', error);
  
      // Propaga el error para que el frontend lo maneje correctamente
      throw error;
    }
  }
  
