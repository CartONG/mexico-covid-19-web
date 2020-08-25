export interface SchoolSummary {
  id: string;
  name: string;
  turn: string;
  locality: string;
  studentAttendance: number;
  teacherAttendance: number;
  adminAttendance: number;
  maleStudentAbsence: number;
  femaleStudentAbsence: number;
  coordinates: [number, number];
}
