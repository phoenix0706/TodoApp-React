import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Switch } from "react-router-dom";
import Todo from "./components/Todo";
import Login from "./components/Login";
import Signup from "./components/Signup";
import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <>
      <Navbar user={user}></Navbar>
      <Switch>
        <Route exact path="/">
          <Todo user={user}></Todo>
        </Route>
        <Route path="/Login">
          <Login user={user}></Login>
        </Route>
        <Route path="/Signup">
          <Signup user={user}></Signup>
        </Route>
      </Switch>
    </>
  );
}

export default App;
