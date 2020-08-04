import { SchoolDailyReport } from '@/domain/school-daily-report/SchoolDailyReport';

export interface RestSchoolDailyReport {
  fecha: string;
  indiceAsistenciaDocentes: number;
  indiceInasistenciaAlumnos: number;
  indiceInasistenciaAlumnas: number;
}

export const toSchoolDailyReport = (restSchoolDailyReport: RestSchoolDailyReport): SchoolDailyReport => ({
  date: restSchoolDailyReport.fecha,
  teacherAttendance: restSchoolDailyReport.indiceAsistenciaDocentes,
  maleStudentAbsence: restSchoolDailyReport.indiceInasistenciaAlumnos,
  femaleStudentAbsence: restSchoolDailyReport.indiceInasistenciaAlumnas,
});
