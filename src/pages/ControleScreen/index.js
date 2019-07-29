import React, { Component } from 'react';
import {
  View, StyleSheet, FlatList,
} from 'react-native';
import {
  Appbar, Provider, Menu, Divider, Paragraph, DataTable, Card, Avatar, Title, Searchbar,
} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { ActivityIndicatorLoad, ViewLoad } from './styles';
import api from '~/services/api';

// import { Container } from './styles';

export default class ControleScreen extends Component {
  state = {
    visible: false,
    controle: [],
    inventario: [],
    isLoading: true,
    firstQuery: '',
    isFetching: true,
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
    const idControle = this.props.navigation.getParam('controleParam', '0');
    const response = await api.get(`/controles/${idControle}`);
    this.setState({ controle: response.data });
    this.setState({ isLoading: false });
  };

  loadItems = async () => {
    const response = await api.get('/inventarios');
    this.setState({ inventario: response.data });
    this.setState({ isLoading: false });
  };

  goBack = () => this.props.navigation.navigate('Home');

  onSearch = () => console.log('Searching');

  openMenu = () => this.setState({ visible: true });

  closeMenu = () => this.setState({ visible: false });

  Logout = async () => {
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
    <DataTable.Row>
      <DataTable.Cell>{item.idModelo}</DataTable.Cell>
      <DataTable.Cell>{item.idKM}</DataTable.Cell>
      <DataTable.Cell>{item.idSerie}</DataTable.Cell>
      <DataTable.Cell>{item.idLocal}</DataTable.Cell>
    </DataTable.Row>
  );

  render() {
    const {
      controle, visible, isLoading, isFetching, inventario,
    } = this.state;
    const { firstQuery } = this.state;

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
            <Appbar.BackAction
              onPress={this.goBack}
              color="#fff"
            />
            <Appbar.Content
              color="#fff"
              title={`Inventario - ${controle.id}`}
              subtitle={`Data: ${controle.dataInventario}`}
            />
            <Appbar.Action color="#fff" icon="search" onPress={this.onSearch} />
            <Menu
              visible={visible}
              onDismiss={this.closeMenu}
              anchor={
                <Appbar.Action color="#fff" icon="more-vert" onPress={this.openMenu} />
              }
            >
              <Menu.Item onPress={() => {}} title="Melqui" />
              <Divider />
              <Menu.Item onPress={this.Logout} title="Sair" />
            </Menu>
          </Appbar.Header>
          <View style={styles.cardView}>
            <Card.Title title={`Empresa - ${controle.idEmpresa}`} subtitle={controle.id} left={props => <Avatar.Icon style={styles.cardIcon} {...props} icon="assignment" />} />
            <Card.Content>
              <Title>Observações</Title>
              <Divider />
              <Paragraph>
                {controle.observacao}
              </Paragraph>
            </Card.Content>
          </View>
          <Searchbar
            placeholder="Procurar"
            onChangeText={(query) => { this.setState({ firstQuery: query }); }}
            value={firstQuery}
          />
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Modelo</DataTable.Title>
              <DataTable.Title>ID KM</DataTable.Title>
              <DataTable.Title>Serie</DataTable.Title>
              <DataTable.Title>Localização</DataTable.Title>
            </DataTable.Header>
            <FlatList
              data={inventario}
              keyExtractor={(item, index) => index.toString()}
              renderItem={this.renderItem}
              onRefresh={() => this.onRefresh()}
              refreshing={isFetching}
            />
            <DataTable.Pagination
              page={1}
              numberOfPages={3}
              onPageChange={(page) => { console.log(page); }}
              label="1-2 of 6"
            />
          </DataTable>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  header: {
    backgroundColor: '#1ec4f5',
  },

});
