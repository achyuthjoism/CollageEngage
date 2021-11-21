import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Screens as screens, StackParams} from '../screens';

type Props = NativeStackScreenProps<StackParams, screens.newUserPage>;

export default class NewUserPage extends Component<Props> {
  render() {
    return (
      <View>
        <Text> textInComponents </Text>
      </View>
    );
  }
}
