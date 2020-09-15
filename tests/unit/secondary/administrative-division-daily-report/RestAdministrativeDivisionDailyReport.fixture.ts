import { RestAdministrativeDivisionDailyReport } from '@/secondary/administrative-division-daily-report/RestAdministrativeDivisionDailyReport';

const defaultRestAdministrativeDivisionDailyReport: RestAdministrativeDivisionDailyReport = {
  fecha: '2020-06-16',
  indiceClasesPresenciales: 0.47,
  indiceAsistenciaDocentes: 0.88,
  indiceInasistenciaAlumnos: 0.23,
  indiceInasistenciaAlumnas: 0.23,
};

export const restAdministrativeDivisionDailyReport = (
  override: Partial<RestAdministrativeDivisionDailyReport> = {}
): RestAdministrativeDivisionDailyReport => ({
  ...defaultRestAdministrativeDivisionDailyReport,
  ...override,
});
