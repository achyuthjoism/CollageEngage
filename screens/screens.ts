export enum Screens {
  welcomeScreen = 'WelcomeScreen',
  loadingScreen = 'LoadingScrenn',
  homeScreen = 'HomeScreen',
  emailAuthScreen = 'Email',
  newUserPage = 'NewUserPage',
}

const screen = Screens;
export type StackParams = {
  [screen.homeScreen]: undefined;
  [screen.emailAuthScreen]: undefined;
  [screen.newUserPage]: undefined;
};
