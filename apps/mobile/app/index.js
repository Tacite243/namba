import Acceuil from './acceuil/index';
import Login from './login/index';
import Register from './register/index';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { createDrawerNavigator } from '@react-navigation/drawer';


const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <Drawer.Navigator initialRouteName="Register">
        <Drawer.Screen name="Register" component={Register} options={{ title: "S'identifier" }} />
        <Drawer.Screen name="Login" component={Login} options={{ title: 'Se Connecter' }} />
        <Drawer.Screen name="Acceuil" component={Acceuil} options={{ title: 'Accueil' }} />
      </Drawer.Navigator>
    </Provider>
  );
}
