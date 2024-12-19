import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { colors } from '../../style';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { AuthContext, RootStackParamList } from "../../App";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus, faHome, faEdit } from '@fortawesome/free-solid-svg-icons';
import styles from './style/patientScreenStyles';
import { fetchPatientSessions } from '../../services/ApiPatientSessions';
import { LineChart } from 'react-native-chart-kit';
import { TrainerContext } from '../TrainerContext';

//Modal
import EditPatientModal from '../components/EditPatientModal';
import { formatDateString } from '../../utils/helpers';

const screenWidth = Dimensions.get("window").width;


const PatientScreen = () => {
  const {session} = useContext(AuthContext);
  const trainerID = session?.user.id || '';

  console.log('Patient Screen - Trainer ID:', trainerID);

  // -- Modal --


  // Estado para controlar la visibilidad del modal
  const [isModalVisible, setModalVisible] = useState(false);

  const handleEditClick = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleDelete = () => {
    // Lógica para eliminar el paciente
    console.log('Paciente eliminado');
  };

  const handleSave = (name: string, height: string, weight: string, birthdate: string) => {
    // Lógica para guardar los cambios
    console.log('Datos guardados:', { name, height, weight, birthdate });
    setModalVisible(false);
  };



  // -- Gráfico --
  interface ChartData {
    labels: string[];
    datasets: { data: number[]; strokeWidth: number }[];
  }

  // Estado del gráfico
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [{ data: [], strokeWidth: 2 }],
  });


  type Session = {
    session: {
      timestamp: string;
      session_date: string;
      pose_video: string;
      stride_video: string;
      completion: string;
      session_id: string;  // Agregar propiedad session_id
      patient_id: string;  // Agregar propiedad patient_id
      notes: string;

    };
    score: {
      couro_score: string;
      shoulder_score: string;
      elbow_score: string;
      hip_score: string;
      knee_score: string;
    };
  };

  type SessionData = {
    data: Session[];
    message: string;
  };

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Athlete'>>();

  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const baseUrl = 'https://back.couro.io';

  // Couro Average

  const [averageCouroScore, setAverageCouroScore] = useState<number | null>(null);
  const [tooltipData, setTooltipData] = useState<{ date: string | null, x: number, y: number } | null>(null);


  const formatDate = (dateString: string) => {
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);
    return `${year}-${month}-${day}`;
  };


  useEffect(() => {
    const loadPatientSessions = async () => {
      try {
        const patientId = route.params?.patientId;
        console.log('Patient ID:', patientId);
        if (patientId) {
          const data = await fetchPatientSessions(baseUrl, patientId);
          console.log('Session data:', JSON.stringify(data, null, 2)); // Imprimir con formato

          const newSessionData = [...data.data].sort((a: Session, b: Session) => {
            const dateA = new Date(formatDate(a.session.session_date).split('/').reverse().join('-'));
            const dateB = new Date(formatDate(b.session.session_date).split('/').reverse().join('-'));

            return dateB - dateA;
          });

          newSessionData.map((item: Session) => {
            const session_date = item.session.session_date;
            return {
              ...item,
              session_date,
            };
          });

          const newData = {
            data: newSessionData,
            message: data.message
          }

          setSessionData(newData);

          const sessionData = data.data.map((item: Session) => ({
            date: formatDate(item.session.session_date),
            score: parseFloat(item.score.couro_score),
          }));

          sessionData.sort((a, b) => {
            const dateA = new Date(a.date.split('/').reverse().join('-'));
            const dateB = new Date(b.date.split('/').reverse().join('-'));

            return dateA - dateB;
          });

          // Extraer los datos ordenados para los labels y datasets
          const dates = sessionData.map((item) => formatDateString(item.date)); // Extrae las fechas ordenadas
          const scores = sessionData.map((item) => item.score); // Extrae los puntajes ordenados


          // Preparar datos para el gráfico
          // const dates = data.data.map((item: Session) => formatDate(item.session.session_date)); // Convierte las fechas
          // const scores = data.data.map((item: Session) => parseFloat(item.score.couro_score)); // Obtiene los puntajes


          // Asignar los datos del gráfico
          setChartData({
            labels: dates,
            datasets: [
              {
                data: scores,
                strokeWidth: 2,
              },
            ],
          });


          // Average Couro
          if (data.data && data.data.length > 0) {
            const totalScore = data.data.reduce((acc: number, item: Session) => {
              const score = parseFloat(item.score.couro_score);
              return acc + (isNaN(score) ? 0 : score); // Maneja NaN correctamente
            }, 0);
            const averageScore = totalScore / data.data.length;
            setAverageCouroScore(averageScore);
          }

        }

      } catch (error) {
        console.error('Error fetching session data:', error);
      }
    };

    loadPatientSessions();
  }, [route.params?.patientId]);


  const handleSessionClick = (session: Session) => {
    navigation.navigate('TrainingSession', {
      couro_score: session.score.couro_score,
      shoulder_score: session.score.shoulder_score,
      elbow_score: session.score.elbow_score,
      hip_score: session.score.hip_score,
      knee_score: session.score.knee_score,
      pose_video: session.session.pose_video,
      stride_video: session.session.stride_video,
      completion: session.session.completion,
      session_id: session.session.session_id,  // Agregar session_id
      patient_id: session.session.patient_id,  // Agregar patient_id
      notes: session.session.notes,
    });
  };

  const patientID = route.params?.patientId;
  console.log('Patient Id Recibido:', patientID);

  return (
    <View style={styles.container}>
      <ScrollView
        onTouchStart={() => setTooltipData(null)}
      >
        {/* Header */}
        <View style={styles.containerHeader}>
          <View style={styles.containerText}>
            <Text style={styles.title}>
              {route.params?.patientName || "Patient"} {"\n"}
            </Text>

            <Text style={styles.textInformation}>
              {`Height: ${route.params?.height} ● Weight: ${route.params?.weight} lbs`}
            </Text>
          </View>

          <View style={styles.containerImage}>
            <TouchableOpacity
              style={styles.circleContainer}
              onPress={() => navigation.navigate('Home')}
            >
              <FontAwesomeIcon icon={faHome} size={30} color={colors.secondary} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.bottomEdit}
              onPress={handleEditClick}

            >
              <FontAwesomeIcon icon={faEdit} size={30} color={colors.secondary} />
            </TouchableOpacity>


          </View>
        </View>

        {/* Personal Information */}
        <View style={styles.personalInformation}>
          <Text style={styles.textInformationSmall}>
            {`: ${formatDateString(route.params?.birthdate)}`}
          </Text>
        </View>



        {/* Gráfico de Couro Score */}
        {chartData.labels.length > 0 && (
          <LineChart
            style={styles.graficalContainer}
            data={chartData}
            width={screenWidth * 0.9} // Ajusta el ancho al 90% del ancho de la pantalla
            height={220}
            yAxisLabel=""
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#f8f8f8',
              backgroundGradientTo: '#f8f8f8',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier

            onDataPointClick={(data) => {
              const date = chartData.labels[data.index];
              setTooltipData({ date, x: data.x, y: data.y });
            }}

            xLabelsOffset={999}  // Oculta completamente las etiquetas del eje X

            yAxisInterval={10}
            fromZero={true}
          />
        )}

        {tooltipData && (
          <View
            style={[
              styles.tooltipContainer,
              {
                position: 'absolute',
                left: tooltipData.x - 30, // Ajusta el margen izquierdo
                top: tooltipData.y + 200,  // Ajusta la altura para que el tooltip esté arriba del punto
              },
            ]}
          >
            <Text style={styles.tooltipText}>{tooltipData.date}</Text>
          </View>
        )}

        {/* Score Container */}
        {averageCouroScore !== null && sessionData && sessionData.data?.length > 0 && (
          <View style={styles.scoreContainer}>
            <Text style={styles.couroTitle}>Couro Score Average</Text>
            <Text style={styles.scoreCouro}>
              {averageCouroScore.toFixed(2)}
            </Text>
          </View>
        )}

        {/* Training Entries */}
        <View style={styles.containerEntries}>
          <Text style={styles.trainingTitle}>
            Training Entries
          </Text>

          {sessionData && sessionData.data?.length > 0 ? (
            sessionData.data.reduce((result, item, index, array) => {
              if (index % 2 === 0) {
                result.push(array.slice(index, index + 2));
              }
              return result;
            }, [] as Session[][]).map((pair, pairIndex) => (
              <View style={styles.rowEntries} key={pairIndex}>
                {pair.map((item, itemIndex) => (
                  <TouchableOpacity
                    style={styles.containerEntry}
                    key={itemIndex}
                    onPress={() => handleSessionClick(item)}
                  >
                    <View>
                      <Text style={styles.titleEnty}>
                        Running Score:
                      </Text>
                      <Text style={styles.scoreEntry}>
                        {parseFloat(item.score.couro_score).toFixed(2)}
                      </Text>
                    </View>
                    <Text style={styles.textEnty}>
                      {formatDateString(item.session.session_date)}
                    </Text>

                    <View style={styles.entyInformation}>
                      <View style={styles.entyRow}>
                        <Text style={styles.upInformation}>
                          Shoulder: {'\n'}{parseFloat(item.score.shoulder_score).toFixed(2)}
                        </Text>
                        <Text style={styles.upInformation}>
                          Hip: {'\n'}{parseFloat(item.score.hip_score).toFixed(2)}
                        </Text>
                      </View>
                      <View style={styles.entyRow}>
                        <Text style={styles.upInformation}>
                          Elbow: {'\n'}{parseFloat(item.score.elbow_score).toFixed(2)}
                        </Text>
                        <Text style={styles.upInformation}>
                          Knee: {'\n'}{parseFloat(item.score.knee_score).toFixed(2)}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ))
          ) : (
            <View style={styles.containerNoTraining}>
              <Image
                source={require('../../img/recursos/running.png')}
                style={{ width: '100%', height: 200 }}
                resizeMode="contain"
              />
              <Text style={styles.NoTrainingTitle}>
                There are no training sessions
              </Text>
              <Text style={styles.NoTrainingText}>
                Create your first one to get in-depth insights and improve your run
              </Text>
            </View>
          )}
        </View>

      </ScrollView>

      {/* Floating Button */}
      <TouchableOpacity
        style={styles.floatingButtonContainer}
        onPress={() => navigation.navigate('NewTraining', { patientId: patientID })} // Aquí pasamos el patientId
      >
        <FontAwesomeIcon icon={faPlus} size={30} color={colors.primary} />
      </TouchableOpacity>

      {/* Componente del modal */}
      <EditPatientModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        patientName={route.params?.patientName || ''}
        height={route.params?.height || ''}
        weight={route.params?.weight || ''}
        birthdate={route.params?.birthdate || ''}
        patientId={route.params?.patientId || ''} // Pasar el patientId
        trainerId={trainerID} // Asigna el ID del entrenador
        onDelete={handleDelete}
        onSave={handleSave}
      />
    </View>
  );
}

export default PatientScreen;
