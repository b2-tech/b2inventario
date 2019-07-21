import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';

import HomeScreen from '~/pages/HomeScreen';
import LoginScreen from '~/pages/LoginScreen';
import ScanScreen from '~/pages/ScanScreen';
import InventScreen from './pages/InventScreen';

const AppStack = createSwitchNavigator({
  Home: HomeScreen,
  Inventario: InventScreen,
});

const ScanStack = createSwitchNavigator({
  Scan: ScanScreen,
});

const AuthStack = createSwitchNavigator({
  Login: LoginScreen,
});

const TestStack = createSwitchNavigator({
  Test: InventScreen,
});

const Routes = createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStack,
      App: AppStack,
      Test: TestStack,
      Scan: ScanStack
    },
    {
      initialRouteName: 'Test',
    }
  )
);

export default Routes;
