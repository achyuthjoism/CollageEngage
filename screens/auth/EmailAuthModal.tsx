import React, {Component} from 'react';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Screens as screen, StackParams} from '../screens';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Color} from '../assets/Color';

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
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: '#fff',
        }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: Color.primaryColor,
            marginBottom: 25,
            textAlign: 'center',
          }}>
          Create Account
        </Text>
        <TextInput
          value={this.state.email}
          onChangeText={e => this.setState({email: e})}
          style={{
            paddingRight: (width * 2) / 8,
            borderColor: Color.primaryDark + '75',
            borderWidth: 1,
            borderRadius: 10,
            marginBottom: 20,
            paddingLeft: 10,
            marginHorizontal: (width * 1) / 8,
          }}
          placeholderTextColor={Color.primaryDark + '60'}
          placeholder="Email"
        />
        <TextInput
          value={this.state.password}
          onChangeText={e => this.setState({password: e})}
          style={{
            paddingRight: (width * 2) / 8,
            borderColor: Color.primaryDark + '75',
            borderWidth: 1,
            borderRadius: 10,
            marginBottom: 20,
            paddingLeft: 10,
            marginHorizontal: (width * 1) / 8,
          }}
          placeholderTextColor={Color.primaryDark + '60'}
          placeholder="Password"
        />
        <TextInput
          value={this.state.cpassword}
          onChangeText={e => this.setState({cpassword: e})}
          style={{
            paddingRight: (width * 2) / 8,
            borderColor: Color.primaryDark + '75',
            borderWidth: 1,
            borderRadius: 10,
            marginBottom: 20,
            paddingLeft: 10,
            marginHorizontal: (width * 1) / 8,
          }}
          placeholderTextColor={Color.primaryDark + '60'}
          placeholder="Confirm Password"
        />
        <TouchableOpacity
          onPress={() => {
            const {cpassword, password, email} = this.state;
            if (password === cpassword) {
              this.authCreate(email, password);
            } else {
              Alert.alert('Auth Error!', "Passwords does'nt match!", [
                {text: 'OK'},
              ]);
            }
          }}
          style={{
            backgroundColor: Color.primaryColor,
            padding: 10,
            alignSelf: 'center',
            borderRadius: 5,
          }}>
          <Text style={{color: '#fff'}}> Submit </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }

  authCreate(email: string, password: string) {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
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
