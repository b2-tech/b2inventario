import React, { Component  } from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import api from '~/services/api'
import { StyleSheet } from 'react-native';

import {
  Container,
  ContainerImageIssueMain,
  ImageIssueMain,
  TextIssueMain,
  ContainerButtonIssueMain,
  TextButtonIssueMain,
  ErrorMessage,
  ViewLoad,
  ActivityIndicatorLoad,
} from './styles';

import { TextInput, Button } from 'react-native-paper';
import reportImage from '~/assets/images/inventory.png';

export default class LoginScreen extends Component {

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
    }).isRequired,
  };

  state = {
    email: '',
    password: '',
    error: '',
    isLoading: true,
    isFetching: false,
  };

  handleEmailChange = (email) => {
    this.setState({ email });
  };

  handlePasswordChange = (password) => {
    this.setState({ password });
  };

  handleSignInPress = async () => {
    if (this.state.email.length === 0 || this.state.password.length === 0) {
      this.setState({ error: 'Preencha usuário e senha para continuar!' }, () => false);
    } else {
      try {
        const response = await api.post('/login', {
          email: this.state.email,
          password: this.state.password,
        });

        await AsyncStorage.setItem('@storage_Token', response.data.token);
        await AsyncStorage.setItem('@storage_User', JSON.stringify(response.data.usuario));

        this.props.navigation.navigate('Home');

      } catch (_err) {
        console.log(_err);
        this.setState({ error: 'Houve um problema com o login, verifique suas credenciais!' });
      }
    }
  };

  async componentDidMount() {

    this.authCheck();

  }

  authCheck = async () => {

    const token = await AsyncStorage.getItem('@storage_Token');
    const user = await AsyncStorage.getItem('@storage_User');

    if (token && user) {
      this.props.navigation.navigate('Home');
    }
    this.setState({ isLoading: false });
  }

  render() {

    if (this.state.isLoading) {
      return (
        <ViewLoad>
          <ActivityIndicatorLoad />
        </ViewLoad>
      );
    }

    return (
      <Container>
        <ContainerImageIssueMain>
          <ImageIssueMain source={reportImage} />
          <TextIssueMain>K&M Coletor de dados de Inventario</TextIssueMain>
        </ContainerImageIssueMain>
        <ContainerButtonIssueMain>
          <TextInput
            mode='outlined'
            label='Usuario'
            // onChangeText={(textUser) => this.setState({textUser})}
            value= {this.state.email}
            onChangeText={this.handleEmailChange}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            mode='outlined'
            label='Senha'
            // onChangeText={(textPwd) => this.setState({textPwd})}
            value= {this.state.password}
            onChangeText={this.handlePasswordChange}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
          />
          {this.state.error.length !== 0 && <ErrorMessage>{this.state.error}</ErrorMessage>}
          <Button style={styles.loginButton} color="#1ec4f5" mode="contained" onPress={this.handleSignInPress}>
            <TextButtonIssueMain>ENTRAR</TextButtonIssueMain>
          </Button>
        </ContainerButtonIssueMain>
      </Container>
    );
  }
}

const styles = StyleSheet.create({

  loginButton: {
    marginTop: 30,
    marginBottom: 30
  }

});

