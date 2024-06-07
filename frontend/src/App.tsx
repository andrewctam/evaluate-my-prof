import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./components/user/Profile/Profile";
import { Provider } from "react-redux";
import store from "./app/store";
import Home from "./components/home/Home";
import ProfessorPage from "./components/reviews/ProfessorPage/ProfessorPage";

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
