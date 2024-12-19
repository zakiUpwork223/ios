import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../../App';
import styles from './style/CreateAccountScreenStyle';
import { supabase } from '../../lib/supabaseClient';
import config from '../../config';

const CreateAccountScreen = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignUp() {
    const { error, data } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: `${name} ${surname}`,
        },
      },
    });

    console.log('SIGNUP USER');
    console.log('DATA', data);
    console.log('ERROR', error);

    if (error) {
      console.log(error.message);
      return;
    }

    const userId = data?.user?.id; // Retrieve user ID from response

    if (!userId) {
      console.error('User ID is missing');
      return;
    }

    navigation.navigate('CheckYourScreen', { email }); // Navigate to CheckYourScreen

    console.log('AFTER CHECK YOUR SCREEN', userId);

    // CREATE STIRPE CUSTOMER ID
    const createCustomer = await fetch(
      `${config.backendUrl}/api/create-customer`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          email: email,
        }),
      },
    );

    const { customerId } = await createCustomer.json();
    console.log('CREATE-CUSTOMER -> Customer ID:', customerId);

    // Optionally insert profile data into another table
    const updateRes = await fetch(`${config.backendUrl}/api/update-account`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        subscriptionId: 'Free', // Set subscriptionId to 'Free' for initial signup
        plan: 'Free',
        customerId: customerId,
        tokensPerPlan: 0,
      }),
    });

    const updateData = await updateRes.json();

    console.log('UPDATE-ACCOUNT ->', updateData);
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }} >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.container}>
            <View style={styles.logoImagen}>
              <Image
                source={require('../../img/logo/logo.png')}
                style={styles.logo}
              />
            </View>

            {/* Titulo Inicial */}
            <View style={styles.titleInicioSesion}>
              <Text style={styles.title}>
                Let’s start by creating your{' '}
                <Text style={styles.highlight}>account</Text>
              </Text>
            </View>

            {/* Container Forms */}
            <View style={styles.containerForms}>
              <TextInput
                placeholder="Name"
                placeholderTextColor="#000"
                style={styles.input}
                value={name}
                onChangeText={setName} // Vincula el valor del input con el estado
              />
              <TextInput
                placeholder="Surname"
                placeholderTextColor="#000"
                style={styles.input}
                value={surname}
                onChangeText={setSurname} // Vincula el valor del input con el estado
              />
              <TextInput
                placeholder="Email"
                placeholderTextColor="#000"
                style={styles.input}
                value={email}
                onChangeText={setEmail} // Vincula el valor del input con el estado
              />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#000"
                secureTextEntry
                style={styles.input}
                value={password}
                onChangeText={setPassword} // Vincula el valor del input con el estado
              />

              <View style={styles.containerButton}>
                <TouchableOpacity
                  style={styles.ButtonLogin}
                  onPress={handleSignUp} // Llama a la función para crear la cuenta
                >
                  <Text style={styles.ButtonLoginText}>Create Account</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.registerContainer}>
                <Text>
                  Already have an account?{' '}
                  <Text
                    style={styles.Login}
                    onPress={() => navigation.navigate('Login')}>
                    Login
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default CreateAccountScreen;
