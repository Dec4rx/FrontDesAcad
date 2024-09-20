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
        // const dataToSend = {
        //     ...data, dateDiagnosis: new Date().toISOString().split('T')[0],
        //     startDate: new Date().toISOString().split('T')[0],
        //     endDate: new Date().toISOString().split('T')[0]
        // };
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