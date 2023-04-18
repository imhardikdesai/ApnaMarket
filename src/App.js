import { BrowserRouter } from "react-router-dom";
import Router from "./routes/routes";
import ScrollToTop from "./components/scroll-to-top/ScrollToTop";
import ThemeProvider from "./theme";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ScrollToTop />
        <Router />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
