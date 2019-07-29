import React, { Component } from 'react';
import {
  Button, Text, View, Alert,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import api from '~/services/api';

class ProductScanRNCamera extends Component {
  constructor(props) {
    super(props);
    this.camera = null;
    this.barcodeCodes = [];

    this.state = {
      camera: {
        type: RNCamera.Constants.Type.back,
        flashMode: RNCamera.Constants.FlashMode.auto,
      },
      isReady: true,
      codigo: null,
    };
  }

  onBarCodeRead(scanResult) {
    if (this.state.isReady) {
      const codigoLido = scanResult.data;
      this.setState({
        isReady: false,
        codigo: codigoLido,
      });
      Alert.alert(
        'Codigo Identificado',
        scanResult.data,
        [
          { text: 'Ler Novamente', onPress: () => this.lerNovamente() },
          { text: 'Incluir', onPress: () => this.incluirItem() },
        ],
        { cancelable: false },
      );
    }
  }

  lerNovamente() {
    this.setState({
      isReady: true,
    });
  }

  async incluirItem() {
    try {
      const dados = JSON.parse(this.props.navigation.getParam('inventarioParam', '1'));
      const response = await api.post('/inventarios', {
        idKM: dados.idKM = parseInt(this.state.codigo),
        idSerie: parseInt(dados.idSerie),
        idControle: parseInt(dados.idControle),
        usuario: dados.usuario,
        idModelo: parseInt(dados.idModelo),
        idLocal: parseInt(dados.idLocal),
        idUsuario: parseInt(dados.idUsuario),
        mesa: dados.mesa,
      });
      Alert.alert(
        'Codigo Cadastrado',
        response.idKM,
        [
          { text: 'Ler Novo Codigo', onPress: () => this.lerNovamente() },
          { text: 'Finalizar', onPress: () => this.props.navigation.navigate('Inventario') },
        ],
        { cancelable: false },
      );
      console.log(response);
    } catch (_e) {
      console.log(_e);
    }
  }

  async takePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          defaultTouchToFocus
          flashMode={this.state.camera.flashMode}
          mirrorImage={false}
          onBarCodeRead={this.onBarCodeRead.bind(this)}
          onFocusChanged={() => {}}
          onZoomChanged={() => {}}
          androidCameraPermissionOptions={{
            title: 'Permissão de camera',
            message: 'Precisamos de sua permissão para usar a camera',
            buttonPositive: 'Sim',
            buttonNegative: 'Cancelar',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permissão de Audio',
            message: 'Precisamos de sua permissão para usar o audio',
            buttonPositive: 'Sim',
            buttonNegative: 'Cancelar',
          }}
          style={styles.preview}
          type={this.state.camera.type}
        />
        <View style={[styles.overlay, styles.topOverlay]}>
          <Text style={styles.scanScreenMessage}>Leia o codigo K&M.</Text>
        </View>
        <View style={[styles.overlay, styles.bottomOverlay]}>
          <Button
            onPress={() => { this.props.navigation.navigate('Inventario'); }}
            style={styles.enterBarcodeManualButton}
            title="Voltar"
          />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  enterBarcodeManualButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  scanScreenMessage: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default ProductScanRNCamera;
