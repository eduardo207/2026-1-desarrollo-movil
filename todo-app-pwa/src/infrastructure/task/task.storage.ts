import type { Task } from "../../domain/task/task.types";

const KEY_STORAGE_TASKS = 'tasks';

export function saveTasks(tasks: Task[]){
  localStorage.setItem(KEY_STORAGE_TASKS, JSON.stringify(tasks));
}

export function loadTasks(): Task[] {
  const tasks = localStorage.getItem(KEY_STORAGE_TASKS);
  return tasks ? JSON.parse(tasks) : [];
}
