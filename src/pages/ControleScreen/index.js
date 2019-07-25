import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import api from '~/services/api'
import { Appbar, FAB, TextInput, Provider, Menu, Divider, Paragraph, Card, Avatar, Title, DataTable } from 'react-native-paper';

// import { Container } from './styles';

export default class ControleScreen extends Component {

  state = {
    visible: false,
    controle: [],
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
    const idControle = this.props.navigation.getParam('controleParam', '0')
    const response = await api.get('/controles/'+idControle);
    console.log(response)
    this.setState({ controle: response.data });
    this.setState({ isLoading: false });
    this.setState({ isFetching: false });
  };

  _goBack = () => this.props.navigation.goBack(null);

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



  render() {

    const controle = this.state.controle;

    return (
      <Provider>
      <View style={styles.container}>
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction
              onPress={this._goBack}
              color="#fff"
          />
          <Appbar.Content
            color="#fff"
            title={"Inventario - "+ controle.id}
            subtitle={"Data: " + controle.dataInventario}
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
        <View style={styles.cardView}>
          <Card.Title title={"Empresa - "+ controle.idEmpresa} subtitle={controle.id} left={(props) => <Avatar.Icon style={styles.cardIcon} {...props} icon="assignment" />} />
          <Card.Content>
            <Title>Observações</Title>
            <Divider />
            <Paragraph>
              {controle.observacao}
            </Paragraph>
          </Card.Content>
          <DataTable>
        <DataTable.Header>
          <DataTable.Title>Modelo</DataTable.Title>
          <DataTable.Title>ID KM</DataTable.Title>
          <DataTable.Title>Serie</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>Dell - 3480</DataTable.Cell>
          <DataTable.Cell numeric>87465</DataTable.Cell>
          <DataTable.Cell numeric>123154825</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Dell - 3480</DataTable.Cell>
          <DataTable.Cell numeric>87475</DataTable.Cell>
          <DataTable.Cell numeric>564564564</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Apple - MacPro</DataTable.Cell>
          <DataTable.Cell numeric>47465</DataTable.Cell>
          <DataTable.Cell numeric>Não Visivel</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Lenovo - B320</DataTable.Cell>
          <DataTable.Cell numeric>Não Visivel</DataTable.Cell>
          <DataTable.Cell numeric>554825</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Pagination
          page={1}
          numberOfPages={3}
          onPageChange={(page) => { console.log(page); }}
          label="1-4 de 4"
        />
      </DataTable>
        </View>
      </View>
      </Provider>
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

