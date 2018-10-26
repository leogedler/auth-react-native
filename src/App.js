import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  componentWillMount() {
    firebase.initializeApp(
      {
        apiKey: 'AIzaSyD3cOKioN26c8RTqcE8qJDnKfoZoNXhDRE',
        authDomain: 'auth-react-native-9742f.firebaseapp.com',
        databaseURL: 'https://auth-react-native-9742f.firebaseio.com',
        projectId: 'auth-react-native-9742f',
        storageBucket: 'auth-react-native-9742f.appspot.com',
        messagingSenderId: '461176974019'
      }
    );
  }

  render() {
    return (
      <View>
        <Header headerText={'Authentication'} />
        <LoginForm />
      </View>
    );
  }
}

export default App;
