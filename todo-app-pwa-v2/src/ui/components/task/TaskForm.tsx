import { useState } from 'react'
import { Student } from '../../../domain/student/student.type';

type Props = {
  addTask: (title: string) => void;
  students: Student[];
}

export default function TaskForm({ addTask, students }: Props) {
  const [title, setTitle] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');

  const addTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask(title.trim());
    setTitle('');
    setSelectedStudent('');
  }

  return (
    <form
      onSubmit={addTaskSubmit}
      aria-label="Formulario para agregar tarea"
      className="flex flex-col gap-4 sm:flex-row sm:items-end"
      style={{
        background: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.08)',
        padding: '24px',
      }}
    >
      <div className="flex flex-col gap-2 flex-1">
        <label
          htmlFor="task-title"
          style={{ fontSize: '13px', fontWeight: 500, color: '#1d1d1f' }}
        >
          Detalle de tarea
        </label>
        <input
          id="task-title"
          type="text"
          value={title}
          placeholder="Escribe el detalle de la tarea"
          onChange={(e) => setTitle(e.target.value)}
          className="apple-input w-full transition-all duration-200"
          style={{
            borderRadius: '8px',
            border: '1px solid rgba(0, 0, 0, 0.15)',
            padding: '8px 12px',
            fontSize: '15px',
            color: '#1d1d1f',
            background: '#ffffff',
          }}
        />
      </div>

      <div className="flex flex-col gap-2 flex-1">
        <label
          htmlFor="task-student"
          style={{ fontSize: '13px', fontWeight: 500, color: '#1d1d1f' }}
        >
          Estudiante asignado
        </label>
        <select
          id="task-student"
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
          className="apple-input w-full transition-all duration-200"
          style={{
            borderRadius: '8px',
            border: '1px solid rgba(0, 0, 0, 0.15)',
            padding: '8px 12px',
            fontSize: '15px',
            color: selectedStudent ? '#1d1d1f' : '#6e6e73',
            background: '#ffffff',
            appearance: 'none',
            cursor: 'pointer',
          }}
        >
          <option value="" disabled style={{ color: '#6e6e73' }}>Seleccionar estudiante</option>
          {students.map((student) => (
            <option key={student.id} value={student.id} style={{ color: '#1d1d1f' }}>
              {student.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={!title.trim()}
        aria-disabled={!title.trim()}
        className="transition-all duration-200 shrink-0"
        style={{
          background: title.trim() ? '#0071e3' : '#e8e8ed',
          color: title.trim() ? '#ffffff' : '#6e6e73',
          borderRadius: '980px',
          padding: '9px 20px',
          fontSize: '14px',
          fontWeight: 500,
          border: 'none',
          cursor: title.trim() ? 'pointer' : 'not-allowed',
          letterSpacing: '-0.01em',
          whiteSpace: 'nowrap',
        }}
      >
        Guardar
      </button>
    </form>
  )
}
