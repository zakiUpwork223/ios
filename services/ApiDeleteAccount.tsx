export const deleteAccountService = async (access_token: string) => {
  console.log('DELETE ACCOUNT:', access_token);
  try {
    const response = await fetch(
      'https://yjlfyicvmwglmjqbloys.supabase.co/functions/v1/delete-user',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    console.log('DELETE Estado de la respuesta:', response.status);

    console.log('Datos recibidos del servidor:', response.status);
    return response.status;
  } catch (error) {
    console.error('Error al iniciar el trabajo:', error);
    throw error;
  }
};
