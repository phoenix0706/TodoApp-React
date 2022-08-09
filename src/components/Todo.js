import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { db } from "../firebase";
let unsubscribe = () => {};
const Todo = ({ user }) => {
  const [text, setText] = useState("");
  const [mytodos, setTodos] = useState([]);
  const history = useHistory();
  useEffect(() => {
    if (user) {
      const docref = db.collection("todos").doc(user.uid);
      unsubscribe = docref.onSnapshot((docsnap) => {
        if (docsnap.exists) {
          console.log(docsnap.data().todos);
          setTodos(docsnap.data().todos);
        } else {
          console.log("no docs");
        }
      });
    } else {
      history.push("/login");
    }
    return () => {
      unsubscribe();
    };
  }, []);

  const addtodo = () => {
    db.collection("todos")
      .doc(user.uid)
      .set({ todos: [...mytodos, text] });
  };

  const todohandler = (e) => {
    setText(e.target.value);
  };
  const deletetodo = (deletetodo) => {
    const docref = db.collection("todos").doc(user.uid);
    docref.get().then((docsnap) => {
      const result = docsnap.data().todos.filter((todo) => todo != deletetodo);
      docref.update({
        todos: result,
      });
    });
  };
  return (
    <>
      <div className="container">
        <h1>Add Todos</h1>
        <div className="input-field ">
          <input
            type="text"
            placeholder="Add todos"
            value={text}
            onChange={todohandler}
          />
        </div>
        <button className="btn light-blue darken-4 " onClick={addtodo}>
          Add
        </button>
        <ul className="collection">
          {mytodos.map((todo) => {
            return (
              <li
                className="collection-item  light-blue lighten-4
              "
                style={{ margin: "3px 0" }}
                key={todo}
              >
                {todo}
                <i
                  className="material-icons right"
                  onClick={() => deletetodo(todo)}
                  style={{ cursor: "pointer" }}
                >
                  delete
                </i>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Todo;
