import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { withAuthenticator } from 'aws-amplify-react-native';

// import secrets from './secrets.json';

import { Amplify, Auth, Storage } from 'aws-amplify'
import awsconfig from './src/aws-exports'

Amplify.Logger.LOG_LEVEL = 'DEBUG'

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
      const res = await Auth.signIn('dkkiuna11@gmail.com','abcd1234');
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

  const currentUser = async () => {
    try {
      const res = await Auth.currentAuthenticatedUser()
      console.log(res);
    } catch(err) { console.error(err)}
  }

  const list = async()=>{
    try {
      const res = await Storage.list('');
      console.log(res);
    } catch(e){
      console.log(e);
    }
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title="Sign Up" onPress={signUp} style={styles.button} />
      <Button title="Sign In" onPress={signIn} />
      <Button title="Sign Out" onPress={signOut} />
      <Button title="Confirm Sign Up" onPress={confirmSignUp} />
      <Button title="Current User" onPress={currentUser} />
      <Button title="Storage List" onPress={list} />
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

// export default withAuthenticator(App)
export default App
