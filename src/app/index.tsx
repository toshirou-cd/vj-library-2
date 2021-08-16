import React from 'react';

import { Provider } from 'react-redux';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import store from './store/myStore';
import ConfirmModal from './components/ConfirmModal';
import AppRouter from '@app/routers/components/AppRouter';




const App: React.FC = () => {
  return (
    <Provider store={store}>
     

      <AppRouter />
      {/* <ConfirmModal /> */}
      <ToastContainer position="bottom-right" autoClose={3000} />
     
    </Provider>
  );
};

export default App;
