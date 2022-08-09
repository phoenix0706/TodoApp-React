import React, { useState } from "react";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";
const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const [password, setPassword] = useState("");
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      window.M.toast({
        html: `welcome ${result.user.email}`,
        classes: "green",
      });

      history.push("/");
    } catch (err) {
      window.M.toast({ html: err.message, classes: "green" });
    }
  };
  return (
    <>
      <div className="center container" style={{ maxWidth: "500px" }}>
        <h3>Please Login!</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <input
              type="email"
              onChange={emailChangeHandler}
              placeholder="email"
              value={email}
            />
            <input
              type="password"
              onChange={passwordChangeHandler}
              placeholder="password"
              value={password}
            />
          </div>
          <button type="submit" className="btn blue light-blue darken-4">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
