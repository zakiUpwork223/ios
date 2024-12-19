import React, {useEffect, useState, useContext, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';

import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Button,
  Image,
} from 'react-native';
import {colors, fontSizes} from '../../style';
import {
  NavigationProp,
  useNavigation,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import {AuthContext, RootStackParamList} from '../../App';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faSearch,
  faPlus,
  faXmark,
  faHome,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import styles from './style/HomeScreenStyles';
import DatePicker from 'react-native-date-picker'; // Importa el selector de fecha

import { supabase } from '../../lib/supabaseClient';

// Api
import {fetchTrainerPatients} from '../../services/ApiServicePatient';
import {fetchPatientDetails} from '../../services/ApiPatient';
import {createPatient} from '../../services/createPatientApi';

import {TrainerContext} from '../TrainerContext';
import {useToast} from '../../context/ToastContext';
import ToastCustom from '../components/ToastCustom';
import {formatDateString} from '../../utils/helpers';

interface Patient {
  patient_id: string;
  fullname: string;
  birthdate: string;
  height: string;
  weight: string;
  trainer_id: string;
}

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const route = useRoute<HomeScreenRouteProp>();

  const {prueba, userID} = route.params || {};
  const session = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newPatientFullName, setNewPatientFullName] = useState('');
  const [newPatientBirthdate, setNewPatientBirthdate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false); // Estado para controlar la visibilidad del DatePicker

  const [isFirstTime, setIsFirstTime] = useState(false); // Estado para controlar la visibilidad del DatePicker
  const [date, setDate] = useState(new Date()); // Estado para almacenar la fecha seleccionada

  const [newPatientHeight, setNewPatientHeight] = useState('');
  const [newPatientWeight, setNewPatientWeight] = useState('');

  const baseUrl = 'https://back.couro.io';
  const trainerID = session.session.user.id;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {showToast} = useToast();

  const [errorMessage, setErrorMessage] = useState();

  useFocusEffect(
    React.useCallback(() => {
      const fetchFirstTime = async () => {
        try {
          const {data, error} = await supabase
            .from("accounts")
            .select("firstTime")
            .eq("user_id", trainerID)
            .single()

          console.log("FIRST TIME: ", data?.firstTime)

          if (error) {
            console.log("Error fetching data", error)
          } else {
            data.firstTime ? setIsFirstTime(true) : setIsFirstTime(false)
          }

        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      // Llamar a la función getPatients cuando la vista esté enfocada
      fetchFirstTime();
    }, [trainerID]),
  );


  const validateFloat = (num: float) => {
    const regex = /^\d+(\.\d{1,2})?$/;

    if (regex.test(num)) {
      return true;
    } else {
      return false;
    }
  };

    //Checking TrainerContext retriever values in HomeScreen
    console.log('Recovered values of the TrainerCotnext in HomeScreen');
    console.log("======================================================================================")
    console.log('trainerID:', trainerID);
    console.log("======================================================================================")
    console.log(session);


  useFocusEffect(
    React.useCallback(() => {
      const getPatients = async () => {
        try {
          console.log('Sending GET request with the following parameters:');
          console.log('Base URL:', baseUrl);
          console.log('Primer FetchTrainer: ');
          const data = await fetchTrainerPatients(baseUrl, trainerID, prueba);

          console.log('Response from fetchTrainerPatients:', data);

          const patientsWithDetails: Patient[] = await Promise.all(
            data.data.map(async (patient: Patient) => {
              console.log(
                'Fetching details for patient ID:',
                patient.patient_id,
              );
              const patientDetails = await fetchPatientDetails(
                baseUrl,
                patient.patient_id,
              );
              console.log('Response from fetchPatientDetails:', patientDetails);
              return patientDetails.data[0];
            }),
          );

          setPatients(patientsWithDetails);
          console.log(
            'Final list of patients with details:',
            patientsWithDetails,
          );
        } catch (error) {
          console.error('Error fetching patients:', error);
        }
      };

      // Llamar a la función getPatients cuando la vista esté enfocada
      getPatients();
    }, [trainerID]),
  );

  const handleClose = async () => {
    setIsLoading(true);
    const { error } = await supabase
      .from('accounts')
      .update({ firstTime: false })
      .eq('user_id', trainerID);

    if (error) {
      console.error('Error updating firstTime:', error);
      showToast('There was an error redeeming your token. Please try again.');
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setIsFirstTime(false);
      showToast("Token redeemed succesfully")
    }
  };

  const handleCreatePatient = async () => {
    try {
      console.log('Creating patient with the following details:');
      console.log('Full Name:', newPatientFullName);
      console.log('Birthdate:', newPatientBirthdate);
      console.log('Height:', newPatientHeight);
      console.log('Weight:', newPatientWeight);

      if (
        !validateFloat(newPatientHeight) ||
        !validateFloat(newPatientWeight)
      ) {
        throw new Error('Invalid number Height or Weight');
      }

      await createPatient(
        baseUrl,
        trainerID,
        newPatientFullName,
        newPatientBirthdate,
        parseFloat(newPatientHeight),
        parseFloat(newPatientWeight),
      );
      setModalVisible(false);

      console.log('Fetching patients after creating new one.');
      console.log('Segundo fetchTrainerPatients');
      const data = await fetchTrainerPatients(baseUrl, trainerID, prueba);
      console.log('Response from fetchTrainerPatients after creation:', data);

      const patientsWithDetails: Patient[] = await Promise.all(
        data.data.map(async (patient: Patient) => {
          console.log('Fetching details for patient ID:', patient.patient_id);
          const patientDetails = await fetchPatientDetails(
            baseUrl,
            patient.patient_id,
          );
          console.log('Response from fetchPatientDetails:', patientDetails);
          return patientDetails.data[0];
        }),
      );

      setPatients(patientsWithDetails);
      console.log(
        'Updated list of patients with details:',
        patientsWithDetails,
      );
    } catch (error) {
      console.error('Error creating patient:', error);
      setErrorMessage(error.message);
      setTimeout(() => setErrorMessage(), 3000);
    }
  };

  const formatDate = (date: Date) => {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Los meses en JavaScript empiezan desde 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  //--Filter--
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const filtered = patients.filter(patient =>
      patient.fullname.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const sortedPatients = filtered.sort((a, b) => {
      const dateA: any = new Date(a.birthdate);
      const dateB: any = new Date(b.birthdate);
      return dateA - dateB;
    });
    setFilteredPatients(sortedPatients);
  }, [patients, searchTerm]);

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.containerHeader}>
          <View style={styles.containerText}>
            <Text style={styles.title}>
              Your {'\n'}
              <Text style={styles.highlight}>athletes</Text>
            </Text>
          </View>
          <View style={styles.containerImage}>
            <TouchableOpacity
              style={styles.circleContainer}
              onPress={() => navigation.navigate('PatientCreation')}>
              <FontAwesomeIcon icon={faUser} size={30} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search */}
        <View style={styles.containerSearch}>
          <FontAwesomeIcon
            icon={faSearch}
            size={20}
            color={colors.primary}
            style={styles.searchIcon}
          />
          <TextInput
            placeholder=""
            placeholderTextColor={colors.theriary}
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>

        <View style={styles.containerPatients}>
          {filteredPatients.length === 0 ? (
            <View style={styles.noPatientsContainer}>
              <Text style={styles.noPatientsTextFirst}>No athletes found!</Text>
              <Text style={styles.noPatientsTextSecond}>
                Create a new one in the button below
              </Text>
            </View>
          ) : (
            filteredPatients.map((patient, index) => {
              if (index % 2 === 0) {
                return (
                  <View style={styles.rowPatients} key={index}>
                    <TouchableOpacity
                      style={styles.patient}
                      onPress={() =>
                        navigation.navigate('Athlete', {
                          patientId: patient.patient_id,
                          patientName: patient.fullname,
                          height: patient.height,
                          weight: patient.weight,
                          birthdate: patient.birthdate,
                        })
                      }>
                      <Text style={styles.textPatient}>{patient.fullname}</Text>
                      <Text style={styles.datePacient}>
                        {formatDateString(patient.birthdate)}
                      </Text>
                    </TouchableOpacity>

                    {filteredPatients[index + 1] && (
                      <TouchableOpacity
                        style={styles.patient}
                        onPress={() =>
                          navigation.navigate('Athlete', {
                            patientId: filteredPatients[index + 1].patient_id,
                            patientName: filteredPatients[index + 1].fullname,
                            height: filteredPatients[index + 1].height,
                            weight: filteredPatients[index + 1].weight,
                            birthdate: filteredPatients[index + 1].birthdate,
                          })
                        }>
                        <Text style={styles.textPatient}>
                          {filteredPatients[index + 1].fullname}
                        </Text>
                        <Text style={styles.datePacient}>
                          {formatDateString(
                            filteredPatients[index + 1].birthdate,
                          )}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              }
              return null;
            })
          )}
        </View>
      </ScrollView>

      {/* Floating Button */}
      <TouchableOpacity
        style={styles.floatingButtonContainer}
        onPress={() => setModalVisible(true)}>
        <FontAwesomeIcon icon={faPlus} size={30} color={colors.primary} />
      </TouchableOpacity>


        
      <Modal
        visible={isFirstTime}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.tokenModal}>
          <View style={styles.tokenModalContainer}>
            <Image
              source={require('../../img/logo/logo.png')}
              style={styles.tokenModalContentImage}
            />
            <Text style={styles.tokenModalContentTitle}>Welcome to Couro!</Text>
            <Text style={styles.tokenModalContentText}>
              We're excited to have you here. As a special welcome gift, you
              have received a <Text style={{fontWeight: 'bold'}}>free token to use!</Text>
            </Text>
            <Text style={styles.tokenModalContentText}>
              Enjoy this new training experience
            </Text>
            <TouchableOpacity 
              style={styles.tokenModalContentButton}
              onPress={handleClose}
              disabled={isLoading}
            >
              <Text style={styles.tokenModalContentButtonText}>
                {isLoading ? 'Loading...' : 'Redeem my token'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal for New Patient */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{flex: 1}}>
              <ScrollView
                contentContainerStyle={{flexGrow: 1}}
                keyboardShouldPersistTaps="handled">
                <View style={styles.modalContainer}>
                  {errorMessage && (
                    <ToastCustom
                      visible={true}
                      message={errorMessage}
                      type="error"
                    />
                  )}
                  <View style={styles.modalContent}>
                    <View style={styles.containerX}>
                      <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <FontAwesomeIcon
                          icon={faXmark}
                          size={24}
                          color={colors.primary}
                        />
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.modalText}>New athlete</Text>
                    <View style={styles.containerForms}>
                      <TextInput
                        placeholder="Full Name"
                        placeholderTextColor="#000"
                        style={styles.input}
                        value={newPatientFullName}
                        onChangeText={setNewPatientFullName}
                      />
                      <TextInput
                        onPress={() => setShowDatePicker(true)}
                        style={styles.input}
                        placeholder="Birthdate"
                        placeholderTextColor="#000"
                        value={newPatientBirthdate}
                        onChangeText={setNewPatientBirthdate}
                      />

                      {/* Date Picker */}
                      <DatePicker
                        modal
                        open={showDatePicker}
                        date={date} // Este es el estado local del componente
                        mode="date" // Modo selector de fecha
                        onConfirm={selectedDate => {
                          setShowDatePicker(false);
                          const formattedDate = formatDate(selectedDate);
                          setNewPatientBirthdate(formattedDate); // Actualiza la fecha formateada
                        }}
                        onCancel={() => setShowDatePicker(false)}
                      />
                      <View style={styles.rowForms}>
                        <TextInput
                          placeholder="Height(x.x ft)"
                          style={styles.inputMidForms}
                          placeholderTextColor="#000"
                          value={newPatientHeight}
                          onChangeText={setNewPatientHeight}
                          keyboardType="decimal-pad"
                        />
                        <TextInput
                          placeholder="Weight(x.x lb)"
                          placeholderTextColor="#000"
                          style={styles.inputMidForms}
                          value={newPatientWeight}
                          onChangeText={setNewPatientWeight}
                          keyboardType="decimal-pad"
                        />
                      </View>
                      {errorMessage && (
                        <View style={[styles.rowForms, {paddingBottom: 0}]}>
                          <Text
                            style={{color: 'red', fontSize: fontSizes.tiny}}>
                            {errorMessage}
                          </Text>
                        </View>
                      )}
                      <View style={styles.containerButton}>
                        <TouchableOpacity
                          style={styles.ButtonLogin}
                          onPress={handleCreatePatient}>
                          <Text style={styles.ButtonLoginText}>
                            Create athlete
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

export default HomeScreen;
