import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Linking,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import styles from './style/LoginScreenStyle';
import {RootStackParamList} from '../../App';

import {supabase} from '../../lib/supabaseClient';

import {TrainerContext} from '../TrainerContext';
import {useToast} from '../../context/ToastContext';
import config from '../../config';

const LoginScreen = () => {
  const {setTrainerID, setTrainerEmail} = useContext(TrainerContext);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {showToast} = useToast();

  async function signInWithEmail() {
    const {data, error} = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    console.log('SIGN IN WITH EMAIL: ', data);

    if (error) {
      console.log(error);
      showToast(error.message, 'error');
      return;
    }

    const user_id = data.user.id;

    console.log(user_id);
    setTrainerID(data!.user!.id);
    setTrainerEmail(email);

    navigation.navigate('Home', {userID: user_id});
  }

  /* const handleLogin = async () => {
    try {
        const baseUrl = 'http://back.couro.io'; // Reemplaza con tu URL base
        const data = await loginUser(baseUrl, email, password);
        console.log('Login response:', data);

        // Extraer las constantes token y userID
        const token = data.data.token;
        const userID = data.data.user.user_id;

        // Imprimir las constantes en la consola
        console.log('Token:', token);
        console.log('UserID:', userID);

        setTrainerID(userID);
        setToken(token);

        
        const prueba = token;
        signIn();
        navigation.navigate('Home', { prueba, userID });
    } catch (error) {
        console.error('Failed to log in:', error);
    }
  };
 */

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
          <View style={styles.container}>
            <View style={styles.logoImagen}>
              <Image
                source={require('../../img/logo/logo.png')}
                style={styles.logo}
              />
            </View>
            <View style={styles.titleInicioSesion}>
              <Text style={styles.title}>
                Unlock your run potential{' '}
                <Text style={styles.highlight}>here</Text>
              </Text>
            </View>
            <View style={styles.containerForms}>
              <TextInput
                placeholder="Email"
                style={styles.input}
                placeholderTextColor="#000"
                value={email}
                onChangeText={setEmail} // Vincula el valor del input
              />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#000"
                secureTextEntry
                style={styles.input}
                value={password}
                onChangeText={setPassword} // Vincula el valor del input
              />
              <View style={styles.containerForgot}>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(`${config.backendUrl}/forgot-password`)
                  }>
                  <Text style={styles.forgotPassword}>Forgot password?</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.containerButton}>
                <TouchableOpacity
                  style={styles.ButtonLogin}
                  onPress={signInWithEmail}>
                  <Text style={styles.ButtonLoginText}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.registerContainer}>
              <Text>
                Don’t have an account?{' '}
                <Text
                  style={styles.register}
                  onPress={() => navigation.navigate('CreateAccount')}>
                  Register
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
