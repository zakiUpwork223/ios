export const fetchPatientSessions = async (
  baseUrl: string,
  patientId: string,
) => {
  try {
    const response = await fetch(
      `${baseUrl}/sessions/patient?patient_id=${patientId}`,
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching sessions for patient ${patientId}:`, error);
    throw error;
  }
};
