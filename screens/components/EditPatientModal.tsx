// EditPatientModal.tsx

import React, { useContext } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, ScrollView, Keyboard } from 'react-native';
import { colors } from '../../style';

//-- navigation -- 
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AuthContext, RootStackParamList } from '../../App';


// -- Services -- 
import { putPatient } from '../../services/PutPatient'; // Importar la función putPatient
import { deletePatient } from '../../services/DeletePatient'; // Importar la función deletePatient
import DatePicker from 'react-native-date-picker';
import { useToast } from '../../context/ToastContext';
import { formatDateString } from '../../utils/helpers';
import { formatDate } from '../../lib/formatDate';



type EditPatientModalProps = {
    visible: boolean;
    onClose: () => void;
    patientName: string;
    height: string;
    weight: string;
    birthdate: string;
    patientId: string; // Agregar propiedad patientId
    trainerId: string; // Agregar propiedad trainerId
    onDelete: () => void;
    onSave: (name: string, height: string, weight: string, birthdate: string) => void; // Ajustar para aceptar los parámetros
};

const EditPatientModal: React.FC<EditPatientModalProps> = ({
    visible,
    onClose,
    patientName,
    height,
    weight,
    birthdate,
    patientId,
    trainerId,
    onDelete,
    onSave
}) => {
    const [name, setName] = React.useState(patientName);
    const [patientHeight, setHeight] = React.useState(height);
    const [patientWeight, setWeight] = React.useState(weight);
    const [patientBirthdate, setBirthdate] = React.useState(birthdate);
    const [showDatePicker, setShowDatePicker] = React.useState(false);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const { showToas } = useToast();

    const { session: { user: { id } } } = useContext(AuthContext);

    const handleSave = async () => {
        try {

            // Agregar un console.log para ver los datos que se están enviando
            console.log('Datos enviados al PUT:', {
                patientId,
                trainerId,
                name,
                patientBirthdate,
                height: parseFloat(patientHeight),
                weight: parseFloat(patientWeight)
            });
            const baseUrl = 'https://back.couro.io';

            if (trainerId.trim() === "") {
                trainerId = id
            }

            const response = await putPatient(baseUrl, patientId, trainerId, name, patientBirthdate, parseFloat(patientHeight), parseFloat(patientWeight));
            console.log('Respuesta del servidor:', response);

            console.log('Patient updated successfully');
            // showToas('Patient updated successfully', 'info')
            onSave(name, patientHeight, patientWeight, patientBirthdate); // Llamar a la función onSave con los argumentos correctos
            // Navegar a HomeScreen después de guardar los cambios
            navigation.navigate('Home');
        } catch (error) {
            // showToas(error.message, 'error')
            console.error('Failed to update patient:', error);
        }
    };


    const handleDelete = async () => {
        try {

            const requestBody = {
                patient_id: patientId,
                trainer_id: trainerId,
            };
            // Agregar un console.log para ver los datos que se están enviando
            console.log('Datos enviados en la solicitud DELETE:', requestBody);
            const baseUrl = 'https://back.couro.io';
            const response = await deletePatient(baseUrl, patientId, trainerId);
            console.log('Paciente eliminado con éxito:', response);
            onDelete(); // Llamar a la función onDelete para cualquier lógica adicional necesaria
            navigation.navigate('Home'); // Navegar a HomeScreen después de eliminar
        } catch (error) {
            console.error('Failed to delete patient:', error);
        }
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent
            onRequestClose={onClose}
        ><KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }} >
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={{ flex: 1 }}>
                        <ScrollView
                            contentContainerStyle={{ flexGrow: 1 }}
                            keyboardShouldPersistTaps="handled"
                        >
                            <View style={styles.overlay}>
                                <View style={styles.modalContainer}>
                                    {/* Botón para cerrar */}
                                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                                        <Text style={styles.closeButtonText}>X</Text>
                                    </TouchableOpacity>

                                    {/* Inputs */}
                                    <Text style={styles.label}>Name</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={name}
                                        onChangeText={setName}
                                        placeholder='Name'
                                    />

                                    <Text style={styles.label}>Height</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={patientHeight}
                                        onChangeText={setHeight}
                                        placeholder='Height'
                                    />

                                    <Text style={styles.label}>Weight</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={patientWeight}
                                        onChangeText={setWeight}
                                        placeholder='Weight'
                                    />

                                    <Text style={styles.label}>Birthdate</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={patientBirthdate}
                                        onChangeText={setBirthdate}
                                        onPress={() => setShowDatePicker(true)}
                                        placeholder='Birthdate'
                                    />
                                    <DatePicker
                                        modal
                                        open={showDatePicker}
                                        date={new Date()} // Este es el estado local del componente
                                        mode="date" // Modo selector de fecha
                                        onConfirm={(selectedDate) => {
                                            setShowDatePicker(false);
                                            const day = String(selectedDate.getDate()).padStart(2, '0'); // Asegura 2 dígitos para el día
                                            const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); // Asegura 2 dígitos para el mes
                                            const year = selectedDate.getFullYear(); // Año completo

                                            const formattedInput = `${year}-${month}-${day}`; // Formato YYYY-MM-DD
                                            const formattedDate = formatDateString(formattedInput); // Pasa este string a formatDate
                                            setBirthdate(formattedDate); // Actualiza la fecha formateada
                                        }}
                                        onCancel={() => setShowDatePicker(false)}
                                    />

                                    {/* Botones */}
                                    <View style={styles.buttonContainer}>
                                        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                                            <Text style={styles.buttonText}>Delete</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                                            <Text style={styles.buttonText}>Save</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    closeButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.primary,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: colors.primary,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
        color: colors.primary
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    deleteButton: {
        backgroundColor: '#ff4d4d',
        padding: 10,
        borderRadius: 5,
    },
    saveButton: {
        backgroundColor: colors.secondary,
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default EditPatientModal;
