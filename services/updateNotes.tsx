// Services/updateNotes.ts
export const updateNotes = async (
    baseUrl: string, 
    sessionId: string, 
    patientId: string, 
    notes: string
) => {
    try {
        const response = await fetch(`${baseUrl}/sessions/notes`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                session_id: sessionId,
                patient_id: patientId,
                notes: notes,
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Notes updated successfully:', data);
        return data;
    } catch (error) {
        console.error('Error updating notes:', error);
        throw error;
    }
};
