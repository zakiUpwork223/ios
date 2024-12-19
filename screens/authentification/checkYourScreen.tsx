import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStackParamList} from '../../App';
import styles from './style/CheckYourStyle';

const CheckYourScreen = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const handleConfirmEmail = async () => {
    navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        {/* Título Inicial */}
        <View style={styles.titleInicioSesion}>
          <Text style={styles.title}>
            Check your <Text style={styles.highlight}>email</Text>
          </Text>
          <Text style={styles.textConfirm}>
            We've sent you a confirmation email to create your account.
          </Text>
          <View style={styles.containerButton}>
            <TouchableOpacity
              style={styles.ButtonLogin}
              onPress={handleConfirmEmail} // Llama a la función para confirmar el email
            >
              <Text style={styles.ButtonLoginText}>Go to Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default CheckYourScreen;
