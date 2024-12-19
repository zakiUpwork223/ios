export const fetchTrainerPatients = async (
  baseUrl: string,
  trainerId: string,
  token: string,
) => {
  try {
    const response = await fetch(
      `${baseUrl}/patient/trainer?trainer_id=${trainerId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('Response: ', response);

    console.log('Response', response);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching trainer patients:', error);
    throw error;
  }
};
