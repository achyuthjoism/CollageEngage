import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    auth().onAuthStateChanged(userState => {
      setUser(userState);

      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  if (loading)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading...</Text>
      </View>
    );
  if (!user) {
    return <WelcomeScreen />;
  }

  return <HomeScreen />;
}
