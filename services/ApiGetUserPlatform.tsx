import config from '../config';

export interface UserPlatform {
  customerId: string;
  subscriptionId: string;
  platform: string;
  planId: string;
  appleTransactionId: number;
}

export const getUserPlatform = async (
  trainer_id: string,
): Promise<UserPlatform> => {
  /*return {
    platform: 'apple',
    planId: 'price_1QHVOmGdKKRrbuMHngVIhx4c'
  };*/
  try {
    const response = await fetch(
      `${config.backendUrl}/api/get-subscription-platform?userId=${trainer_id}`,
      {
        method: 'GET',
      },
    );

    // Manejo de la respuesta
    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message || 'Algo salió mal';
      console.error('Detalles del error:', errorData);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('Datos recibidos del servidor:', data);
    return {
      customerId: data.customerId,
      subscriptionId: data.subscriptionId,
      platform: data.subscriptionPlatform,
      planId: data.planId,
      appleTransactionId: data.appleTransactionId,
    };
  } catch (error) {
    console.error('Error al iniciar el trabajo:', error);
    throw error;
  }
};
