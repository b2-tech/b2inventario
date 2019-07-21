import React, { Component  } from 'react';
import { StyleSheet } from 'react-native';
import {
  Container,
  ContainerImageIssueMain,
  ImageIssueMain,
  TextIssueMain,
  ContainerButtonIssueMain,
  TextButtonIssueMain,
} from './styles';

import { TextInput, Button } from 'react-native-paper';
import reportImage from '~/assets/images/inventory.png';

export default class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      textUser: '',
      textPwd: ''
     };
  }

  render() {
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
            onChangeText={(textUser) => this.setState({textUser})}
            value= {this.state.textUser}
          />
          <TextInput
            mode='outlined'
            secureTextEntry={true}
            label='Senha'
            onChangeText={(textPwd) => this.setState({textPwd})}
            value= {this.state.textPwd}
          />
          <Button style={styles.loginButton} color="#1ec4f5" mode="contained" onPress={() => this.props.navigation.navigate('Home')}>
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

