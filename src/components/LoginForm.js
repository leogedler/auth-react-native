import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginFrom extends Component {

  state = {
    email: '',
    password: '',
    error: '',
    loading: false
  };

  onButtonPressed = async () => {
    this.setState({ error: '', loading: true });
    const { email, password } = this.state;

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      this.onLoginSuccess();
    } catch (e) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        this.onLoginSuccess();
      } catch (error) {
        this.onLoginFail();
      }
    }
  }
  
  onLoginFail() {
    this.setState({ error: 'Authentication failed', loading: false });
  }
  
  onLoginSuccess() {
    this.setState({ 
      email: '',
      password: '',
      loading: false,
      error: ''
     });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return (
      <Button onPress={this.onButtonPressed}>
        Log in
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            value={this.state.email}
            label={'Email'}
            placeholder={'user@gmail.com'}
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>

        <CardSection>
          <Input
            placeholder='password'
            value={this.state.password}
            label="Password"
            secureTextEntry
            onChangeText={password => this.setState({ password })}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    padding: 15,
    alignSelf: 'center',
    color: 'red'
  }
};

export default LoginFrom;
