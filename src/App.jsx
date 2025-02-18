import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AuthRoutes from "./routes/AuthRoutes";
import UserRoutes from "./routes/UserRouter";
import {persistor, store} from "../src/redux/Store/Store";
import {PersistGate} from "redux-persist/lib/integration/react";
import {Provider} from "react-redux";
import {Toaster} from "sonner";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={"Loading"} persistor={persistor}>
        <Toaster richColors position="bottom-right" />
        <Router>
          <Routes>
            <Route path="/*" element={<UserRoutes />} />
            <Route path="auth/*" element={<AuthRoutes />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
