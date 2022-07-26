import React from "react";
import store from "./redux/store";
import { Provider } from "react-redux";
import ResoLabRoutes from "./routes/Routes";

function App() {
  return (
    <Provider store={store}>
      <ResoLabRoutes />
    </Provider>
  );
}

export default App;
