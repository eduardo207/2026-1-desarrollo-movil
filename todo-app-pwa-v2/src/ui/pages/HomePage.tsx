import TaskForm from "../components/task/TaskForm"
import TaskList from "../components/task/TaskList"
import StudentInfo from "../components/student/StudentInfo"
import StudentRegisterDialog from "../components/student/StudentRegisterDialog"
import useTaskActions from "../../application/task/useTaskActions";
import useStudentActions from "../../application/student/useStudentActions";
function HomePage() {

  const {
    student,
    students,
    isRegisterOpen,
    openRegisterDialog,
    closeRegisterDialog,
    registerCurrentStudent,
  } = useStudentActions();

  const {
    tasks,
    isLoading,
    addTask,
    onComplete,
  } = useTaskActions();

  return (
    <div className="flex flex-col min-h-screen" style={{ background: '#f5f5f7' }}>
      <header
        aria-label="Encabezado de la aplicación"
        className="sticky top-0 z-10 px-6 py-3 md:px-8"
        style={{
          background: 'rgba(245, 245, 247, 0.72)',
          backdropFilter: 'saturate(180%) blur(20px)',
          WebkitBackdropFilter: 'saturate(180%) blur(20px)',
          borderBottom: '0.5px solid rgba(0, 0, 0, 0.1)',
        }}
      >
        <h1 style={{ fontSize: '17px', fontWeight: 600, color: '#1d1d1f', letterSpacing: '-0.01em' }}>
          TO DO App
        </h1>
      </header>

      <main
        aria-label="Contenido principal"
        className="flex flex-col flex-1 gap-6 px-6 py-8 md:px-8 w-full max-w-2xl mx-auto box-border"
      >
        <StudentInfo
          student={student}
          onRegisterStudentOpen={openRegisterDialog}
        />

        <section aria-label="Agregar tarea">
          <TaskForm addTask={addTask} students={students} />
        </section>

        <section aria-label="Tareas">
          <p
            className="mb-3"
            style={{
              fontSize: '11px',
              fontWeight: 600,
              color: '#6e6e73',
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
            }}
          >
            Lista de tareas
          </p>
          <TaskList tasks={tasks} onComplete={onComplete} />
        </section>
      </main>

      <StudentRegisterDialog
        isOpen={isRegisterOpen}
        onClose={closeRegisterDialog}
        onRegister={registerCurrentStudent}
      />

      <footer
        aria-label="Pie de página"
        className="py-6 text-center"
        style={{ fontSize: '13px', color: '#6e6e73' }}
      >
        UMES
      </footer>
    </div>
  )
}

export default HomePage
