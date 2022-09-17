import React from "react";
import TodoList from "./components/TodoList";
import "./sass/_global.sass";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="app d-flex justify-content-center align-items-center">
      <TodoList />
    </div>
  );
}
export default App;
