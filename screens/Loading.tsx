import React from 'react';
import {View, Text} from 'react-native';
import {regularFont} from './assets/Color';

interface Props {}

const Loading = (props: Props) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{...regularFont}}>Loading...</Text>
    </View>
  );
};

export default Loading;
