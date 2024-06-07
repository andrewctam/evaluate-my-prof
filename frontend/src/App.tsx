import "./App.scss";
import Home from "./components/home/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./components/user/Profile/Profile";
import { Provider } from "react-redux";
import store from "./app/store";
import ProfessorPage from "./components/home/ProfessorPage/ProfessorPage";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/reviews/:schoolName/:profName" element={<ProfessorPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
