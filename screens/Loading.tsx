import React from 'react';
import {View, Text} from 'react-native';

interface Props {}

const Loading = (props: Props) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Loading...</Text>
    </View>
  );
};

export default Loading;
