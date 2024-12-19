export const fetchPatientDetails = async (
  baseUrl: string,
  patientId: string,
) => {
  try {
    const response = await fetch(`${baseUrl}/patient/?patient_id=${patientId}`);
    console.log('Response: ', response);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching details for patient ${patientId}:`, error);
    throw error;
  }
};
