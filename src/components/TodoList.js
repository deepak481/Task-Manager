import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "./Card";
import todo_logo from "../assets/todo.webp";

const getTasks = () => {
  let list = localStorage.getItem("tasks");
  if (list === "undefined") {
    return [];
  }
  list = JSON.parse(list);
  let tasks = [];

  list &&
    Object.keys(list).map((task) => {
      return tasks.push(list[task]);
    });

  tasks.sort(function (a, b) {
    return Date.parse(b.createdAt) - Date.parse(a.createdAt) > 0
      ? 1
      : Date.parse(b.createdAt) - Date.parse(a.createdAt) < 0
      ? -1
      : 0;
  });
  return tasks;
};

function TodoList() {
  const [totalTasks, setTotalTasks] = useState(getTasks());
  const [keysToSearch, setKeysToSearch] = useState([]);
  const [inputText, setinputText] = useState({
    task: "",
    status: "",
  });
  const handleInputChange = (e) => {
    const tempObj = {
      task: e.target.value,
      status: true,
    };
    setinputText({ ...tempObj });
  };

  const handleAdd = () => {
    let keywords = inputText.task.split("#");
    let taskToAdd = inputText;
    let wordsToSearch = keywords.filter((ele, i) => i !== 0);
    setKeysToSearch(wordsToSearch);
    keywords[0] ? (taskToAdd.task = keywords[0]) : "";
    const now = new Date();
    if (keywords[0]) {
      let isAlreadeAdded = false;
      isAlreadeAdded = totalTasks.some((element) => {
        if (element.task.indexOf(keywords[0]) > -1) {
          return true;
        }
      });
      if (isAlreadeAdded) {
        alert("Same task already added!!");
      } else {
        const updatedTotalTasks = [
          ...totalTasks,
          { ...taskToAdd, createdAt: now.toString() },
        ];
        updatedTotalTasks.sort(function (a, b) {
          return Date.parse(b.createdAt) - Date.parse(a.createdAt) > 0
            ? 1
            : Date.parse(b.createdAt) - Date.parse(a.createdAt) < 0
            ? -1
            : 0;
        });
        keywords[0] && totalTasks ? setTotalTasks(updatedTotalTasks) : "";
      }
    }
  };

  useEffect(() => {
    let tasks = [...totalTasks];
    tasks.sort(function (a, b) {
      return Date.parse(b.createdAt) - Date.parse(a.createdAt) > 0
        ? 1
        : Date.parse(b.createdAt) - Date.parse(a.createdAt) < 0
        ? -1
        : 0;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // fs.writeFile("../assets/taskList.json",)
    setinputText({ task: "", status: "" });
  }, [totalTasks]);

  const resetAll = () => {
    setTotalTasks([]);
  };

  return (
    <div className="container my-3 d-flex flex-column justify-content-center align-items-center w-100">
      <img src={todo_logo} height="auto" width="200px" className="mb-2" />

      <Button
        style={{
          position: "fixed",
          left: "30px",
          top: "10px",
          fontSize: "16px",
          // backgroundColor: "#448fe0",
          color: "grey",
          fontWeight: "normal",
        }}
        onClick={() => resetAll()}
      >
        Reset
      </Button>
      <div className="inputContainer w-50 d-flex">
        <TextField
          id="outlined-basic"
          label="Enter your task to add or search"
          variant="outlined"
          fullWidth
          value={inputText.task}
          onChange={(e) => handleInputChange(e)}
          onKeyDown={(event) => (event.key === "Enter" ? handleAdd() : "")}
        />
        <Button
          className=" button"
          variant="outlined"
          onClick={() => handleAdd()}
        >
          Add / Search
        </Button>
      </div>
      <div className=" card_container my-4">
        {totalTasks && Object.keys(totalTasks).length
          ? Object.keys(totalTasks).map((task) => {
              return (
                <div
                  style={{
                    display: totalTasks[task].status ? "" : "none",
                  }}
                >
                  <Card
                    key={`task-${task}`}
                    value={totalTasks[task].task}
                    status={totalTasks[task].status}
                    createdAt={totalTasks[task].createdAt}
                    setTotalTasks={setTotalTasks}
                    totalTasks={totalTasks}
                    keysToSearch={keysToSearch}
                  />
                </div>
              );
            })
          : ""}
        {totalTasks && Object.keys(totalTasks).length
          ? Object.keys(totalTasks).map((task) => {
              return (
                <div
                  style={{
                    display: !totalTasks[task].status ? "" : "none",
                    backgroundColor: "",
                  }}
                >
                  <Card
                    key={`task-${task}`}
                    value={totalTasks[task].task}
                    status={totalTasks[task].status}
                    createdAt={totalTasks[task].createdAt}
                    setTotalTasks={setTotalTasks}
                    totalTasks={totalTasks}
                    keysToSearch={keysToSearch}
                  />
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}

export default TodoList;
