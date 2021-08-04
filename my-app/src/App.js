import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import AuthProvider from "./contexts/auth";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
