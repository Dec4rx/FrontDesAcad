import { BASE_URL } from "@/constants/Services";
import { Alert } from 'react-native';



export const onAuthorize = async (id:number, authKey:string) => {
    try {
        const response = await fetch(`${BASE_URL}/authorizer/authorize/${id}?claveAutorizacion=${authKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            
        });

        if (response.ok) {
            Alert.alert("Autorización", "Diagnóstico autorizado con éxito.");
        } else {
            throw new Error('No se pudo autorizar el diagnóstico');
        }
    } catch (error: unknown) {
        // Verificar si el error es una instancia de Error y tiene la propiedad message
        if (error instanceof Error) {
            Alert.alert("Error", error.message);
        } else {
            // Si el error no es una instancia de Error, puede ser una string o un tipo primitivo
            Alert.alert("Error", "Ocurrió un error desconocido");
        }
    };
}

export const onReject = async (id: number, feedback:string) => {
    try {
        const response = await fetch(`${BASE_URL}/authorizer/feedback/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: feedback
        })
        ;

        if (response.ok) {
            
            Alert.alert("Retroalimentación", "Feedback enviado y diagnóstico rechazado con éxito.");
        } else {
            throw new Error('No se pudo enviar el feedback');
        }
    } catch (error: unknown) {
        // Verificar si el error es una instancia de Error y tiene la propiedad message
        if (error instanceof Error) {
            Alert.alert("Error", error.message);
        } else {
            // Si el error no es una instancia de Error, puede ser una string o un tipo primitivo
            Alert.alert("Error", "Ocurrió un error desconocido");
        }
    }
};