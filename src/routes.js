import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';

import HomeScreen from '~/pages/HomeScreen';
import LoginScreen from '~/pages/LoginScreen';
import ScanScreen from '~/pages/ScanScreen';
import InventScreen from '~/pages/InventScreen';
import ControleScreen from '~/pages/ControleScreen';

const AppStack = createSwitchNavigator({
  Home: HomeScreen,
  Inventario: InventScreen,
  Controle: ControleScreen,
  Scan: ScanScreen
});

const AuthStack = createSwitchNavigator({
  Login: LoginScreen,
});

const TestStack = createSwitchNavigator({
  Test: LoginScreen,
});

const Routes = createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStack,
      App: AppStack,
      Test: TestStack,
    },
    {
      initialRouteName: 'Auth',
    }
  )
);

export default Routes;
