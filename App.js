import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { withAuthenticator } from 'aws-amplify-react-native';

// import secrets from './secrets.json';

import { Amplify, API, Auth } from 'aws-amplify'
import awsconfig from './src/aws-exports'
Amplify.configure(awsconfig)

function App() {

  // const { username, password, code,
  //   apiName, path } = secrets;

  const signUp = async () => {
    try {
      const res = await Auth.signUp({username,password,attributes:{email:username}});
      console.log(res);
    } catch(err){ console.error(err) }
  }

  const signIn = async () => {
    try {
      const res = await Auth.signIn(username,password);
      console.log(res);
    } catch(err){ console.error(err) }
  }

  const signOut = async () => {
    try {
      await Auth.signOut();
      console.log('Signed Out');
    } catch(err){ console.error(err)}
  }

  const confirmSignUp = async () => {
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

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title="Sign Up" onPress={signUp} style={styles.button} />
      <Button title="Sign In" onPress={signIn} />
      <Button title="Sign Out" onPress={signOut} />
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

export default withAuthenticator(App)
