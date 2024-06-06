import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../../types/constants";

import "./Login.scss";
import { useAppDispatch } from "../../../app/hooks";
import { login } from "../../../features/user/userSlice";

export default function Login() {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registering, setRegistering] = useState(false);
  const [error, setError] = useState("");

  const loginRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registering) {
      if (email === "") {
        setError("Please enter an email");
        return;
      }
      const eduRegex = /^[^@]+@[^@]+\.edu$/;

      if (!eduRegex.test(email)) {
        setError("Please enter a valid .edu email");
        return;
      }
    }

    if (username === "") {
      setError("Please enter a username");
      return;
    }

    if (password === "") {
      setError("Please enter a password");
      return;
    }
    const action = registering ? "register" : "login";
    const url = `${API_URL}/users/${action}`;

    const body = JSON.stringify({
      username,
      password,
      email: registering ? email : undefined,
    });
    const config = {
      headers: {
        "Content-Type": "application/json"
      },
    };

    await axios
      .post(url, body, config)
      .then((response) => {
        console.log(response);
        dispatch(login({
          username,
          sessionToken: response.data.message
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form className="login" onSubmit={loginRegister}>
      <h1>{registering ? "Register" : "Login"}</h1>

      <div className="switch" onClick={() => setRegistering(!registering)}>
        {registering ? "Switch to Login" : "Switch to Register"}
      </div>

      {registering && (
        <input
          placeholder="Enter your .edu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      )}
      <input
        placeholder="Enter a username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Enter a password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="error">{error}</div>

      <button onClick={loginRegister}>
        {registering ? "Register" : "Login"}
      </button>
    </form>
  );
}
