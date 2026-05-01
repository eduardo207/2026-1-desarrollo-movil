import { createTaskInFirestore } from "../../infrastructure/task/task.firestore";

export default async function createTask(
  title: string,
  assignedTo: string,
  assignedToName: string
): Promise<void> {
  const cleanTitle = title.trim();

  if (!cleanTitle) {
    throw new Error("El título es obligatorio.");
  }

  if (!assignedTo) {
    throw new Error("Debes seleccionar un estudiante.");
  }

  await createTaskInFirestore({
    title: cleanTitle,
    assignedTo,
    assignedToName,
  });
}
