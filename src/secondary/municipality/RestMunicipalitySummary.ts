import { MunicipalitySummary } from '@/domain/municipality/MunicipalitySummary';

export interface RestMunicipalitySummary {
  id: string;
  nombre: string;
  entidadId: string;
  alumnosInasistencia: number;
  docentesInasistencia: number;
  adminInasistencia: number;
}

export const toMunicipalitySummary = (restMunicipalitySummary: RestMunicipalitySummary): MunicipalitySummary => ({
  id: `${restMunicipalitySummary.entidadId}${restMunicipalitySummary.id}`,
  name: restMunicipalitySummary.nombre,
  stateId: restMunicipalitySummary.entidadId,
  studentAbsenceRate: restMunicipalitySummary.alumnosInasistencia,
  teacherAbsenceRate: restMunicipalitySummary.docentesInasistencia,
  adminAbsenceRate: restMunicipalitySummary.adminInasistencia,
});
