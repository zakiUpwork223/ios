// ../services/DeletePatient.tsx

export const deletePatient = async (baseUrl: string, patientId: string, trainerId: string) => {
    try {
        // Construir la URL con los parámetros
        const url = `${baseUrl}/patient/?patient_id=${patientId}&trainer_id=${trainerId}`;

        console.log('URL para la solicitud DELETE:', url);

        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        console.log('Respuesta del servidor:', response);

        if (!response.ok) {
            console.error('Detalles del error:', data);
            throw new Error(data.message || 'Algo salió mal');
        }

        console.log('Paciente eliminado con éxito:', data);
        return data;
    } catch (error) {
        console.error('Error al eliminar el paciente:', error);
        throw error;
    }
};
