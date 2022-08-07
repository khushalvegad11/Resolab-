import React from "react";
import store from "./redux/store";
import { Provider } from "react-redux";
import ResoRoutes from './routes';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { APP_PREFIX_PATH } from 'configs/AppConfig';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
          <Route path={APP_PREFIX_PATH} component={ResoRoutes} />
        </Switch>
      </Provider>
      <ToastContainer enableMultiContainer containerId={'TOP_RIGHT'} position={toast.POSITION.TOP_RIGHT} />
    </BrowserRouter>
  );
}

export default App;
