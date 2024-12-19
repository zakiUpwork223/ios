// HomeScreenStyles.ts

import {StyleSheet} from 'react-native';
import {colors, spacing, fontSizes, fonts} from '../../../style';

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
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
    fontSize: fontSizes.xl,
    fontWeight: '400',
    fontFamily: fonts.bold,
    color: colors.primary,
    marginTop: spacing.medium,
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

  //Header
  containerHeader: {
    width: '100%',
    flexDirection: 'row',
  },
  containerText: {
    width: '75%',
    flexDirection: 'column',
  },
  containerImage: {
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
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    // Android Shadows
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageIcon: {
    width: '50%',
  },

  //   Seach
  containerSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: spacing.small,
    paddingVertical: spacing.tiny,
    backgroundColor: colors.textPrimary,
    marginTop: spacing.large,
    backgroundColor: colors.theriary,
    borderColor: colors.secondary,
    borderWidth: 2,
  },
  searchIcon: {
    marginRight: spacing.small,
  },
  searchInput: {
    flex: 1,
    fontSize: fontSizes.medium,
    color: colors.primary,
    paddingVertical: 0, // Para alinear el texto verticalmente con el ícono
  },

  // ============Patients==============

  containerPatients: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.theriary,
    flexDirection: 'column',
  },

  noPatientsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  noPatientsTextFirst: {
    color: colors.primary,
    fontSize: fontSizes.medium,
    fontWeight: '600',
  },
  noPatientsTextSecond: {
    color: colors.primary,
    fontSize: fontSizes.small,
    fontWeight: '400',
    paddingTop: spacing.small,
  },

  rowPatients: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.medium,
  },

  patient: {
    width: '48%',
    height: 150,
    borderRadius: 10,
    textAlign: 'center',
    justifyContent: 'flex-end',
    alignItems: 'baseline',
    borderColor: colors.secondary,
    borderWidth: 2,
  },
  textPatient: {
    color: colors.primary,
    fontSize: fontSizes.small,
    fontWeight: '500',
    padding: spacing.small,
    paddingBottom: 0,
  },
  datePacient: {
    color: colors.primary,
    fontSize: fontSizes.tiny,
    fontWeight: '400',
    padding: spacing.small,
    paddingTop: 0,
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
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },

  // ============= Modal =============
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: fontSizes.medium,
    color: colors.primary,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  //Profile Photo}
  uploadCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.textPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    color: colors.primary,
    fontSize: fontSizes.small,
    fontFamily: fonts.bold,
  },

  //   Forms

  containerForms: {
    marginTop: spacing.large,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  highlight: {
    color: colors.secondary,
    fontWeight: '700',
  },
  input: {
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
  Login: {
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: spacing.medium,
  },
  rowForms: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center',
    padding: spacing.small,
  },
  inputMidForms: {
    height: 40,
    borderWidth: 1,
    borderColor: colors.textPrimary,
    color: colors.primary,
    backgroundColor: colors.textPrimary,
    borderRadius: 10,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.small,
    fontSize: fontSizes.tiny,
  },
  noteForms: {
    height: 100,
    borderWidth: 1,
    borderColor: colors.textPrimary,
    color: colors.primary,
    backgroundColor: colors.textPrimary,
    borderRadius: 10,
    width: '80%',
    fontSize: fontSizes.tiny,
    padding: spacing.small,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
  containerX: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
  },

  // ... existing code ...
  tokenModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tokenModalContainer: {
    backgroundColor: 'white',
    padding: 40,
    borderRadius: 20,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  tokenModalContentTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  tokenModalContentText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
    lineHeight: 24,
  },
  tokenModalContentButton: {
    marginTop: 20,
    backgroundColor: '#FFB800',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  tokenModalContentButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  tokenModalContentImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 30,
  },
});

export default styles;
