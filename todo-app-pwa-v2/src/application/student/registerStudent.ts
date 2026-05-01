import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import type { Student } from "../../domain/student/student.type";
import { db } from "../../infrastructure/firebase/firebase.config";
import { saveCurrentStudent } from "../../infrastructure/student/student.local";

export default async function registerStudent(
  name: string,
  studentKey: string
): Promise<Student> {
  const cleanName = name.trim();
  const cleanKey = studentKey.trim();

  if (!cleanName) {
    throw new Error("El nombre es obligatorio.");
  }

  if (!cleanKey) {
    throw new Error("La key es obligatoria.");
  }

  const studentsRef = collection(db, "students");
  const q = query(studentsRef, where("studentKey", "==", cleanKey));
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    const existing = snapshot.docs[0];
    const data = existing.data();

    const student: Student = {
      id: existing.id,
      name: data.name as string,
      studentKey: data.studentKey as string,
    };

    saveCurrentStudent(student);
    return student;
  }

  const newStudentRef = doc(studentsRef);

  await setDoc(newStudentRef, {
    name: cleanName,
    studentKey: cleanKey,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  const student: Student = {
    id: newStudentRef.id,
    name: cleanName,
    studentKey: cleanKey,
  };

  saveCurrentStudent(student);
  return student;
}
