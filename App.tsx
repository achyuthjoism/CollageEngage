import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen';
import Loading from './screens/Loading';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import HomeScreen from './screens/HomeScreen';
import EmailAuthModal from './screens/auth/EmailAuthModal';
import {Screens} from './screens/screens';
import NewUserPage from './screens/auth/NewUserPage';

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
  const AuthStack = () => {
    if (user === null) {
      return (
        <>
          <Stack.Screen
            name={screens.homeScreen}
            component={WelcomeScreen}
            options={{headerShown: false}}
          />
        </>
      );
    } else if (user.displayName === null) {
      return (
        <>
          <Stack.Screen
            name={screens.newUserPage}
            component={NewUserPage}
            options={{animation: 'fade'}}
          />
          <>
            <Stack.Screen
              name={screens.homeScreen}
              component={HomeScreen}
              options={{animation: 'fade'}}
            />
          </>
        </>
      );
    } else {
      return (
        <>
          <Stack.Screen
            name={screens.homeScreen}
            component={HomeScreen}
            options={{animation: 'fade'}}
          />
        </>
      );
    }
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user == null ? (
          <>
            <Stack.Screen
              name={screens.welcomeScreen}
              component={WelcomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={screens.newUserPage}
              component={NewUserPage}
              options={{animation: 'fade'}}
            />
            <Stack.Screen
              name={screens.homeScreen}
              component={HomeScreen}
              options={{animation: 'fade'}}
            />
          </>
        ) : user.displayName === null ? (
          <>
            <Stack.Screen
              name={screens.newUserPage}
              component={NewUserPage}
              options={{animation: 'fade'}}
            />
            <Stack.Screen
              name={screens.homeScreen}
              component={HomeScreen}
              options={{animation: 'fade'}}
            />
            <Stack.Screen
              name={screens.welcomeScreen}
              component={WelcomeScreen}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name={screens.homeScreen}
              component={HomeScreen}
              options={{animation: 'fade'}}
            />
            <Stack.Screen
              name={screens.welcomeScreen}
              component={WelcomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name={screens.newUserPage}
              component={NewUserPage}
              options={{animation: 'fade'}}
            />
          </>
        )}
        {/* {user ? (
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
        )} */}
        <Stack.Screen
          name={screens.emailAuthScreen}
          component={EmailAuthModal}
          options={{animation: 'slide_from_bottom', headerTitle: ''}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
