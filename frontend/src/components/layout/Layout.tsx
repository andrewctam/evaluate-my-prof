import { useContext, useEffect, useState } from "react";
import "./Layout.scss";
import Login from "../user/Login/Login";
import { Link } from "react-router-dom";
import { UserContext, UserDispatchContext } from "../../types/context";
import { UserActionType } from "../../types/user-types";

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [showLogin, setShowLogin] = useState(false);

  const userContext = useContext(UserContext);
  const userDispatch = useContext(UserDispatchContext);

  useEffect(() => {
    setShowLogin(false);
  }, [userContext.sessionToken])
  
  const handleClick = () => {
    if (userContext.sessionToken) {
      userDispatch({
        type: UserActionType.LOGOUT,
        payload: {}
      });
    } else {
      setShowLogin(!showLogin);
    }
  }

  return (
    <>
      <div className="navBar">
        <Link to="/">
          <h1>Evaluate My Professor</h1>
        </Link>

        <span
          className="loginLink"
          onClick={handleClick}
        >
          {userContext.sessionToken ? `Logged in as ${userContext.username}. Log Out` : "Log in"}
        </span>
      </div>

      {children}
      {showLogin && <Login />}
    </>
  );
}
