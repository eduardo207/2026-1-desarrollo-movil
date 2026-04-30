import type { Student } from "../../../domain/student/student.type"

type Props = {
  student: Student;
  onRegisterStudentOpen: () => void;
}

export default function StudentInfo({ student, onRegisterStudentOpen }: Props) {
  return (
    <section
      aria-label="Información del estudiante"
      className="flex items-center justify-between p-6 gap-4"
      style={{
        background: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.08)',
      }}
    >
      <dl className="flex flex-col gap-2">
        <div className="flex gap-2 items-baseline">
          <dt style={{ fontSize: '13px', color: '#6e6e73', minWidth: '64px' }}>Nombre</dt>
          <dd style={{ fontSize: '15px', fontWeight: 500, color: '#1d1d1f', margin: 0 }}>
            {student.name}
          </dd>
        </div>
        <div className="flex gap-2 items-baseline">
          <dt style={{ fontSize: '13px', color: '#6e6e73', minWidth: '64px' }}>Matrícula</dt>
          <dd style={{ fontSize: '15px', fontWeight: 500, color: '#1d1d1f', margin: 0 }}>
            {student.studentKey}
          </dd>
        </div>
      </dl>

      <button
        type="button"
        onClick={onRegisterStudentOpen}
        aria-label="Registrar o cambiar estudiante"
        className="shrink-0 transition-all duration-200"
        style={{
          background: '#0071e3',
          color: '#ffffff',
          borderRadius: '980px',
          padding: '8px 16px',
          fontSize: '14px',
          fontWeight: 500,
          border: 'none',
          cursor: 'pointer',
          letterSpacing: '-0.01em',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#0077ed'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#0071e3'; }}
        onMouseDown={e => { (e.currentTarget as HTMLButtonElement).style.background = '#006bce'; }}
        onMouseUp={e => { (e.currentTarget as HTMLButtonElement).style.background = '#0077ed'; }}
      >
        Registrar
      </button>
    </section>
  )
}
