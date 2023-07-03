import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateTask } from "../Redux/action";

const EditPage = () => {
  const { id } = useParams();
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const task = tasks.find((task) => task.id === parseInt(id));
    if (task) {
      setTitle(task.title);
      setStatus(task.status);
    }
  }, [id, tasks]);

  const handleUpdateTask = (e) => {
    e.preventDefault();
    dispatch(updateTask(id, { title, status }));
    navigate("/");
  };

  return (
    <div>
      <form onSubmit={handleUpdateTask}>
        <input
          data-testid="edit-task-title"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          data-testid="edit-select-option"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value={false}>Pending</option>
          <option value={true}>Completed</option>
        </select>
        <button data-testid="edit-update" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditPage;
