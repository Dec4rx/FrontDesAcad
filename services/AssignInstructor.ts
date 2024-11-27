import { BASE_URL } from "@/constants/Services";

export const submitInstructor = async (instructorName: string, username: string, password: string, courseId: number) => {
    const data = {
        name: instructorName,
        username: username,
        password: password,
        courseId: courseId
    };

    try {
        const response = await fetch(`${BASE_URL}/instructors`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Error al enviar datos');
        }

        const result = await response.json(); // O maneja la respuesta como necesites
        console.log('Resultado:', result);
        alert('Instructor creado y asignado correctamente');
    } catch (error) {
        console.error('Error:', error);
        alert('Error al crear y asignar el instructor');
    }
};
