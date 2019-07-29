import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import api from '~/services/api';

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
  };

  componentDidMount() {
    this.authCheck();
  }

  handleEmailChange = (email) => {
    this.setState({ email });
  };

  handlePasswordChange = (password) => {
    this.setState({ password });
  };

  handleSignInPress = async () => {
    const { email, password } = this.state;

    if (email.length === 0 || password.length === 0) {
      this.setState({ error: 'Preencha usuário e senha para continuar!' }, () => false);
    } else {
      try {
        const response = await api.post('/login', {
          email,
          password,
        });

        await AsyncStorage.setItem('@storage_Token', response.data.token);
        await AsyncStorage.setItem('@storage_User', JSON.stringify(response.data.usuario));

        this.props.navigation.navigate('Home');
      } catch (_err) {
        this.setState({ error: 'Houve um problema com o login, verifique suas credenciais!' });
      }
    }
  };

  authCheck = async () => {
    const token = await AsyncStorage.getItem('@storage_Token');
    const user = await AsyncStorage.getItem('@storage_User');

    if (token && user) {
      this.props.navigation.navigate('Home');
    }
    this.setState({ isLoading: false });
  }


  render() {
    const {
      isLoading, email, password, error,
    } = this.state;

    if (isLoading) {
      return (
        <ViewLoad>
          <ActivityIndicatorLoad />
        </ViewLoad>
      );
    }

    const styles = StyleSheet.create({

      loginButton: {
        marginTop: 30,
        marginBottom: 30,
      },

    });

    return (
      <Container>
        <ContainerImageIssueMain>
          <ImageIssueMain source={reportImage} />
          <TextIssueMain>K&M Coletor de dados de Inventario</TextIssueMain>
        </ContainerImageIssueMain>
        <ContainerButtonIssueMain>
          <TextInput
            mode="outlined"
            label="Usuario"
            // onChangeText={(textUser) => this.setState({textUser})}
            value={email}
            onChangeText={this.handleEmailChange}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            mode="outlined"
            label="Senha"
            // onChangeText={(textPwd) => this.setState({textPwd})}
            value={password}
            onChangeText={this.handlePasswordChange}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
          />
          {error.length !== 0 && <ErrorMessage>{error}</ErrorMessage>}
          <Button style={styles.loginButton} color="#1ec4f5" mode="contained" onPress={this.handleSignInPress}>
            <TextButtonIssueMain>ENTRAR</TextButtonIssueMain>
          </Button>
        </ContainerButtonIssueMain>
      </Container>
    );
  }
}
