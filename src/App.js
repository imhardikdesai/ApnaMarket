import { BrowserRouter } from "react-router-dom";
import Router from "./routes/routes";
import ScrollToTop from "./components/scroll-to-top/ScrollToTop";
import ThemeProvider from "./theme";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from './redux/store'


function App() {
  return (
    <ThemeProvider >
      <BrowserRouter>
        <Provider store={store}>
          <AuthProvider>
            <ScrollToTop />
            <Toaster />
            <Router />
          </AuthProvider>
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
