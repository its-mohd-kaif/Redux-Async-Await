import { AppProvider } from "@shopify/polaris";
import LandingPage from "./Components/LandingPage";
import en from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/build/esm/styles.css";
import store from "./redux/store";
import { Provider } from "react-redux";
import "./App.css";

function App() {
  return (
    <AppProvider i18n={en}>
      <Provider store={store}>
        <LandingPage />
      </Provider>
    </AppProvider>
  );
}

export default App;
