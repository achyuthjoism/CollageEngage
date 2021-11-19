import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  Dimensions,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Color} from './assets/Color';
import auth from '@react-native-firebase/auth';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Screens as screen, StackParams} from './screens';

type Props = NativeStackScreenProps<StackParams, screen.homeScreen>;

export default function WelcomeScreen({navigation}: Props) {
  const {width, height} = Dimensions.get('screen');
  const color = Color;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    containerMask: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: '#00000050',
    },
    logo: {
      width: (width * 1) / 4,
      height: (width * 1) / 4,
      marginLeft: (width * 1) / 16,
      marginTop: (width * 1) / 8,
    },
    signUpContainer: {
      width: width,
      height: (height * 1) / 2.5,
      position: 'absolute',
      bottom: 0,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      backgroundColor: '#ffffff90',
    },
    welcomeText: {
      fontSize: 25,
      color: 'black',
      marginTop: (width * 1) / 20,
      textAlign: 'center',
    },
    signUpButtonContainer: {
      backgroundColor: '#000',
    },
    buttonContainer: {
      height: '100%',
      marginHorizontal: (width * 1) / 20,
      marginVertical: (width * 1) / 30,
    },
    loginButton: {
      width: '100%',
      backgroundColor: '#000',
      flexDirection: 'row',
      justifyContent: 'center',
      paddingVertical: 10,
      borderRadius: 10,
      marginBottom: 15,
    },
    loginButtonFB: {
      width: '100%',
      backgroundColor: '#3b5998',
      flexDirection: 'row',
      justifyContent: 'center',
      paddingVertical: 10,
      borderRadius: 10,
    },
    loginButtonImage: {
      width: 26,
      height: 26,
      marginRight: 25,
    },
    buttonText: {
      fontSize: 20,
      color: '#fff',
    },
  });

  return (
    <ImageBackground
      source={require('./assets/welcome_screen.jpeg')}
      resizeMode="cover"
      style={styles.container}>
      <StatusBar backgroundColor={color.primaryColor} />
      <View style={styles.containerMask} />
      <Image source={require('./assets/logo.png')} style={styles.logo} />
      <View style={styles.signUpContainer}>
        <Text style={styles.welcomeText}>Welcome to Physics Help</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton}>
            <Image
              source={require('./assets/google.png')}
              style={styles.loginButtonImage}
            />
            <Text style={styles.buttonText}>Continue With Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate(screen.emailAuthScreen)}>
            <Image
              source={require('./assets/email.png')}
              style={styles.loginButtonImage}
            />
            <Text style={styles.buttonText}>Continue With Email</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButtonFB}>
            <Image
              source={require('./assets/facebook.png')}
              style={styles.loginButtonImage}
            />
            <Text style={styles.buttonText}>Continue With Facebook</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
