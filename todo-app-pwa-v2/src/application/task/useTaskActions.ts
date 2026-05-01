import createTask from "./createTask";
import toggleTaskCompleted from "./toggleTaskCompleted";
import useTasksRealtime from "./useTasksRealtime";

export default function useTaskActions() {
  const { tasks, isLoading } = useTasksRealtime();

  const addTask = async (
    title: string,
    assignedTo: string,
    assignedToName: string
  ): Promise<void> => {
    await createTask(title, assignedTo, assignedToName);
  };

  const onComplete = async (
    id: string,
    completed: boolean
  ): Promise<void> => {
    await toggleTaskCompleted(id, completed);
  };

  return {
    tasks,
    isLoading,
    addTask,
    onComplete,
  };
}
