import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen';
import Loading from './screens/Loading';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import HomeScreen from './screens/HomeScreen';
import EmailAuthModal from './screens/auth/EmailAuthModal';
import {Screens} from './screens/screens';

export default function () {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const screens = Screens;

  useEffect(() => {
    auth().onAuthStateChanged(userState => {
      setUser(userState);

      if (loading) {
        setLoading(false);
      }
    });
  }, []);
  const Stack = createNativeStackNavigator();
  if (loading) {
    return <Loading />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
              name={screens.homeScreen}
              component={HomeScreen}
              options={{animation: 'fade'}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name={screens.homeScreen}
              component={WelcomeScreen}
              options={{headerShown: false}}
            />
          </>
        )}
        <Stack.Screen
          name={screens.emailAuthScreen}
          component={EmailAuthModal}
          options={{animation: 'slide_from_bottom', headerTitle: ''}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
