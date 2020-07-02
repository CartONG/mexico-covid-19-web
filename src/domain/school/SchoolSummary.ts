export interface SchoolSummary {
  id: string;
  name: string;
  level: string;
  locality: string;
  maleStudentAttendance: number;
  femaleStudentAttendance: number;
  teacherAttendance: number;
  adminAttendance: number;
  coordinates: [number, number];
}
