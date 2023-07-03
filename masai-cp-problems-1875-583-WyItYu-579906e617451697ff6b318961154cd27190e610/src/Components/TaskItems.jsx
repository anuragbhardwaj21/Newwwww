import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteTask } from "../Redux/action";

const TaskItem = ({ id, title, status }) => {
  const dispatch = useDispatch();

  const handleDeleteTask = () => {
    dispatch(deleteTask(id));
  };

  return (
    <div
      style={{
        border: "1px solid black",
        borderRadius: "5px",
        padding: "0.2rem",
        paddingBottom: "0.5rem",
        display: "flex",
        flexDirection: "column",
        maxWidth: "380px",
        margin: "auto",
        marginBottom: "1rem",
        justifyContent: "center",
      }}
      data-testid={`task-item-${id}`}
    >
      <div
        data-testid="task-title"
        style={{ fontSize: "24px", fontWeight: "600" }}
      >
        {title}
      </div>
      <div data-testid="task-status" style={{ fontSize: "18px" }}>
        Status: {status ? "Completed" : "Pending"}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Link to={`/edit/${id}`}>
          <button data-testid="edit-task">Edit</button>
        </Link>
        <button data-testid="delete-task" onClick={handleDeleteTask}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
