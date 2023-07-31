import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegistrationForm from "./screens/RegistrationForm";
import UsersList from "./screens/UsersList";
import Header from "./features/components/Header";
import { GlobalsProvider } from "./features/components/GlobalsContext";

function App() {
  return (
    <GlobalsProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/usersList" element={<UsersList />} />
        </Routes>
      </BrowserRouter>
    </GlobalsProvider>
  );
}

export default App;
