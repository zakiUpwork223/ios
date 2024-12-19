
import { StyleSheet } from 'react-native';
import { colors, spacing, fontSizes, fonts } from '../../../style'; 
import { text } from '@fortawesome/fontawesome-svg-core';
import { width } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faZ } from '@fortawesome/free-solid-svg-icons';

export const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    highlight: {
        color: colors.secondary,
        fontWeight: '700',
    },
    container: {
        flex: 1,
        padding: spacing.medium,
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
    },
    containerShadow: {
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    titleContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: fontSizes.xl,
        fontWeight: '700',
        fontFamily: fonts.bold,
        color: colors.primary,
        marginTop: spacing.medium,
        textAlign: 'left',
        marginBottom: 0,
    },
    containerButton: {
        width: '80%',
    },
    ButtonLogin: {
        backgroundColor: colors.secondary,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        width: '100%',
    },
    ButtonLoginText: {
        color: colors.primary,
        fontWeight: 'bold',
        fontSize: 16,
    },
    registerContainer: {
        alignItems: 'center',
    },
    login: {
        fontWeight: 'bold',
        color: colors.primary,
    },
    logoImagen: {
        alignItems: 'center',
        height: '10%',
    },
    logo: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    
    // Header

    containerHeader:{
        width: '100%',
        flexDirection: 'row',
    },
    containerText:{
        width: '75%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    containerImage:{
        width: '25%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 100,
        marginTop: spacing.small,
    },
    circleContainer: {
        width: 70, 
        height: 70,
        borderRadius: 50, 
        backgroundColor: '#fff',
    
        // iOS Shadows
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    
        // Android Shadows
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },

    //Personal Information

    personalInformation:{
        width: '100%',
    },

    textInformation:{
        width: '100%',
        fontSize: fontSizes.smedium,
        fontStyle: 'italic',
        color: colors.primary,
        fontWeight: '300',
        marginTop: -(spacing.medium),
    },  
    textInformationSmall:{
        width: '60%',
        fontSize: fontSizes.small,
        fontStyle: 'italic',
        color: colors.primary,
        fontWeight: '300',
    },  

    //Score
    scoreContainer:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 150,
    },
    scoreCouro:{
        fontSize: 60,
        fontWeight: 'bold',
        color: colors.secondary,
    },
    couroTitle:{
        fontWeight: '600',
        color: '#000',
        fontSize: 20,
    },

    scoreImage:{
        width: '100%',
    },

    // TrainingEntries
    trainingEntries:{
        width: '100%',
    },
    titleTries:{
        fontSize: fontSizes.medium,
        color: colors.primary,
        fontWeight: '700',
    },
    containerFilter:{
        width:  '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textFilter:{
        fontSize: fontSizes.small,
        color: colors.primary,
        fontWeight: '400',
        padding: spacing.small,
    },
    filterItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    // Entries

    containerEntries:{
        width: '100%',
        flexDirection: 'column',
    },
    
    rowEntries:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.medium,
    },
    containerEntry: {
        borderColor: colors.secondary,
        borderWidth: 2,
        width: '45%',
        padding: spacing.medium,
        borderRadius: 10,
    },
    textEnty: {
        fontSize: fontSizes.small,
        color: colors.primary,
        fontWeight: '400',
        fontStyle: 'italic',
        marginTop: spacing.small,
        borderBottomWidth: 0.6, // Ancho del borde inferior
        borderBottomColor: colors.primary, // Color del borde inferior
        paddingBottom: spacing.small,
    },
    entyInformation:{
        width: '100%',
        flexDirection: 'column',
    },
    upInformation:{
        width: '47%',
        fontSize: fontSizes.tiny,
        textAlign: 'left',
        marginTop: spacing.small,
    },
    entyRow:{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    titleEnty:{
        fontSize: fontSizes.smedium,
        color: colors.primary,
        fontWeight: '400',
    },

    scoreEntry:{
        fontWeight: '800',
        fontSize: fontSizes.medium,
        color: colors.primary,
    },
    floatingButtonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: colors.secondary,
        borderRadius: 8,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    trainingTitle: {
        fontSize: fontSizes.medium,
        color: colors.primary,
        fontWeight: '700',
        marginBottom: spacing.medium,
        marginTop: spacing.medium,
        
    },
    // NoTrainingSession
    NoTrainingTitle: {
        textAlign: 'center',
        fontSize: fontSizes.medium,
        width: '70%',
        fontWeight: '800',
        color: colors.primary,
        marginBottom: spacing.tiny,
    },
    NoTrainingText:{
        color: colors.primary,
        width: '70%',
        textAlign: 'center',
        marginBottom: spacing.medium,
    },
    containerNoTraining:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    graficalContainer:{
        marginTop: 30, 
    },
    tooltip: {
        position: 'relative',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 8,
        borderRadius: 8,
        zIndex: 10,
    },
    tooltipText: {
        color: '#fff',
        fontSize: 12,
    },
    tooltipContainer: {
        backgroundColor: '#ffa726',
        borderRadius: 6,
        padding: 5,
        position: 'absolute',
        zIndex: 100,
    },
    containerPatientOptions:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: spacing.medium,
    },
    bottomEdit:{
        padding: spacing.small,
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: spacing.medium,
    },
});

export default styles;