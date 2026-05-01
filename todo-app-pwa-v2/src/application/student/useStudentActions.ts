import { useEffect, useState } from "react";
import type { Student } from "../../domain/student/student.type";
import getStudents from "./getStudents";
import registerStudent from "./registerStudent";
import { loadCurrentStudent } from "../../infrastructure/student/student.local";

export default function useStudentActions() {
  const [student, setStudent] = useState<Student | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const loadStudents = async () => {
    const result = await getStudents();
    setStudents(result);
  };

  useEffect(() => {
    setStudent(loadCurrentStudent());
    void loadStudents();
  }, []);

  const openRegisterDialog = () => {
    setIsRegisterOpen(true);
  };

  const closeRegisterDialog = () => {
    setIsRegisterOpen(false);
  };

  const registerCurrentStudent = async (
    name: string,
    studentKey: string
  ): Promise<void> => {
    const registeredStudent = await registerStudent(name, studentKey);

    setStudent(registeredStudent);
    await loadStudents();
  };

  return {
    student,
    students,
    isRegisterOpen,
    openRegisterDialog,
    closeRegisterDialog,
    registerCurrentStudent,
  };
}
