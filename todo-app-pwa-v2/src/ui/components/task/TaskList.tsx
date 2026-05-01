import TaskItem from "./TaskItem";
import type { Task } from "../../../domain/task/task.type"

type Props = {
  tasks: Task[];
  onComplete: (id: string, completed: boolean) => void;
}; 

export default function TaskList({ tasks, onComplete }: Props) {
  if (tasks.length === 0) {
    return (
      <p
        className="py-6 text-center"
        role="status"
        style={{ fontSize: '15px', color: '#6e6e73' }}
      >
        No hay tareas registradas.
      </p>
    )
  }

  return (
    <ul aria-label="Lista de tareas" className="flex flex-col gap-3 list-none p-0 m-0">
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskItem task={task} onComplete={onComplete} />
        </li>
      ))}
    </ul>
  )
}
