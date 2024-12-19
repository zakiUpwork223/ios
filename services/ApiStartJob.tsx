import RNFS from 'react-native-fs';

export const startJob = async (
  baseUrl: string,
  patient_id: string,
  sessionDate: string,
  videoUri: string,
  treadmillMode: boolean,
  speed: number,
) => {
  try {
    // Decodificar la URI del video
    const decodedVideoUri = decodeURIComponent(videoUri);
    console.log('URI del video decodificada:', decodedVideoUri);

    // Verificar si el archivo existe
    const fileExists = await RNFS.exists(decodedVideoUri);
    if (!fileExists) {
      throw new Error(`File not found at path: ${decodedVideoUri}`);
    }
    // Leer el archivo de video en formato base64
    const videoBase64 = await RNFS.readFile(decodedVideoUri, 'base64');

    // Crear un objeto FormData para enviar el archivo y los demás campos
    const formData = new FormData();
    formData.append('file', {
      uri: videoUri,
      type: 'video/mp4',
      name: 'video.mp4',
      data: videoBase64,
    });
    formData.append('patient_id', patient_id);
    formData.append('session_date', sessionDate);
    formData.append('treadmill_mode', treadmillMode ? 'True' : 'False');
    formData.append('speed', speed);

    // Mostrar en consola los datos que se están enviando
    console.log('Datos que se están enviando en FormData:');
    console.log('patient_id:', patient_id);
    console.log('session_date:', sessionDate);
    console.log('file:', videoUri);

    // Realizar la solicitud POST al servidor
    const response = await fetch(`${baseUrl}/sessions/start-job`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

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
