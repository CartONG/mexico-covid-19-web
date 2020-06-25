import { AdministrativeDivisionSummary } from '@/domain/administrative-division/AdministrativeDivisionSummary';

export interface RestAdministrativeDivisionSummary {
  id: string;
  nombre: string;
  entidadId?: string;
  alumnosInasistencia: number;
  docentesInasistencia: number;
  adminInasistencia: number;
}

export const toAdministrativeDivisionSummary = (
  restAdministrativeDivisionSummary: RestAdministrativeDivisionSummary
): AdministrativeDivisionSummary => ({
  id: `${restAdministrativeDivisionSummary.entidadId || ''}${restAdministrativeDivisionSummary.id}`,
  name: restAdministrativeDivisionSummary.nombre,
  stateId: restAdministrativeDivisionSummary.entidadId || '',
  studentAbsenceRate: restAdministrativeDivisionSummary.alumnosInasistencia,
  teacherAbsenceRate: restAdministrativeDivisionSummary.docentesInasistencia,
  adminAbsenceRate: restAdministrativeDivisionSummary.adminInasistencia,
});
