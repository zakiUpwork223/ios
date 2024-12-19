export const resetPassword = async (
    baseUrl: string,
    email: string,
    code: string,
    newPassword: string
) => {
    try {
        const response = await fetch(`${baseUrl}/auth/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email.toLowerCase(),
                confirmation_code: code,
                new_password: newPassword,
            }),
        });

        console.log('Request sent to:', `${baseUrl}/auth/reset-password`);
        console.log('Request body:', {
            email: email.toLowerCase(),
            confirmation_code: code,
            new_password: newPassword,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Response received:', data);
        return data;
    } catch (error) {
        console.error('Error resetting password:', error);
        throw error;
    }
};
