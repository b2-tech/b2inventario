import React from 'react';
import {
  Text, StyleSheet, View, Alert,
} from 'react-native';
import {
  Appbar, FAB, TextInput, Provider, Menu, Divider,
} from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-community/async-storage';
import { ActivityIndicatorLoad, ViewLoad } from './styles';
import api from '~/services/api';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.inputRefs = {};

    this.state = {
      visible: false,
      mesaSelected: null,
      controle: [],
      modelos: [],
      locais: [],
      modeloSelected: [],
      localSelected: [],
      isLoading: true,
      usuarioSelected: null,
    };
  }

  componentDidMount() {
    this.loadControles();
    this.loadLocais();
    this.loadModelos();
  }

    loadControles = async () => {
      const idControle = this.props.navigation.getParam('controleParam', '1');
      const response = await api.get(`/controles/${idControle}`);
      this.setState({ controle: response.data });
      this.setState({ isLoading: false });
    };

    loadModelos = async () => {
      const response = await api.get('/modelos');
      const result = response.data.map(data => ({
        label: data.nomeModelo,
        value: data.id,
      }));

      this.setState({ modelos: result });
      this.setState({ isLoading: false });
    };

    loadLocais = async () => {
      const response = await api.get('/locais');
      const result = response.data.map(data => ({
        label: data.nomeLocal,
        value: data.id,
      }));

      this.setState({ locais: result });
      this.setState({ isLoading: false });
    };

    _goBack = () => this.props.navigation.navigate('Home');

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

    handleUsuarioChange = (usuarioSelected) => {
      this.setState({ usuarioSelected });
    };

    handleMesaChange = (mesaSelected) => {
      this.setState({ mesaSelected });
    };

    handleScanCodigo = async () => {
      const {
        controle, usuarioSelected, modeloSelected, localSelected,
      } = this.state;
      if (usuarioSelected === null || modeloSelected.length === 0 || localSelected.length === 0) {
        Alert.alert('Alerta', 'Informações obrigatorias');
      } else {
        const storageUser = await AsyncStorage.getItem('@storage_User');
        const usuario = JSON.parse(storageUser);
        const itemInventario = {
          idKM: '',
          idSerie: '',
          idControle: controle.id,
          usuario: usuarioSelected,
          idModelo: modeloSelected,
          idLocal: localSelected,
          idUsuario: usuario.id,
        };
        const item = JSON.stringify(itemInventario);
        this.props.navigation.navigate('Scan', { inventarioParam: item });
      }
    }

    render() {
      const {
        controle,
        isLoading,
        visible,
        modeloSelected,
        modelos,
        usuarioSelected,
        locais,
        localSelected,
        mesaSelected,
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
              <Appbar.BackAction
                onPress={this._goBack}
                color="#fff"
              />
              <Appbar.Content
                color="#fff"
                title={`Inventario - ${controle.id}`}
                subtitle={`Data: ${controle.dataInventario}`}
              />
              <Appbar.Action color="#fff" icon="search" onPress={this._onSearch} />
              <Menu
                visible={visible}
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
            <View style={styles.containerSelect}>
              <Text>Modelo do Equipamento</Text>
              <RNPickerSelect
                placeholder={{
                  label: 'Selecione o modelo...',
                  value: null,
                }}
                items={modelos}
                onValueChange={(value) => {
                  this.setState({
                    modeloSelected: value,
                  });
                }}
                onUpArrow={() => {
                  this.inputRefs.picker2.togglePicker();
                }}
                onDownArrow={() => {
                  this.inputRefs.modelo.focus();
                }}
                // style={{ ...pickerSelectStyles }}
                value={modeloSelected}
                ref={(el) => {
                  this.inputRefs.picker = el;
                }}
              />

              <View style={{ paddingVertical: 30 }}>
                <TextInput
                  style={styles.input}
                  mode="outlined"
                  label="Usuario do Equipamento"
                  value={usuarioSelected}
                  onChangeText={this.handleUsuarioChange}
                  autoCapitalize="characters"
                  autoCorrect
                />
              </View>

              <Text>Local do Equipamento</Text>
              <RNPickerSelect
                placeholder={{
                  label: 'Selecione o local...',
                  value: null,
                }}
                items={locais}
                onValueChange={(value) => {
                  this.setState({
                    localSelected: value,
                  });
                }}
                onUpArrow={() => {
                  this.inputRefs.picker.togglePicker();
                }}
                onDownArrow={() => {
                  this.inputRefs.local.focus();
                }}
                // style={{ ...pickerSelectStyles }}
                value={localSelected}
                ref={(el) => {
                  this.inputRefs.picker2 = el;
                }}
              />

              <View style={{ paddingVertical: 30 }}>
                <TextInput
                  style={styles.input}
                  mode="outlined"
                  label="Mesa"
                  value={mesaSelected}
                  onChangeText={this.handleMesaChange}
                  autoCapitalize="characters"
                  autoCorrect
                />
              </View>

              <View style={{ paddingVertical: 5 }} />


            </View>
            <FAB
              style={styles.fab}
              icon="camera"
              color="#fff"
              label="Ler Codigo"
              onPress={this.handleScanCodigo}
            />
          </View>
        </Provider>
      );
    }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  containerSelect: {
    paddingTop: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },

  header: {
    backgroundColor: '#1ec4f5',
  },

  input: {
    borderColor: '#1ec4f5',
  },

  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#1ec4f5',
  },

});
