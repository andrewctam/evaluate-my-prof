import "./App.scss";
import Home from "./components/home/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./components/user/Profile/Profile";
import { Provider } from "react-redux";
import store from "./app/store";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="profile/:username" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
