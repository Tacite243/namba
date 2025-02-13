import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import RootLayout from './app/_layout';



export default function App() {
  return (
    <Provider store={store}>
      <RootLayout />
    </Provider>
  );
}