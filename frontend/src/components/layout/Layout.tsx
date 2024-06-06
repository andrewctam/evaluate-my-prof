import { useEffect, useState } from "react";
import "./Layout.scss";
import Login from "../user/Login/Login";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../features/user/userSlice";

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [showLogin, setShowLogin] = useState(false);

  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setShowLogin(false);
  }, [user.sessionToken])
  
  const handleClick = () => {
    if (user.sessionToken) {
      dispatch(logout());
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
          {user.sessionToken ? `Logged in as ${user.username}. Log Out` : "Log in"}
        </span>
      </div>

      {children}
      {showLogin && <Login />}
    </>
  );
}
