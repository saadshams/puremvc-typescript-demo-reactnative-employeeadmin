/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Application from './src/Application';
import {name as appName} from './app.json';
import { Provider } from "react-redux";
import { store } from "./src/store/store";

const Root = () => (
  <Provider store={store}>
    <Application />
  </Provider>
);

AppRegistry.registerComponent(appName, () => Root);
