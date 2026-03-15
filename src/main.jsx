import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthContext.jsx";
import FireStoreProvider from "./context/FireStoreContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <FireStoreProvider>
          <App />
        </FireStoreProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
