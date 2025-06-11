import "./App.css";
import TaskForm from "./components/TaskForm";
import Task from "./components/Task";
import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    setTasks(tasks || []);
  }, []);
  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(name) {
    setTasks((prev) => {
      return [...prev, { name: name, done: false }];
    });
  }

  function removeTask(indexToRemove) {
    setTasks((prev) => {
      return prev.filter((taskObject, index) => index !== indexToRemove);
    });
  }

  function updateTaskDone(taskIndex, newDone) {
    setTasks((prev) => {
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    });
  }
  function renameTask(index, newName) {
    setTasks((prev) => {
      const newTasks = [...prev];
      newTasks[index].name = newName;
      return newTasks;
    });
  }
  return (
    <main>
      <h1>Todo-List</h1>

      <TaskForm onAdd={addTask} />
      {tasks.map((task, index) => (
        <Task
          {...task}
          onRename={(newName) => renameTask(index, newName)}
          onTrash={() => removeTask(index)}
          onToggle={(done) => updateTaskDone(index, done)}
        />
      ))}
    </main>
  );
}

export default App;
