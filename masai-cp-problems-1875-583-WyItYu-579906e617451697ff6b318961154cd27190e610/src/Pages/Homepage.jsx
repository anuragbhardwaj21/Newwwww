import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../Redux/action";
import TaskItems from "../Components/TaskItems";

const Homepage = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return (
    <div>
      {tasks.map((task) => (
        <TaskItems key={task.id} id={task.id} title={task.title} status={task.status} />
      ))}
    </div>
  );
};

export default Homepage;
