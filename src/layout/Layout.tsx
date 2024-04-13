import { useContext, useState } from "react";
import "./Layout.scss";
import Login from "../user/Login/Login";
import { Link } from "react-router-dom";
import { UserContext } from "../types/context";

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [showLogin, setShowLogin] = useState(false);

  const userContext = useContext(UserContext);
  const loggedIn = userContext.currentUser;

  return (
    <>
      <div className="navBar">
        <Link to="/">
          <h1>Evaluate My Professor</h1>
        </Link>

        <span
          className="loginLink"
          onClick={() => {
            setShowLogin(!showLogin);
          }}
        >
          {loggedIn ? `Logged in as ${loggedIn.name}` : "Log in"}
        </span>
      </div>

      {children}
      {showLogin && <Login />}
    </>
  );
}
