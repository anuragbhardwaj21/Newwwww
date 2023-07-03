import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const tasks = useSelector((state) => state.tasks);

  const pendingTasksCount = tasks.filter((task) => !task.status).length;
  const completedTasksCount = tasks.filter((task) => task.status).length;
  const totalTasksCount = tasks.length;

  return (
    <div
      style={{
        border: "1px solid black",
        height: "fit-content",
        display: "flex",
        padding: "0.5rem",
      }}
    >
      <div style={{ flex: "1" }}>
        <div>Pending Tasks</div>
        <div data-testid="pending-task-count">{pendingTasksCount}</div>
      </div>
      <div style={{ flex: "1" }}>
        <div>Completed Tasks</div>
        <div data-testid="completed-task-count">{completedTasksCount}</div>
      </div>
      <div style={{ flex: "1" }}>
        <div>Total Tasks</div>
        <div data-testid="total-tasks-count">{totalTasksCount}</div>
      </div>
      <div style={{ display: "flex" }}>
        <Link to="/add">
          <button data-testid="add-task">Add Task</button>
        </Link>
      </div>
    </div>
  );
};
