import { RestSchoolDailyReport } from '@/secondary/school-daily-report/RestSchoolDailyReport';

const defaultRestSchoolDailyReport: RestSchoolDailyReport = {
  fecha: '2020-06-16',
  indiceAsistenciaDocentes: 1,
  indiceInasistenciaAlumnos: 0,
  indiceInasistenciaAlumnas: 0,
};

export const restSchoolDailyReport = (override: Partial<RestSchoolDailyReport> = {}) => ({
  ...defaultRestSchoolDailyReport,
  ...override,
})
