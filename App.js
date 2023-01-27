import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { withAuthenticator } from 'aws-amplify-react-native';
import * as WebBrowser from "expo-web-browser";
import * as Linking from 'expo-linking'
// import secrets from './secrets.json';

import { Amplify, API, Auth } from 'aws-amplify'
import awsconfig from './src/aws-exports'
// Amplify.configure(awsconfig)

console.log(Linking.createURL('/'))


async function urlOpener(url, redirectUrl) {
  const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(
    url,
    redirectUrl
  );

  if (type === "success" && Platform.OS === "ios") {
    WebBrowser.dismissBrowser();
    return Linking.openURL(newUrl);
  }
}

const updatedConfig = {
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    urlOpener,
  },
};

Amplify.configure(updatedConfig);




function App() {

  const username = ''
  const password = ''

  const signUp = async () => {
    try {
      const res = await Auth.signUp(username,password);
      console.log(res);
    } catch(err){ console.error(err) }
  }

  const signIn = async () => {
    console.log('sign in',username,password)
    try {
      // const res = await Auth.signIn(username,password);
      // console.log(res);
      await Auth.federatedSignIn();

    } catch(err){ console.error(err) }
  }

  const signOut = async () => {
    try {
      await Auth.signOut();
      console.log('Signed Out');
    } catch(err){ console.error(err)}
  }

  const confirmSignUp = async () => {
    const code = ''
    try {
      const res = await Auth.confirmSignUp(username,code);
      console.log(res);
    } catch(err) { console.error(err)}
  }

  const FetchFromAPI = async () => {
    try {
      const res = await API.get(apiName,path);
      console.log(res);
    } catch (err) { console.error(err); }
  }

  const federated = async (provider) => {
    try {
      const res = await Auth.federatedSignIn({provider:provider});
      console.log(res);
    } catch (err) { console.error(err); }
  }

  const currentUser = async () => {
    try {
      const res = await Auth.currentAuthenticatedUser();
      console.log(res);
    } catch (err) { console.error(err); }
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title="Sign Up" onPress={signUp} style={styles.button} />
      <Button title="Sign In" onPress={signIn} />
      <Button title="Sign Out" onPress={signOut} />
      <Button title="Google Sign In" onPress={() => federated('Google')} />
      <Button title="Apple Sign In" onPress={() => federated('SignInWithApple')} />
      <Button title="Current User" onPress={currentUser} />
      <Button title="Confirm Sign Up" onPress={confirmSignUp} />
      <Button title="RestAPI Get" onPress={FetchFromAPI} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default App;
