import { BASE_URL } from "@/constants/Services";
import { DiagnosisForm } from "./interfaces/AcademicHead";

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

export const registerCourse = async (data: DiagnosisForm) => {
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
            console.error('Failed to register course->', await response.json());
            throw new Error('Failed to register course');
        }
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }

}