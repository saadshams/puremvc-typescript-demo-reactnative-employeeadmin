// jest.setup.js
// Shared Jest configuration for React Native Testing Library.

// Ensure native module lookups used by the app don't crash in Jest.
// The app's `NativeCalculator` reads `NativeModules.Calculator` at import-time.
const rn = require('react-native');
rn.NativeModules = rn.NativeModules || {};
rn.NativeModules.Calculator = rn.NativeModules.Calculator || {
  add: (a, b) => a + b,
};
// `NativeEventEmitter` checks for these methods.
rn.NativeModules.employeeadmin = rn.NativeModules.employeeadmin || {};
rn.NativeModules.employeeadmin.addListener =
  rn.NativeModules.employeeadmin.addListener || jest.fn();
rn.NativeModules.employeeadmin.removeListeners =
  rn.NativeModules.employeeadmin.removeListeners || jest.fn();

// React Navigation uses BackHandler subscription APIs.
if (!rn.BackHandler || typeof rn.BackHandler !== 'object') {
  rn.BackHandler = {};
}
Object.defineProperty(rn.BackHandler, 'addEventListener', {
  configurable: true,
  value: rn.BackHandler.addEventListener || jest.fn(() => ({ remove: jest.fn() })),
});
Object.defineProperty(rn.BackHandler, 'removeEventListener', {
  configurable: true,
  value: rn.BackHandler.removeEventListener || jest.fn(),
});

// Vector icons render as a plain Text in Jest.
jest.mock('react-native-vector-icons/FontAwesome6', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return function Icon(props) {
    const name = props?.name ?? '';
    return React.createElement(Text, null, name);
  };
});

// Mock RNEUI because its distribution uses ESM which Jest may fail to parse.
jest.mock('@rneui/themed', () => {
  const React = require('react');
  const { Text, TouchableOpacity } = require('react-native');

  const Button = ({ title, onPress }) =>
    React.createElement(TouchableOpacity, { onPress, accessibilityRole: 'button' }, React.createElement(Text, null, title));

  const CheckBox = ({ title, checked, onPress }) =>
    React.createElement(
      TouchableOpacity,
      { onPress, accessibilityRole: 'checkbox', accessibilityState: { checked: !!checked } },
      React.createElement(Text, null, title),
    );

  return { Button, CheckBox };
});

// React Navigation setup can require platform-specific APIs (BackHandler, etc).
// For unit tests, we only need a lightweight passthrough container.
jest.mock('@react-navigation/native', () => {
  const React = require('react');

  const NavigationContainer = ({ children }) =>
    React.createElement(React.Fragment, null, children);

  // Present for TS imports that may remain in compiled output.
  const RouteProp = {};

  return { NavigationContainer, RouteProp };
});

jest.mock('@react-navigation/native-stack', () => {
  const React = require('react');

  const createNativeStackNavigator = () => {
    const Navigator = ({ initialRouteName, children }) => {
      // Render only the initial screen for test simplicity.
      const screens = React.Children.toArray(children).filter(Boolean);
      const initial =
        screens.find((c) => c?.props?.name === initialRouteName) ?? screens[0];

      return initial ?? React.createElement(React.Fragment, null);
    };

    const Screen = ({ component: ScreenComponent, name, options }) => {
      // Stub navigation/route props expected by the app components.
      const navigation = {
        navigate: jest.fn(),
        goBack: jest.fn(),
        setParams: jest.fn(),
      };
      const route = { params: undefined };

      if (!ScreenComponent) return React.createElement(React.Fragment, null);
      return React.createElement(ScreenComponent, { navigation, route, name, options });
    };

    return { Navigator, Screen };
  };

  return { createNativeStackNavigator };
});

