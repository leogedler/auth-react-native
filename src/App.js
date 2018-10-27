import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {

  state = {
    loggedIn: null,
  }

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

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}>
            Log Out
          </Button>);
      case false:
        return <LoginForm />;
      default:
        return <Spinner size={'large'} />;
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header headerText={'Authentication'} />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
