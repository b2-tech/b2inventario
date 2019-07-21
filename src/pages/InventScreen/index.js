import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { Appbar, FAB, TextInput } from 'react-native-paper';


// import { Container } from './styles';

export default class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      textUser: '',
      textPwd: ''
     };
  }

  _goBack = () => this.props.navigation.navigate('Home');

  _onSearch = () => console.log('Searching');

  _onMore = () => console.log('Shown more');


  render() {
    return (
      <View style={styles.container}>
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction
            onPress={this._goBack}
            color="#fff"
          />
          <Appbar.Content
            color="#fff"
            title="Dados do Inventario"
            subtitle="Inventario: 001 de 01/12/2019"
          />
          <Appbar.Action color="#fff" icon="search" onPress={this._onSearch} />
          <Appbar.Action color="#fff" icon="more-vert" onPress={this._onMore} />
        </Appbar.Header>
        <View>
          <TextInput
            mode='outlined'
            label='Usuario'
            onChangeText={(textUser) => this.setState({textUser})}
            value= {this.state.textUser}
          />
        </View>
        <FAB
          style={styles.fab}
          icon="camera"
          color="#fff"
          onPress={() => this.props.navigation.navigate('Scan')}
        >
          <Text>Ler codigo de barras</Text>
        </FAB>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1
  },

  header: {
    backgroundColor: '#1ec4f5'
  },

  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#1ec4f5',
  },
})

