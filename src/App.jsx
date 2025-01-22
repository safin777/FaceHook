import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} exact></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/me" element={<ProfilePage />}></Route>
        <Route path="/register" element={<RegistrationPage />}></Route>
        <Route path="/*" element={<NotFoundPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
