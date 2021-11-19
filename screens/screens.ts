export enum Screens {
  welcomeScreen = 'WelcomeScreen',
  loadingScreen = 'LoadingScrenn',
  homeScreen = 'HomeScreen',
  emailAuthScreen = 'Email',
}

const screen = Screens;
export type StackParams = {
  [screen.homeScreen]: undefined;
  [screen.emailAuthScreen]: undefined;
};
