import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { colors } from '../../style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp, useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import styles from './style/ForgotPasswordStyles';
import { AuthStackParamList } from '../../App';
import { resetPassword } from '../../services/ApiResetPassword'; // Importa la función

type TapYourNewPasswordRouteProp = RouteProp<AuthStackParamList, 'TapYourNewPassword'>;

const TapYourNewPassword = () => {
    const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
    const route = useRoute<TapYourNewPasswordRouteProp>();

    const { email, code } = route.params;

    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const validatePassword = (password: string) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const isValid = hasUpperCase && hasSymbol;

        if (!isValid) {
            setErrorMessage("Password must contain at least one uppercase letter and one symbol.");
        }

        return isValid;
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmNewPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        if (!validatePassword(newPassword)) {
            return;
        }

        try {
            const baseUrl = 'https://back.couro.io'; // Reemplaza con tu URL base
            await resetPassword(baseUrl, email, code, newPassword);
            navigation.navigate('ConfirmPassword');
        } catch (error) {
            setErrorMessage('Failed to reset password. Please try again.');
        }
    };

    return (
        <SafeAreaView style={[styles.scrollViewContainer]}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <View style={[styles.container]}>
                    <View style={styles.logoImagen}>
                        <Image source={require('../../img/logo/logo.png')} style={styles.logo} />
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>
                            Type your new <Text style={styles.highlight}>password</Text>
                        </Text>
                    </View>
                    <View style={styles.containerForms}>
                        <TextInput
                            placeholder="New Password"
                            style={styles.input}
                            secureTextEntry
                            value={newPassword}
                            onChangeText={setNewPassword}
                        />
                        <TextInput
                            placeholder="Confirm New Password"
                            style={styles.input}
                            secureTextEntry
                            value={confirmNewPassword}
                            onChangeText={setConfirmNewPassword}
                        />
                        {errorMessage ? (
                            <Text style={{ color: 'red', marginTop: 10 }}>{errorMessage}</Text>
                        ) : null}

                        <View style={styles.containerButton}>
                            <TouchableOpacity
                                style={styles.ButtonLogin}
                                onPress={handleChangePassword}
                            >
                                <Text style={styles.ButtonLoginText}>Change Password</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default TapYourNewPassword;
