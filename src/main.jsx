import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { App } from "./App.jsx";
import { store, persistor } from "src/store/store";
import "./styles/index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { StLoader } from "./components/shared/StLoader/StLoader.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={<StLoader />} persistor={persistor}>
      <ToastContainer autoClose={3000} />
      <App />
    </PersistGate>
  </Provider>
);
