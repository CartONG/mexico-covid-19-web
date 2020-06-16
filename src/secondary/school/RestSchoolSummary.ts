import { SchoolSummary } from '@/domain/school/SchoolSummary';

export interface RestSchoolSummary {
  id: string;
  nombre: string;
  nivel: string;
  alumnosInasistencia: number;
  docentesInasistencia: number;
  adminInasistencia: number;
  coordenadas: {
    latitud: string;
    longitud: string;
  };
}

export const toSchoolSummary = (restSchoolSummary: RestSchoolSummary): SchoolSummary => ({
  id: `${restSchoolSummary.id}__${restSchoolSummary.nivel}`,
  name: restSchoolSummary.nombre,
  level: restSchoolSummary.nivel,
  studentAbsenceRate: restSchoolSummary.alumnosInasistencia,
  teacherAbsenceRate: restSchoolSummary.docentesInasistencia,
  adminAbsenceRate: restSchoolSummary.adminInasistencia,
  coordinates: [parseFloat(restSchoolSummary.coordenadas.longitud), parseFloat(restSchoolSummary.coordenadas.latitud)],
});
