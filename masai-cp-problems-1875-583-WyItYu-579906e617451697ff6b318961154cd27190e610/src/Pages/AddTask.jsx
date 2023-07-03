import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTask } from "../Redux/action";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddTask = (e) => {
    e.preventDefault();
    dispatch(addTask({ title }));
    navigate("/");
  };

  return (
    <div>
      <form onSubmit={handleAddTask}>
        <input
          data-testid="add-task-input-box"
          placeholder="add task here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button data-testid="add-task-button" type="submit">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
