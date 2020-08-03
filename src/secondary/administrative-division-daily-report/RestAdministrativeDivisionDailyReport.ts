import { AdministrativeDivisionDailyReport } from '@/domain/administrative-division-daily-report/AdministrativeDivisionDailyReport';

export interface RestAdministrativeDivisionDailyReport {
  fecha: string;
  indiceClasesPresenciales: number;
  indiceAsistenciaDocentes: number;
  indiceInasistenciaAlumnos: number;
  indiceInasistenciaAlumnas: number;
}
export const toAdministrativeDivisionHistory = (
  restAdministrativeDivisionHistory: RestAdministrativeDivisionDailyReport
): AdministrativeDivisionDailyReport => ({
  date: restAdministrativeDivisionHistory.fecha,
  giveClasses: restAdministrativeDivisionHistory.indiceClasesPresenciales,
  teacherAttendance: restAdministrativeDivisionHistory.indiceAsistenciaDocentes,
  maleStudentAbsence: restAdministrativeDivisionHistory.indiceInasistenciaAlumnos,
  femaleStudentAbsence: restAdministrativeDivisionHistory.indiceInasistenciaAlumnas,
});
