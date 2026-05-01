import type { Student } from "../../domain/student/student.type";

const CURRENT_STUDENT_KEY = "current-student-v2";

export function saveCurrentStudent(student: Student): void {
  localStorage.setItem(CURRENT_STUDENT_KEY, JSON.stringify(student));
}

export function loadCurrentStudent(): Student | null {
  const raw = localStorage.getItem(CURRENT_STUDENT_KEY);

  if (!raw) {
    return null;
  }

  return JSON.parse(raw) as Student;
}

export function clearCurrentStudent(): void {
  localStorage.removeItem(CURRENT_STUDENT_KEY);
}
