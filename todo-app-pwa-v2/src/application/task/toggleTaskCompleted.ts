import { toggleTaskCompletedInFirestore } from "../../infrastructure/task/task.firestore";

export default async function toggleTaskCompleted(
  taskId: string,
  completed: boolean
): Promise<void> {
  await toggleTaskCompletedInFirestore(taskId, completed);
}
