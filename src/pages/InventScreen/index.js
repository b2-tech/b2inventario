import React from 'react';
import { Alert, Text, StyleSheet, View } from 'react-native';
import { Appbar, FAB, TextInput, Provider, Menu, Divider } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import api from '~/services/api'

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.inputRefs = {};

        this.state = {
            visible: false,
            mesaSelected: [],
            controle: [],
            modelos: [],
            locais: [],
            modeloSelected: [],
            localSelected: [],
            isLoading: true,
            usuarioSelected: [],
        };
    }

    componentDidMount() {
        this.loadControles();
        this.loadLocais();
        this.loadModelos();
    }

    loadControles = async () => {
      const idControle = this.props.navigation.getParam('controleParam', '1')
      const response = await api.get('/controles/'+idControle);
      this.setState({ controle: response.data });
      this.setState({ isLoading: false });
      this.setState({ isFetching: false });
    };

    loadModelos = async () => {
      const response = await api.get('/modelos');
      const result = response.data.map(data => {
        return {
          label: data.nomeModelo,
          value: data.id
        }
      });

      console.log(result);
      this.setState({ modelos: result });
      this.setState({ isLoading: false });
    };

    loadLocais = async () => {
      const response = await api.get('/locais');
      const result = response.data.map(data => {
        return {
          label: data.nomeLocal,
          value: data.id
        }
      });

      console.log(result);
      this.setState({ locais: result });
      this.setState({ isLoading: false });
    };

    _goBack = () => this.props.navigation.goBack();

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
            <View style={styles.containerSelect}>
                <Text>Modelo do Equipamento</Text>
                <RNPickerSelect
                    placeholder={{
                        label: 'Selecione o modelo...',
                        value: null,
                    }}
                    items={this.state.modelos}
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
                    style={{ ...pickerSelectStyles }}
                    value={this.state.modeloSelected}
                    ref={(el) => {
                        this.inputRefs.picker = el;
                    }}
                />

                <View style={{ paddingVertical: 30 }}>
                  <TextInput
                    mode='outlined'
                    label='Usuario do Equipamento'
                    // onChangeText={(textUser) => this.setState({textUser})}
                    value= {this.state.usuarioSelected}
                    onChangeText={this.handleUsuarioChange}
                    autoCapitalize="none"
                    autoCorrect={true}
                  ></TextInput>
                </View>

                <Text>Local do Equipamento</Text>
                <RNPickerSelect
                    placeholder={{
                        label: 'Selecione o local...',
                        value: null,
                    }}
                    items={this.state.locais}
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
                    style={{ ...pickerSelectStyles }}
                    value={this.state.localSelected}
                    ref={(el) => {
                        this.inputRefs.picker2 = el;
                    }}
                />

                <View style={{ paddingVertical: 30 }}>
                  <TextInput
                    mode='outlined'
                    label='Mesa'
                    // onChangeText={(textUser) => this.setState({textUser})}
                    value= {this.state.mesaSelected}
                    onChangeText={this.handleMesaChange}
                    autoCapitalize="none"
                    autoCorrect={true}
                  ></TextInput>
                </View>

                <View style={{ paddingVertical: 5 }} />



                </View>
            <FAB
              style={styles.fab}
              icon="camera"
              color="#fff"
              label= 'Ler Codigo'
              onPress={() => this.props.navigation.navigate('Scan')}
            >
            </FAB>
      </View>
      </Provider>
        );
    }
}

const styles = StyleSheet.create({

  container: {
    flex: 1
  },

  containerSelect: {
      paddingTop: 30,
      backgroundColor: '#fff',
      justifyContent: 'center',
      paddingHorizontal: 10,
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

});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
    },
});
