import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./components/user/Profile/Profile";
import { Provider } from "react-redux";
import store from "./app/store";
import Home from "./components/home/Home";
import ProfessorPage from "./components/reviews/ProfessorPage/ProfessorPage";
import { useEffect } from "react";
import { useCheckSessionMutation } from "./features/api/apiSlice";

export default function App() {
  return (
    <Provider store={store}>
      <App2 />
    </Provider>
  );
}

// separate child component to access store
const App2 = () => {
  const [checkSession, { isLoading }] = useCheckSessionMutation();
  
  useEffect(() => {
    const sessionToken = localStorage.getItem("sessionToken");
    const username = localStorage.getItem("username");

    if (!isLoading && sessionToken && username) {
      checkSession({ sessionToken, username });
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route
          path="/reviews/:schoolName/:profName"
          element={<ProfessorPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};
