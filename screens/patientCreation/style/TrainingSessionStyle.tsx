
import { StyleSheet } from 'react-native';
import { colors, spacing, fontSizes, fonts } from '../../../style'; 
import { text } from '@fortawesome/fontawesome-svg-core';
import { width } from '@fortawesome/free-solid-svg-icons/faSearch';


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
        marginVertical: spacing.medium,
    },
    title: {
        fontSize: fontSizes.medium,
        fontWeight: '700',
        fontFamily: fonts.bold,
        color: colors.primary,
        marginTop: spacing.small,
        textAlign: 'left',
    },
    containerButton: {
        width: '80%',
        marginTop: spacing.large,
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
        marginVertical: spacing.medium,
    },
    login: {
        fontWeight: 'bold',
        color: colors.primary,
    },
    logoImagen: {
        alignItems: 'center',
        marginVertical: spacing.medium,
        height: '10%',
        marginTop: spacing.small,
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
        marginBottom: 10,
        borderBottomColor: colors.primary,
        borderBottomWidth: 0.5,
        paddingBottom: 10,

    },
    containerImage:{
        width: '25%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
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
    subtitle: {
        fontSize: fontSizes.small,
        fontWeight: '400',
        color: colors.primary,
        textAlign: 'left',
    },

    // Score

    containerScore:{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerCouroRun: {
        width: '100%',
        flexDirection: 'column',
    },
    gradientStyle: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    maskedView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    maskedText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
    },
    gradient: {
        flex: 1,
    },

    containerCouroScore:{
        marginTop: spacing.medium,
    },

    svgCircleStylea: {
        width: spacing.large,
        height: spacing.large,
    },

    letterSvg:{

    },
    containerScoreAll:{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        marginTop: spacing.medium,
        marginBottom: spacing.large,
    },
    smallCircle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.small,
      },

    //   containerCouroAnalysis
    containerCouroAnalysis:{
        width: '100%',
        flexDirection: 'row',
        marginTop: spacing.medium,
        justifyContent: 'space-between',

    },
    titleAnalysis:{
        fontSize: fontSizes.medium,
        color: colors.primary,
        fontWeight: '700',
    },

    textAnalysis:{
        padding: spacing.small,
        backgroundColor: colors.secondary,
        borderRadius: 10,
        color: colors.primary,
    },
    containerVideo: {
        marginTop: spacing.medium
    },

    // Insights
    
    containerInsights:{
        marginTop: spacing.medium,
    },
    titleInsights:{
        color: colors.primary,
        fontWeight: '700',
        fontSize: fontSizes.medium,
    },
    textInsights:{
        marginTop: spacing.medium,
    },
    bottonShow:{
    color: colors.primary, 
    marginTop: spacing.medium,
    padding: spacing.small,
    width: '26%',
    borderRadius: 20,
    backgroundColor: colors.secondary,
    marginBottom: spacing.medium,
    },
    containerPatientOptions:{

    },

    //Contenedor De Notas
    
    containerNotes:{

    },
    titleNotes:{
        color: colors.primary,
        fontWeight: '700',
        fontSize: fontSizes.medium,
    },
    notesSpace:{
        borderWidth: 1,
        borderColor: colors.secondary,
        color: colors.primary,
        borderRadius: 10,
        padding: spacing.medium,
        marginTop: spacing.medium,
    },
    updateButton: {
        backgroundColor: colors.secondary,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    updateButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },



});

export default styles;