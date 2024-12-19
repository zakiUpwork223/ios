import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStackParamList} from '../../App';
import styles from './style/ForgotPasswordStyles';
import {useToast} from '../../context/ToastContext';
import {supabase} from '../../lib/supabaseClient';
import config from '../../config';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const {showToast} = useToast();

  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    setLoading(true);
    console.log(email);

    const {data, error} = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${config.backendUrl}/new-password`, // Replace with your app's URL scheme
    });

    console.log('Data', data);

    setLoading(false);

    if (error) {
      showToast(error.message, 'error');
    } else {
      setEmailSent(true);
      showToast(
        'Check your email for instructions to reset your password.',
        'info',
      );
    }
  };

  const returnToHome = () => {
    navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={[styles.container, modalVisible && styles.containerShadow]}>
        <View style={styles.logoImagen}>
          <TouchableOpacity onPress={returnToHome}>
            <Image
              source={require('../../img/logo/logo.png')}
              style={styles.logo}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Let's <Text style={styles.highlight}>recover</Text> your password
          </Text>
          <Text style={styles.subtitle}>
            {emailSent
              ? 'Check your email for instructions to reset your password'
              : 'Enter your email to receive a code to recover your password'}
          </Text>
        </View>
        <View style={styles.containerForms}>
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            placeholderTextColor={'#000'}
            onChangeText={setEmail}
          />

          <View style={styles.containerButton}>
            <TouchableOpacity
              style={styles.ButtonLogin}
              onPress={handleSendCode}>
              <Text style={styles.ButtonLoginText}>
                {emailSent ? 'Resend code' : 'Recover password'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ForgotPasswordScreen;
