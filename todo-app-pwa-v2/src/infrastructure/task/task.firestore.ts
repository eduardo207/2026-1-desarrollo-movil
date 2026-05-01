import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import type { Task } from "../../domain/task/task.type";
import { db } from "../firebase/firebase.config";

const TASKS_COLLECTION = "tasks";

type CreateTaskInput = {
  title: string;
  assignedTo: string;
  assignedToName: string;
};

export async function createTaskInFirestore(
  input: CreateTaskInput
): Promise<void> {
  await addDoc(collection(db, TASKS_COLLECTION), {
    title: input.title,
    completed: false,
    assignedTo: input.assignedTo,
    assignedToName: input.assignedToName,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function toggleTaskCompletedInFirestore(
  taskId: string,
  completed: boolean
): Promise<void> {
  const taskRef = doc(db, TASKS_COLLECTION, taskId);

  await updateDoc(taskRef, {
    completed: !completed,
    updatedAt: serverTimestamp(),
  });
}

export function subscribeTasksRealtime(
  onChange: (tasks: Task[]) => void
): () => void {
  const tasksRef = collection(db, TASKS_COLLECTION);
  const q = query(tasksRef, orderBy("createdAt", "desc"));

  return onSnapshot(q, (snapshot) => {
    const tasks: Task[] = snapshot.docs.map((document) => {
      const data = document.data();

      return {
        id: document.id,
        title: data.title as string,
        completed: data.completed as boolean,
        assignedto: data.assignedTo as string,
        assignedtoName: data.assignedToName as string,
      };
    });

    onChange(tasks);
  });
}
