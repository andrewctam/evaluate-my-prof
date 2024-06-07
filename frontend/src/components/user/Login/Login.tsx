import { useState } from "react";
import "./Login.scss";
import { useAppDispatch } from "../../../app/hooks";
import { useLoginMutation, useRegisterMutation } from "../../../features/api/apiSlice";
import { LoginRegisterPayload } from "../../../features/api/types";

export default function Login() {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registering, setRegistering] = useState(false);
  const [error, setError] = useState("");

  const [login, {isLoading: loginIsLoading}] = useLoginMutation();
  const [register, {isLoading: registerIsLoading}] = useRegisterMutation();
  
  const loginRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loginIsLoading || registerIsLoading) {
      return;
    }

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

    const body: LoginRegisterPayload = {
      username,
      password,
      email: registering ? email : undefined,
    };

    try {
      if (registering) {
        await register(body).unwrap();
      } else {
        await login(body).unwrap();
      }

      setError("");

      
    } catch (err) {
      setError("Error.");
      return;
    }
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
