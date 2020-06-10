import { StateSummary } from '@/domain/state/StateSummary';

export interface RestStateSummary {
  id: string;
  nombre: string;
  alumnosInasistencia: number;
  docentesInasistencia: number;
  adminInasistencia: number;
}

export const toStateSummary = (restStateSummary: RestStateSummary): StateSummary => ({
  id: restStateSummary.id,
  name: restStateSummary.nombre,
  studentAbsenceRate: restStateSummary.alumnosInasistencia,
  teacherAbsenceRate: restStateSummary.docentesInasistencia,
  adminAbsenceRate: restStateSummary.adminInasistencia,
});
