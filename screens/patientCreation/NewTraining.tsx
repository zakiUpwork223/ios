import React, {useState, useContext} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {colors} from '../../style';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {AuthContext, RootStackParamList} from '../../App';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faHome} from '@fortawesome/free-solid-svg-icons';
import {
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import {startJob} from '../../services/ApiStartJob.tsx';

import styles from './style/newTrainingStyles';

//Android Permissions
import {Platform} from 'react-native';
import {
  request,
  PERMISSIONS,
  RESULTS,
  Permission,
} from 'react-native-permissions';

//--Navigation--
import {useRoute, RouteProp} from '@react-navigation/native';
import {createTransaction} from '../../services/ApiCreateTransaction.tsx';
import {getUserTokens} from '../../services/ApiGetTokens.tsx';
import {useToast} from '../../context/ToastContext.tsx';

type NewTrainingRouteProp = RouteProp<RootStackParamList, 'NewTraining'>;

const NewTraining = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<NewTrainingRouteProp>();
  const {session} = useContext(AuthContext);
  const {showToast} = useToast();

  const trainerID = session?.user.id;

  const {patientId} = route.params || {}; // Obtén el patientId del parámetro de navegación

  const [tokens, setTokens] = useState(0);
  const [selectedOption, setSelectedOption] = useState<'Treadmill' | 'Track'>(
    'Treadmill',
  );
  const [speed, setSpeed] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      const getTokens = async () => {
        try {
          const {remainingTokens} = await getUserTokens(trainerID);
          if (!remainingTokens && remainingTokens < 0) {
            console.error('No se pudo obtener los tokens');
            return;
          }
          console.log('tokens', remainingTokens);
          setTokens(remainingTokens);
        } catch (error) {
          console.error('Error al obtener los tokens:', error);
        }
      };

      getTokens();
    }, [trainerID]),
  );

  console.log('PatientID recibido', patientId);

  //--video--
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [videoSelected, setVideoSelected] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const selectVideo = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'video',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('Usuario canceló la selección de video');
      } else if (response.errorCode) {
        console.log('Error:', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        if (uri) {
          setVideoUri(uri);
          setVideoSelected(true); // Actualiza el estado aquí
          console.log('Video seleccionado:', uri);
        }
      }
    });
  };

  // Permissions

  const requestPermissions = async () => {
    let permission: Permission | undefined;

    if (Platform.OS === 'ios') {
      permission = PERMISSIONS.IOS.PHOTO_LIBRARY;
    } else if (Platform.OS === 'android') {
      const sdkInt = Number(Platform.Version);
      if (sdkInt >= 33) {
        // Android 13 o superior
        permission = PERMISSIONS.ANDROID.READ_MEDIA_VIDEO;
      } else {
        // Android 12 y versiones anteriores
        permission = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
      }
    }

    if (permission) {
      const result = await request(permission);

      if (result === RESULTS.GRANTED) {
        console.log('Permiso concedido');
        selectVideo();
      } else if (result === RESULTS.DENIED) {
        console.log('Permiso denegado pero se puede solicitar nuevamente');
        showToast('Photo library permission denied. Check your settings');
        // Puedes decidir si vuelves a solicitar el permiso o informas al usuario
      } else if (result === RESULTS.BLOCKED) {
        console.log('Permiso denegado y no se puede solicitar nuevamente');
        showToast('Photo library permission denied. Check your settings');
        // Informa al usuario que debe habilitar el permiso manualmente desde la configuración
      } else {
        showToast('Photo library permission denied. Check your settings');
        console.log('Resultado desconocido:', result);
      }
    } else {
      showToast('Photo library permission denied. Check your settings');
      console.log(
        'No se pudo determinar el permiso para la plataforma actual.',
      );
      // Maneja el caso en que la plataforma no es ni iOS ni Android
    }
  };

  // Api Video

  const handleSubmitVideo = async () => {
    if (!videoUri) {
      console.log('Por favor, selecciona un video primero.');
      return;
    }

    const baseUrl = 'https://back.couro.io';
    const sessionDate = getCurrentDate();

    try {
      setIsLoading(true); // Iniciar la carga
      console.log('Enviando el video a startJob...');

      const data = await startJob(
        baseUrl,
        patientId,
        sessionDate,
        videoUri,
        selectedOption === 'Treadmill',
        Number(speed),
      );

      console.log('¡Video enviado exitosamente!');

      console.log(data.data);

      const training_session_payload = {
        couro_score: data.data.scores.couro_score,
        elbow_score: data.data.scores.elbow_score,
        knee_score: data.data.scores.knee_score,
        shoulder_score: data.data.scores.shoulder_score,
        hip_score: data.data.scores.hip_score,
        stride_video: data.data.session.stride_video,
        completion: data.data.session.completion,
        pose_video: data.data.session.pose_video,
        session_id: data.data.session.session_id,
        patient_id: data.data.session.patient_id,
      };

      console.log('training_session_payload');

      const transactionData = await createTransaction(
        trainerID,
        data.data.session.session_id,
      );

      if (transactionData) {
        console.log('Transacción creada exitosamente');
        setVideoSelected(false);
        setVideoUri(null);
        navigation.navigate('TrainingSession', training_session_payload);
      }
    } catch (error) {
      console.error('Error al enviar el video:', error);
    } finally {
      setIsLoading(false); // Finalizar la carga
    }
  };

  const getCurrentDate = () => {
    const date = new Date();
    const yyyy = date.getFullYear();
    const mm = ('0' + (date.getMonth() + 1)).slice(-2); // Los meses empiezan en 0
    const dd = ('0' + date.getDate()).slice(-2);
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <View style={styles.containerText}>
          <Text style={styles.subtitle}>{getCurrentDate()}</Text>

          {/* Title */}
          <Text style={styles.title}>Training Session</Text>
        </View>

        <View style={styles.containerImage}>
          {/* Circle Home */}
          <TouchableOpacity
            style={styles.circleContainer}
            onPress={() => navigation.navigate('Home')}>
            <FontAwesomeIcon icon={faHome} size={30} color={colors.secondary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.containerScore}>
        <View>
          <View style={styles.containerCouroRun}>
            <Text style={styles.trainingTextSession}>Couro Analysis</Text>
            <Text style={styles.couroRun}>
              Unlock the power of Couro: Upload your training session for
              in-depth analysis and insights
            </Text>
          </View>

          {tokens <= 0 ? (
            <View style={styles.warningBox}>
              <Text style={styles.warningText}>
                You don't have enough tokens to upload a new sessions.
              </Text>

              <Text style={styles.warningText}>
                Subscribe to a plan to unlock this feature.
              </Text>
              <TouchableOpacity
                style={styles.billingButton}
                onPress={() => navigation.navigate('Billing')}>
                <Text style={styles.billingButtonText}>Unlock analysis</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.inputContainer}>
              <View style={styles.toggleContainer}>
                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    selectedOption === 'Treadmill' &&
                      styles.toggleButtonSelected,
                  ]}
                  onPress={() => setSelectedOption('Treadmill')}>
                  <Text style={styles.toggleButtonText}>Treadmill</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    selectedOption === 'Track' && styles.toggleButtonSelected,
                  ]}
                  onPress={() => setSelectedOption('Track')}>
                  <Text style={styles.toggleButtonText}>Track</Text>
                </TouchableOpacity>
              </View>
              {selectedOption === 'Treadmill' && (
                <TextInput
                  placeholder="Speed"
                  placeholderTextColor="#000"
                  style={styles.input}
                  value={speed}
                  onChangeText={setSpeed}
                  keyboardType="numeric"
                />
              )}
              <View style={styles.containerUpdload}>
                {isLoading ? (
                  <Text style={styles.loadingText}>Processing video...</Text>
                ) : (
                  <TouchableOpacity
                    disabled={tokens <= 0 && !videoSelected}
                    style={[
                      styles.updloadVideo,
                      videoSelected && styles.updloadVideoSelected,
                    ]}
                    onPress={
                      videoSelected ? handleSubmitVideo : requestPermissions
                    }>
                    <Text style={styles.textUpload}>
                      {tokens < 0 && !videoSelected
                        ? 'Insufficient tokens'
                        : videoSelected
                        ? 'Get analysis'
                        : 'Upload Video'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default NewTraining;
