import type { Task } from "../../../domain/task/task.type"

type Props = {
  task: Task;
  onComplete: (id: string) => void;
}

export default function TaskItem({ task, onComplete }: Props) {
  return (
    <article
      className="flex items-center justify-between gap-4 p-4 transition-all duration-200"
      style={{
        background: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
      }}
    >
      <div className="flex flex-col items-start gap-1 min-w-0">
        <span
          className="truncate w-full"
          style={{
            fontSize: '15px',
            fontWeight: 500,
            color: task.completed ? '#6e6e73' : '#1d1d1f',
            textDecoration: task.completed ? 'line-through' : 'none',
            transition: 'color 0.2s ease',
          }}
        >
          {task.title}
        </span>
        <span style={{ fontSize: '13px', color: '#6e6e73' }}>
          {task.assignedtoName}
        </span>
      </div>

      <button
        type="button"
        onClick={() => onComplete(task.id)}
        disabled={task.completed}
        aria-label={`Marcar "${task.title}" como completada`}
        aria-disabled={task.completed}
        className="shrink-0 transition-all duration-200"
        style={{
          background: task.completed ? 'rgba(0, 0, 0, 0.04)' : '#e8e8ed',
          color: task.completed ? '#6e6e73' : '#1d1d1f',
          borderRadius: '980px',
          padding: '6px 14px',
          fontSize: '13px',
          fontWeight: 500,
          border: 'none',
          cursor: task.completed ? 'not-allowed' : 'pointer',
          opacity: task.completed ? 0.5 : 1,
          letterSpacing: '-0.01em',
        }}
        onMouseEnter={e => {
          if (!task.completed) (e.currentTarget as HTMLButtonElement).style.background = '#d9d9de';
        }}
        onMouseLeave={e => {
          if (!task.completed) (e.currentTarget as HTMLButtonElement).style.background = '#e8e8ed';
        }}
      >
        {task.completed ? 'Completada' : 'Completar'}
      </button>
    </article>
  )
}
