import config from '../config';

export const createTransaction = async (
  trainer_id: string,
  session_id: string,
) => {
  try {
    const payload = {
      userId: trainer_id,
      sessionId: session_id,
    };

    const response = await fetch(
      `${config.backendUrl}/api/create-transaction`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    );

    // Log de la respuesta del servidor
    console.log('Estado de la respuesta:', response.status);

    // Manejo de la respuesta
    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message || 'Algo salió mal';
      console.error('Detalles del error:', errorData);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('Datos recibidos del servidor:', data);
    return data;
  } catch (error) {
    console.error('Error al iniciar el trabajo:', error);
    throw error;
  }
};
