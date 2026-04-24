import { useState } from "react";
import type { Task } from "../../domain/task/task.types";
import validateTaskTitle from "../../domain/task/task.validators";
import generateId from "../../shared/generateId.util";
import { loadTasks, saveTasks } from "../../infrastructure/task/task.storage";

export default function useTaskActions() {

  const [tasks, setTasks] = useState<Task[]>(loadTasks());

  const addTask = (title: string) => {
    if (!validateTaskTitle(title))
      return;

    const newTask: Task = {
      id: generateId(),
      title,
      completed: false,
      addedAt: new Date(),
    }
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  }

  const onComplete = (id: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed,
        }
      }
      return task;
    });
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  }

  const onDelete = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  }

  return {
    tasks,
    addTask,
    onComplete,
    onDelete,
  }
}
