import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet, Image, ScrollView } from 'react-native';
import { colors, spacing, fontSizes, fonts } from '../../style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../../App'; 

const ConfirmPasswordScreen = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  return (
    <SafeAreaView style={[styles.scrollViewContainer]}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {/* ContainerPrincipal */}
        <View style={[styles.container]}>
          {/* Imagen-Couro */}
          <View style={styles.logoImagen}>
            <Image source={require('../../img/logo/logo.png')} style={styles.logo} />
          </View>
          {/* Titulo */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              ¡Everything went <Text style={styles.highlight}>well</Text>!
            </Text>
            <Text style={styles.textStart}>
              You can start using your new password now
            </Text>
          </View>

          {/* ContainerForms */}
          <View style={styles.containerForms}>
            {/* Contenedor Botón */}
            <View style={styles.containerButton}>
              <TouchableOpacity style={styles.ButtonLogin} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.ButtonLoginText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
    fontSize: fontSizes.large,
    fontWeight: 'bold',
    fontFamily: fonts.bold,
    color: colors.primary,
    marginTop: spacing.large,
    textAlign: 'center',
  },
  containerForms: {
    marginTop: spacing.large,
    alignItems: 'center',
    justifyContent: 'center',
  },
  highlight: {
    color: colors.secondary,
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
  containerButton: {
    width: '80%',
    marginTop: spacing.large,
  },
  // Botones
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
  // estilos Generales
  textStart: {
    textAlign: 'center',
    width: '80%',
    fontSize: fontSizes.small,
    marginTop: spacing.large,
  },
});

export default ConfirmPasswordScreen;
