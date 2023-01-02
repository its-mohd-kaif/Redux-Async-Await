import { AppProvider } from "@shopify/polaris";
import LandingPage from "./Components/LandingPage";
import en from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/build/esm/styles.css";
import store from "./redux/store";
import { Provider } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import Error from "./Components/Error";
import "./App.css";

function App() {
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <AppProvider i18n={en}>
        <Provider store={store}>
          <LandingPage />
        </Provider>
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
