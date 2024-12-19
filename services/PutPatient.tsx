// ../services/PutPatient.tsx

export const putPatient = async (
    baseUrl: string,
    patientId: string,
    trainerId: string,
    fullname: string,
    birthdate: string,
    height: number,
    weight: number
) => {
    try {
        const response = await fetch(`${baseUrl}/patient/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                patient_id: patientId,
                trainer_id: trainerId,
                fullname: fullname,
                birthdate: birthdate,
                height: height,
                weight: weight
            }),
        });

        const data = await response.json();

        console.log('Put patient response:', response); // Log para ver la respuesta completa

        if (!response.ok) {
            // Imprimir detalles del error antes de lanzarlo
            console.error('Error details:', data);
            throw new Error(data.message || 'Something went wrong');
        }

        console.log('Put patient successful:', data);
        return data;
    } catch (error) {
        console.error('Error with put patient:', error);
        throw error;
    }
};
