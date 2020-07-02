import { SchoolSummary } from '@/domain/school/SchoolSummary';

export interface RestSchoolSummary {
  id: string;
  nombre: string;
  nivel: string;
  localidad: string;
  alumnas: number;
  alumnos: number;
  docentes: number;
  admin: number;
  coordenadas: {
    latitud: string;
    longitud: string;
  };
}

export const toSchoolSummary = (restSchoolSummary: RestSchoolSummary): SchoolSummary => ({
  id: restSchoolSummary.id,
  name: restSchoolSummary.nombre,
  level: restSchoolSummary.nivel,
  locality: restSchoolSummary.localidad,
  maleStudentAttendance: restSchoolSummary.alumnos,
  femaleStudentAttendance: restSchoolSummary.alumnas,
  teacherAttendance: restSchoolSummary.docentes,
  adminAttendance: restSchoolSummary.admin,
  coordinates: [parseFloat(restSchoolSummary.coordenadas.longitud), parseFloat(restSchoolSummary.coordenadas.latitud)],
});
