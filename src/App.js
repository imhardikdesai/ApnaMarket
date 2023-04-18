import { BrowserRouter } from "react-router-dom";
import Router from "./routes/routes";
import ScrollToTop from "./components/scroll-to-top/ScrollToTop";
import ThemeProvider from "./theme";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <ScrollToTop />
          <Toaster />
          <Router />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
