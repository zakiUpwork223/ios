import {StyleSheet} from 'react-native';
import {colors, spacing, fontSizes, fonts} from '../../../style';
import {text} from '@fortawesome/fontawesome-svg-core';
import {width} from '@fortawesome/free-solid-svg-icons/faSearch';

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
  containerHeader: {
    width: '100%',
    flexDirection: 'row',
  },
  containerText: {
    width: '75%',
    flexDirection: 'column',
    marginBottom: 10,
    borderBottomColor: colors.primary,
    borderBottomWidth: 0.5,
    paddingBottom: 10,
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
  subtitle: {
    fontSize: fontSizes.small,
    fontWeight: '400',
    color: colors.primary,
    textAlign: 'left',
  },

  // Score

  containerScore: {
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
  trainingTextSession: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: fontSizes.medium,
    marginTop: spacing.medium,
  },
  couroRun: {
    marginTop: spacing.medium,
    textAlign: 'left',
  },
  containerUpdload: {
    marginTop: spacing.large,
  },
  updloadVideo: {
    borderWidth: 1,
    borderColor: colors.secondary,
    paddingTop: spacing.large,
    paddingBottom: spacing.large,
    paddingLeft: spacing.xl,
    paddingRight: spacing.xl,
    borderRadius: 10,
  },
  textUpload: {
    color: colors.primary,
    fontWeight: '500',
  },

  videoPreview: {
    marginTop: 10,
  },
  videoUriText: {
    color: colors.primary,
    // Otros estilos
  },
  updloadVideoSelected: {
    backgroundColor: 'yellow',
  },
  loadingText: {
    fontSize: 16,
    color: colors.secondary,
    textAlign: 'center',
    marginVertical: 20,
  },

  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: spacing.medium,
  },
  toggleButton: {
    padding: 5,
    marginHorizontal: spacing.small,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 20,
    width: '40%',
  },
  toggleButtonSelected: {
    backgroundColor: '#FFF7E4',
    borderColor: '#FFD700',
  },
  toggleButtonText: {
    color: colors.primary,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 20,
    paddingVertical: 10,
    width: '40%',
    textAlign: 'center',
  },

  warningBox: {
    borderWidth: 1,
    backgroundColor: '#fffbe6',
    borderColor: colors.secondary,
    padding: spacing.medium,
    borderRadius: 10,
    marginTop: spacing.medium,
    alignItems: 'center',
  },

  warningText: {
    color: colors.primary,
    fontWeight: '500',
    paddingBottom: spacing.medium,
    textAlign: 'center',
  },

  billingButton: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '100%',
  },

  billingButtonText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 16,
  },

  inputContainer: {
    alignItems: 'center',
  },
});

export default styles;
