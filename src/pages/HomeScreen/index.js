import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import { Appbar, FAB } from 'react-native-paper';


// import { Container } from './styles';

export default class HomeScreen extends Component {

  _goBack = () => console.log('Went back');

  _onSearch = () => console.log('Searching');

  _onMore = () => console.log('Shown more');


  render() {
    return (
      <View style={styles.container}>
        <Appbar.Header style={styles.header}>
          <Appbar.Content
            color="#fff"
            title="Coletor de Dados"
            subtitle="K&M"
          />
          <Appbar.Action color="#fff" icon="search" onPress={this._onSearch} />
          <Appbar.Action color="#fff" icon="more-vert" onPress={this._onMore} />
        </Appbar.Header>
        <FAB
          style={styles.fab}
          icon="add"
          color="#fff"
          onPress={() => this.props.navigation.navigate('Inventario')}
        />
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

