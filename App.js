import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

import secrets from './secrets.json';

import { Amplify, Auth } from 'aws-amplify'
import awsconfig from './src/aws-exports'
Amplify.configure(awsconfig)

export default function App() {

  const { username, password } = secrets;

  const signUp = async () => {
    try {
      const res = await Auth.signUp(username,password);
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
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title="Sign Up" onPress={signUp} />
      <Button title="Sign In" onPress={signIn} />
      <Button title="Sign Out" onPress={signOut} />
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
  },
});
