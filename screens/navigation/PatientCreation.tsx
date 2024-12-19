import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert, Linking } from 'react-native';
import { NavigationProp, useNavigation, useFocusEffect } from '@react-navigation/native';
import { AuthContext, RootStackParamList } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { supabase } from '../../lib/supabaseClient';
import styles from './style/PatientCreationStyle';
import { TrainerContext } from '../TrainerContext';
import { colors } from '../../style';
import { getUserTokens } from '../../services/ApiGetTokens.tsx';
import { useToast } from '../../context/ToastContext';
import { deleteAccountService } from '../../services/ApiDeleteAccount.tsx';

const PatientCreation = () => {
    const [user, setUser] = useState(null);
    const [tokens, setTokens] = useState(0);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const { session } = useContext(AuthContext);

    const trainerEmail = session?.user.email;
    const trainerID = session?.user.id;

    useFocusEffect(
        React.useCallback(() => {
            const getTokens = async () => {
                try {
                    const { remainingTokens } = await getUserTokens(trainerID);
                    if (remainingTokens !== undefined) {
                        setTokens(remainingTokens);
                    } else {
                        console.error('No se pudo obtener los tokens');
                    }
                } catch (error) {
                    console.error('Error al obtener los tokens:', error);
                }
            };

            getTokens();
        }, [trainerID])
    );

    const openUrl = () => {
      navigation.navigate('Billing');
      }

    async function signOut() {
        const { error } = await supabase.auth.signOut();
        if (error) console.error('Error signing out:', error.message);
    }

    async function deleteAccount() {
        Alert.alert(
            "Delete Account",
            "Are you sure you want to delete your account? This action cannot be undone.",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        //@ts-ignore
                        await deleteAccountService(session?.access_token);
                        signOut();
                    }
                }
            ]
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollViewContainer}>
                {/* Header */}
                <View style={styles.containerHeader}>
                    <View style={styles.containerText}>
                        <Text style={styles.title}>
                            Your {"\n"}<Text style={styles.highlight}>settings</Text>
                        </Text>
                    </View>

                    <View style={styles.containerImage}>
                        <TouchableOpacity
                            style={styles.circleContainer}
                            onPress={() => navigation.navigate('Home')}
                        >
                            <FontAwesomeIcon icon={faHome} size={40} color={colors.secondary} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Personal Information */}
                <View style={styles.personalInformation}>
                    <View style={styles.containerInformation}>
                        <Text style={styles.titlePersonalInformation}>Personal Information</Text>
                    </View>

                    <View style={styles.containerForms}>
                        <TextInput placeholder="email" style={styles.input} value={trainerEmail} editable={false} />
                        {/* Display Token Count */}
                        <TextInput value={`Remaining Tokens: ${tokens}`} editable={false} style={styles.input} />
                    </View>
                </View>

                {/* Account Actions */}
                <View style={styles.containerInformation}>
                    <Text style={styles.titlePersonalInformation}>Account Actions</Text>
                </View>

                <View style={styles.bottonsContainer}>
                    <TouchableOpacity style={styles.buttonChange}  onPress={openUrl}>
                        <Text style={styles.changeText}>Billing</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonChange} onPress={signOut}>
                        <Text style={styles.changeText}>Logout</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonChangeRed} onPress={deleteAccount}>
                        <Text style={styles.changeText}>Delete account</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

export default PatientCreation;
