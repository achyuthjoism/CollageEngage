import React, {Component} from 'react';
import {Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';

export default class EmailAuthModal extends Component {
  render() {
    return (
      <View>
        <Text> E </Text>
      </View>
    );
  }

  authCreate(email: String, passWord: String) {
    auth()
      .createUserWithEmailAndPassword(
        'jane.doe@example.com',
        'SuperSecretPassword!',
      )
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  }
}
