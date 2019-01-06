import React from 'react';
import AppContainer from './Navigation/Navigation'
import {Provider} from 'react-redux'
import Store from './Store/ConfigureStore'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'

export default class App extends React.Component {

  render() {
    let persistor = persistStore(Store)
    return (
      <Provider store={Store}>
        <PersistGate persistor={persistor}>
          <AppContainer/>
        </PersistGate>  
      </Provider>
    );
  }
}
