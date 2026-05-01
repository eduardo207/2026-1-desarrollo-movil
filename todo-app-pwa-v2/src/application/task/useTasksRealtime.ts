import { useEffect, useState } from "react";
import type { Task } from "../../domain/task/task.type";
import { subscribeTasksRealtime } from "../../infrastructure/task/task.firestore";

export default function useTasksRealtime() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeTasksRealtime((nextTasks) => {
      setTasks(nextTasks);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return {
    tasks,
    isLoading,
  };
}
