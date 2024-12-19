import 'react-native-gesture-handler';
import React, { useState, createContext, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Toast from 'react-native-toast-message';

import { TrainerProvider } from './screens/TrainerContext';

import { supabase } from './lib/supabaseClient';

// AuthentificationViews
import LoginScreen from './screens/authentification/LoginScreen';
import CreateAccountScreen from './screens/authentification/CreateAccountScreen';
import ForgotPasswordScreen from './screens/authentification/ForgotPasswordScreen';
import TapYourNewPassword from './screens/authentification/TapYourNewPassword';
import ConfirmPasswordScreen from './screens/authentification/ConfirmPasswordScreen';
import CheckYourScreen from './screens/authentification/checkYourScreen';
// HomeViews
import HomeScreen from './screens/navigation/HomeScreen';
import PatientCreation from './screens/navigation/PatientCreation';

//Patients Views 

import PatientScreen from './screens/patientCreation/patient';

//Training

import NewTraining from './screens/patientCreation/NewTraining';
import TrainingSession from './screens/patientCreation/TrainingSession';
import BillingScreen from './screens/navigation/BillingScreen';
import { Modal, PaperProvider, Portal } from 'react-native-paper';
import { Session } from '@supabase/supabase-js';
import { CustomToast } from './screens/components/ToastCustom';
import { ToastProvider } from './context/ToastContext';

// Defyne the type of routes
export type AuthStackParamList = {
  Login: undefined;
  CreateAccount: undefined;
  ForgotPassword: undefined;
  TapYourNewPassword: {
    email: string;
    code: string;
  };
  ConfirmPassword: undefined;
  CheckYourScreen: {
    email: string;
  };
};

export type HomeStackParamList = {
  Home: {
    userID: string,
  };
  PatientCreation: undefined;
  Athlete: { patientId: string, patientName: string, birthdate: string, height: string, weight: string };
  NewTraining: {
    patientId: string // Añadir el parámetro patientId aquí 
  };
  TrainingSession: {
    couro_score: string;
    shoulder_score: string;
    elbow_score: string;
    hip_score: string;
    knee_score: string;
    pose_video_url: string;
    stride_video_url: string;
    completion: string;
    session_id: string; // Agregar aquí
    patient_id: string; // Agregar aquí
  };
};



export type RootStackParamList = AuthStackParamList & HomeStackParamList;

const AuthStack = createStackNavigator<AuthStackParamList>();
const HomeStack = createStackNavigator<HomeStackParamList>();

const AuthStackScreen = () => (
  <AuthStack.Navigator initialRouteName="Login">
    <AuthStack.Screen name="Login" component={LoginScreen}
      options={{ headerShown: false }}

    />
    <AuthStack.Screen
      name="CreateAccount"
      component={CreateAccountScreen}
      options={{ headerShown: false }}

    />
    <AuthStack.Screen name="ForgotPassword"
      component={ForgotPasswordScreen}
      options={{ headerShown: false }}

    />
    <AuthStack.Screen name="TapYourNewPassword" component={TapYourNewPassword} />
    <AuthStack.Screen name="ConfirmPassword" component={ConfirmPasswordScreen} />

    <AuthStack.Screen name="CheckYourScreen" component={CheckYourScreen} options={{headerShown: false}} />

  </AuthStack.Navigator>
);

const HomeStackScreen = () => (
  <HomeStack.Navigator initialRouteName="Home">
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />

    <HomeStack.Screen
      name="PatientCreation"
      component={PatientCreation}
      options={{ headerShown: false }}
    />

    <HomeStack.Screen
      name="Athlete"
      component={PatientScreen}
      options={{ headerShown: false }}
    />

    <HomeStack.Screen
      name="Billing"
      component={BillingScreen}
      options={{ headerShown: false }}
    />

    <HomeStack.Screen
      name="NewTraining"
      component={NewTraining}
      options={{ headerShown: false }}

    />


    <HomeStack.Screen
      name="TrainingSession"
      component={TrainingSession}
      options={{ headerShown: false }}
    />
  </HomeStack.Navigator>

);




// Context for aunthentification, for testing purposes only
const AuthContext = createContext<{ session: Session | null }>({ session: null })

export default function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark'
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    // Fetch the initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // Listen for changes in the session
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  return (
    <AuthContext.Provider value={{ session }}>
      <PaperProvider>
        <TrainerProvider>
          <NavigationContainer>
            <ToastProvider>
              <SafeAreaView style={[{ flex: 1 }, backgroundStyle]}>
                <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
                {session ? (
                  <HomeStackScreen />
                ) : (
                  <AuthStackScreen />
                )}
              </SafeAreaView>
            </ToastProvider>
          </NavigationContainer>
        </TrainerProvider>
      </PaperProvider>
    </AuthContext.Provider>
  )
}

export { AuthContext };
export default App;
