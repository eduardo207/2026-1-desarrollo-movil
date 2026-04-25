import TaskForm from "../components/task/TaskForm"
import TaskList from "../components/task/TaskList"
import type {Task} from "../../domain/task/task.type"
import type {Student} from "../../domain/student/student.type"
import StudentInfo from "../components/student/StudentInfo"
import StudentRegisterDialog from "../components/student/StudentRegisterDialog"
import {useState} from 'react';

function HomePage() {
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);

  const addTask = (title: string) => {}
  const onComplete = (id: string) => {}
  const onRegister = async (name: string, studentKey: string) => {}

  const tasks: Task[] = [
    {
      id: '1',
      title: 'Tarea 1',
      completed: false,
      assignedto: '123',
      assignedtoName: 'Juan Perez'
    },
    {
      id: '2',
      title: 'Tarea 2',
      completed: true,
      assignedto: '1234',
      assignedtoName: 'Jerson Quiñonez'
    }
  ]

  const student: Student = {
    id: '123',
    name: 'Juan Perez',
    studentKey: '2026-1'
  }

  return (
    <div className="flex flex-col h-screen gap-4">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold">TO DO App</h1>
      </header>
      <StudentInfo student={student} onRegister={onRegister} />
      <TaskForm addTask={addTask}/>
      <h3>Lista de tareas</h3>
      <TaskList tasks={tasks} onComplete={onComplete} />
      <StudentRegisterDialog 
        isOpen={isRegisterDialogOpen} 
        onClose={() => setIsRegisterDialogOpen(false)} 
        onRegister={onRegister} 
      />
      <footer className="bg-gray-800 text-white p-4 text-center">
        UMES
      </footer>
    </div>
  )
}

export default HomePage
