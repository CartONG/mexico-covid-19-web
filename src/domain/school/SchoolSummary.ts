export interface SchoolSummary {
  id: string;
  name: string;
  level: string;
  locality: string;
  studentAttendance: number;
  teacherAttendance: number;
  adminAttendance: number;
  maleStudentAbsenceProportion: number;
  femaleStudentAbsenceProportion: number;
  coordinates: [number, number];
}
