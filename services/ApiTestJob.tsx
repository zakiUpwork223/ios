// ../services/ApiTestJob.tsx

export const testJob = async (baseUrl: string) => {
  try {
    const response = await fetch(`${baseUrl}/sessions/ai/test`, {
      method: 'GET', // Cambiado de 'POST' a 'GET'
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    console.log('Test job response:', response); // Agrega este log para ver toda la respuesta

    if (!response.ok) {
      // Imprime más detalles del error antes de lanzarlo
      console.error('Error details:', data);
      throw new Error(data.message || 'Something went wrong');
    }

    console.log('Test job successful:', data);
    return data;
  } catch (error) {
    console.error('Error with test job:', error);
    throw error;
  }
};
