
import { StyleSheet } from 'react-native';
import { colors, spacing, fontSizes, fonts } from '../../../style';
import { rgbaColor } from "react-native-reanimated/lib/typescript/Colors";


export const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
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
  highlight: {
    color: colors.secondary,
    fontWeight: '700',
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    // Android Shadows
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',

  },

  // Personal Information

  personalInformation: {
    width: '100%',
    borderRadius: 20,
    marginTop: spacing.large,
    fontSize: fontSizes.medium,
  },
  titlePersonalInformation: {
    color: colors.primary,
    fontSize: fontSizes.small,
    paddingBottom: spacing.medium,
  },

  containerInformation: {
    borderBottomColor: colors.primary,
    borderBottomWidth: 0.5,

  },
  // FormularioYourSetting
  containerForms: {
    marginTop: spacing.small,
    marginVertical: spacing.medium,
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
  uploadCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.textPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.medium,
  },
  uploadText: {
    color: colors.primary,
    fontSize: fontSizes.small,
    fontFamily: fonts.bold,
  },
  textEdit: {
    fontWeight: '400',
    fontSize: fontSizes.small,
    color: colors.primary,
  },

  //   BottonsContainer
  bottonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.medium,
  },
  buttonBack: {
    backgroundColor: 'none',
  },
  changeText: {
    color: colors.primary,
    fontWeight: '500',
    paddingTop: 0,
    paddingRight: spacing.medium,
    paddingBottom: 0,
    paddingLeft: spacing.medium,
  },
  foot: {
    padding: spacing.small,
    marginTop: spacing.medium,
    fontSize: fontSizes.smedium,
    fontWeight: '700',
  },

  //   WarningBox
  warningBox: {
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    padding: spacing.medium,
    borderRadius: 10,
    marginTop: spacing.medium,
  },

  warningText: {
    color: colors.primary,
    fontWeight: '500',
  },

  // CurrentPlanBox
  planBox: {
    backgroundColor: '#fffbe6',
    borderColor: '#f8c145',
    padding: spacing.medium,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: spacing.medium,
  },

  planTitle: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: fontSizes.medium,
    paddingBottom: spacing.small,
  },

  planName: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: fontSizes.smedium,
  },

  planDescription: {
    color: colors.primary,
    fontWeight: '500',
    fontSize: fontSizes.small,
    paddingTop: spacing.small
  },

  planPrice: {
    color: '#f8c145',
    fontWeight: '600',
    fontSize: fontSizes.smedium,
    paddingTop: spacing.small
  },

  remainingTokensBox: {
    backgroundColor: '#f9f9f9',
    borderColor: '#cccccc',
    padding: spacing.medium,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: spacing.medium,
  },

  remainingTokensText: {
    color: colors.primary,
    fontWeight: '500',
    fontSize: fontSizes.small,
    paddingBottom: spacing.small,
  },

  loadingText: {
    color: colors.primary,
    fontWeight: '500',
    fontSize: fontSizes.small,
    paddingTop: spacing.small,
    paddingBottom: spacing.small,
  },

  termsText: {
    color: '#888888',
    fontSize: 12,
    paddingTop: spacing.medium
  }
});

export default styles;
