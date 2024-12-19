import config from '../config';

export const getUserTokens = async (trainer_id: string) => {
  try {
    const response = await fetch(
      `${config.backendUrl}/api/get-customer-token?userId=${trainer_id}`,
      {
        method: 'GET',
      },
    );

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
