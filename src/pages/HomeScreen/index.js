import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Appbar,
  Menu,
  Button,
  Divider,
  Provider,
  Card,
  Avatar,
} from 'react-native-paper';
import Moment from 'react-moment';
import {
  ActivityIndicatorLoad,
  ViewLoad,
} from './styles';
import api from '~/services/api';

export default class HomeScreen extends Component {
  state = {
    visible: false,
    controles: [],
    isLoading: true,
    isFetching: false,
    usuario: null,
  };

  componentDidMount() {
    this.loadControles();
    this.loadUser();
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

  loadUser = async () => {
    const storageUser = await AsyncStorage.getItem('@storage_User');
    const usuario = JSON.parse(storageUser);
    this.setState({ usuario: usuario.nome });
  }

  _onSearch = () => console.log('Searching');

  _openMenu = () => this.setState({ visible: true });

  _closeMenu = () => this.setState({ visible: false });

  _Logout = async () => {
    try {
      // const response = await api.post('/logout');
      await AsyncStorage.setItem('@storage_Token', '');
      await AsyncStorage.setItem('@storage_User', '');

      this.navigation.navigate('Login');
    } catch (_err) {
      console.log(_err);
    }
  }

  renderItem = ({ item }) => (
    <Card style={styles.cardView}>
      <Card.Title title={`Inventario - ${item.id} - Celso Lisboa`} subtitle={item.dataInventario} left={props => <Avatar.Icon style={styles.cardIcon} {...props} icon="assignment" />} />
      <Card.Actions>
        <Button
          color="#1ec4f5"
          mode="outlined"
          onPress={() => this.props.navigation.navigate('Controle', { controleParam: item.id })}
        >Visualizar
        </Button>
        <Button
          style={styles.buttonCard}
          mode="contained"
          onPress={() => this.props.navigation.navigate('Inventario', { controleParam: item.id })}
        >
            Inventariar
        </Button>
      </Card.Actions>
    </Card>
  );

  render() {
    const {
      visible, controles, isFetching, isLoading,
    } = this.state;

    if (isLoading) {
      return (
        <ViewLoad>
          <ActivityIndicatorLoad />
        </ViewLoad>
      );
    }

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
              visible={visible}
              onDismiss={this.closeMenu}
              anchor={
                <Appbar.Action color="#fff" icon="more-vert" onPress={this._openMenu} />
            }
            >
              <Menu.Item onPress={() => {}} title={this.state.usuario} />
              <Divider />
              <Menu.Item onPress={this._Logout} title="Sair" />
            </Menu>
          </Appbar.Header>
          <FlatList
            data={controles}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderItem}
            onRefresh={() => this.onRefresh()}
            refreshing={isFetching}
          />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#EAEBED',
  },

  header: {
    backgroundColor: '#1ec4f5',
  },

  cardView: {
    marginTop: 10,
  },

  buttonCard: {
    marginLeft: 15,
    backgroundColor: '#1ec4f5',
  },

  cardIcon: {
    backgroundColor: '#1468A8',
  },
});
