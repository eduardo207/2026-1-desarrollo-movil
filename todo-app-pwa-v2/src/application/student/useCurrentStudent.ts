import { useEffect, useState } from "react";
import type { Student } from "../../domain/student/student.type";
import { loadCurrentStudent } from "../../infrastructure/student/student.local";

export default function useCurrentStudent() {
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    setStudent(loadCurrentStudent());
  }, []);

  return {
    student,
    setStudent,
  };
}
