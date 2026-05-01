import { collection, getDocs, orderBy, query } from "firebase/firestore";
import type { Student } from "../../domain/student/student.type";
import { db } from "../../infrastructure/firebase/firebase.config";

export default async function getStudents(): Promise<Student[]> {
  const studentsRef = collection(db, "students");
  const q = query(studentsRef, orderBy("name", "asc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((document) => {
    const data = document.data();

    return {
      id: document.id,
      name: data.name as string,
      studentKey: data.studentKey as string,
      createdAt: data.createdAt?.seconds ?? 0,
      updatedAt: data.updatedAt?.seconds ?? 0,
    };
  });
}