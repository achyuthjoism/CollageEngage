import React, {Component} from 'react';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Screens as screen, StackParams} from '../screens';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {boldFont, Color, mediumFont, regularFont} from '../assets/Color';
import {StackActions} from '@react-navigation/native';

type Props = NativeStackScreenProps<StackParams, screen.emailAuthScreen>;
interface UserInput {
  email: string;
  password: string;
  cpassword: string;
}

export default class EmailAuthModal extends Component<Props, UserInput> {
  constructor(props: any) {
    super(props);
    this.state = {email: '', password: '', cpassword: ''};
  }
  render() {
    const {width} = Dimensions.get('screen');
    const style = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
      },
      createAccount: {
        ...boldFont,
        fontSize: 24,
        color: Color.primaryColor,
        marginBottom: 25,
        textAlign: 'center',
      },
      textInput: {
        ...regularFont,
        borderColor: Color.primaryDark + '75',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        paddingLeft: 10,
        marginHorizontal: (width * 1) / 8,
      },
      button: {
        backgroundColor: Color.primaryColor,
        padding: 10,
        alignSelf: 'center',
        borderRadius: 5,
      },
    });
    return (
      <KeyboardAvoidingView style={style.container}>
        <Text style={style.createAccount}>Create Account</Text>
        <TextInput
          value={this.state.email}
          onChangeText={e => this.setState({email: e})}
          style={style.textInput}
          placeholderTextColor={Color.primaryDark + '60'}
          placeholder="Email"
          autoCapitalize="none"
        />
        <TextInput
          value={this.state.password}
          onChangeText={e => this.setState({password: e})}
          style={style.textInput}
          placeholderTextColor={Color.primaryDark + '60'}
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry={true}
        />
        <TextInput
          secureTextEntry={true}
          autoCapitalize="none"
          value={this.state.cpassword}
          onChangeText={e => this.setState({cpassword: e})}
          style={style.textInput}
          placeholderTextColor={Color.primaryDark + '60'}
          placeholder="Confirm Password"
        />
        <TouchableOpacity
          onPress={() => {
            const {cpassword, password, email} = this.state;
            if (email === '') {
              Alert.alert('Auth Error!', 'Please enter the email!', [
                {text: 'OK'},
              ]);
              return;
            }
            if (password === '') {
              Alert.alert('Auth Error!', 'Please enter the password !', [
                {text: 'OK'},
              ]);
              return;
            }
            if (cpassword === '') {
              Alert.alert('Auth Error!', 'Please enter the confirm password!', [
                {text: 'OK'},
              ]);
              return;
            }
            if (password !== cpassword) {
              Alert.alert('Auth Error!', "Passwords does'nt match!", [
                {text: 'OK'},
              ]);
              return;
            }
            if (
              !/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(
                password,
              )
            ) {
              Alert.alert(
                'Auth Error!',
                'Please enter minimum 8 letter password, with at least a symbol, upper and lower case letters and a number',
                [{text: 'OK'}],
              );
              return;
            }
            this.authCreate(email, password);
          }}
          style={style.button}>
          <Text style={{color: '#fff', ...mediumFont}}> Submit </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }

  authCreate(email: string, password: string) {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(u => {
        this.props.navigation.replace(screen.newUserPage);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Auth Error!', 'This email is already in use!', [
            {text: 'OK'},
          ]);
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('Auth Error!', `Email is invaild!`, [{text: 'OK'}]);
        }

        console.error(error);
      });
  }
}
