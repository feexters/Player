// /* eslint-disable prettier/prettier *
import React from 'react';
import {Desk} from '@components/Desk';
import {Provider} from 'react-redux';
import {store} from '@store';

const App = () => {
  return (
    <Provider store={store}>
      <Desk />
    </Provider>
  );
};

export default App;
