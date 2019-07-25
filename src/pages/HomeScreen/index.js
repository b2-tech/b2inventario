import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Appbar, FAB, Menu, Button, Divider, Provider, Card, Title, Paragraph, Avatar } from 'react-native-paper';
import api from '~/services/api'

// import { Container } from './styles';

export default class HomeScreen extends Component {

  state = {
    visible: false,
    controles: [],
    isLoading: true,
    isFetching: false,
  };

  componentDidMount() {
    this.loadControles();
  }

  onRefresh() {
    this.setState({ isFetching: true }, () => {
      this.loadControles();
    });
  }

  loadControles = async () => {
    const response = await api.get('/controles');
    this.setState({ controles: response.data });
    this.setState({ isLoading: false });
    this.setState({ isFetching: false });
  };

  _goBack = () => console.log('Went back');

  _onSearch = () => console.log('Searching');

  _openMenu = () => this.setState({ visible: true });

  _closeMenu = () => this.setState({ visible: false });

  _Logout = async () => {
    try {
      // const response = await api.post('/logout');
      await AsyncStorage.setItem('@storage_Token', '');
      await AsyncStorage.setItem('@storage_User', '');

      this.props.navigation.navigate('Login');
    } catch (_err) {
      console.log(_err);
    }
  }

  renderItem = ({ item }) => (
        <Card style={styles.cardView}>
          <Card.Title title={"Inventario - "+ item.id + " - Celso Lisboa"} subtitle={item.dataInventario} left={(props) => <Avatar.Icon style={styles.cardIcon} {...props} icon="assignment" />} />
          <Card.Actions>
            <Button color="#1ec4f5" mode="outlined"
              onPress={() => this.props.navigation.navigate("Controle", { controleParam: item.id })}
            >Vizualizar</Button>
            <Button
              style={styles.buttonCard}
              mode="contained"
              onPress={() => this.props.navigation.navigate("Inventario", { controleParam: item.id })}
            >
            Inventariar
            </Button>
          </Card.Actions>
        </Card>
  );

  render() {
    return (
      <Provider>
      <View style={styles.container}>
        <Appbar.Header style={styles.header}>
          <Appbar.Content
            color="#fff"
            title="Inventarios Disponiveis"
            subtitle="K&M"
          />
          <Appbar.Action color="#fff" icon="search" onPress={this._onSearch} />
          <Menu
            visible={this.state.visible}
            onDismiss={this._closeMenu}
            anchor={
              <Appbar.Action color="#fff" icon="more-vert" onPress={this._openMenu} />
            }
          >
            <Menu.Item onPress={() => {}} title="Melqui" />
            <Divider />
            <Menu.Item onPress={this._Logout} title="Sair" />
          </Menu>
        </Appbar.Header>
        <FlatList
          data={this.state.controles}
          keyExtractor={item => item.id}
          renderItem={this.renderItem}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching}
        />
      </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#EAEBED'
  },

  header: {
    backgroundColor: '#1ec4f5'
  },

  cardView: {
    marginTop: 10
  },

  buttonCard: {
    marginLeft: 15,
    backgroundColor: '#1ec4f5'
  },

  cardIcon: {
    backgroundColor: '#1468A8',
  },

  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#1ec4f5',
  },
})

