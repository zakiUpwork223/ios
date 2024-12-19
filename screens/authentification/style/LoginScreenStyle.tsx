import { StyleSheet } from 'react-native';
import { colors, spacing, fontSizes, fonts } from '../../../style'; 

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      justifyContent: 'center',
      flex: 1,
      padding: spacing.medium,
    },
    logoImagen: {
      marginVertical: spacing.medium,
      width: '100%',
      height: '10%',
      marginTop: spacing.large,
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
    },
    logo: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
      alignSelf: 'center',
    },
    titleInicioSesion: {
      alignItems: 'center',
      marginVertical: spacing.medium,
    },
    title: {
      fontSize: fontSizes.medium,
      fontWeight: 'bold',
      fontFamily: fonts.bold,
      color: colors.primary,
      width: '80%',
      textAlign: 'center',
      marginTop: spacing.medium,
    },
    highlight: {
      color: colors.secondary,
    },
    containerForms: {
      marginTop: spacing.large,
      marginVertical: spacing.medium,
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      marginTop: spacing.small,
      height: 40,
      borderWidth: 1,
      borderColor: colors.textPrimary,
      marginBottom: spacing.small,
      paddingHorizontal: spacing.small,
      color: colors.primary,
      backgroundColor: colors.textPrimary,
      borderRadius: 10,
      width: '80%',
    },
    containerForgot: {
      width: '80%',
      alignItems: 'flex-end',
    },
    forgotPassword: {
      textAlign: 'right',
      color: colors.secondary,
      fontWeight: 'regular',
      width: '100%',
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
    register: {
      fontWeight: 'bold',
      color: colors.primary,
    },
  });

  export default styles;
