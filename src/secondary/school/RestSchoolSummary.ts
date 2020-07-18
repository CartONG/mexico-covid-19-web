import { SchoolSummary } from '@/domain/school/SchoolSummary';

export interface RestSchoolSummary {
  id: string;
  nombre: string;
  nivel: string;
  localidad: string;
  indiceAsistenciaAlumnado: number;
  indiceAsistenciaDocentes: number;
  indiceAsistenciaAdmin: number;
  indiceAlumnasSobreInasistencias: number;
  indiceAlumnosSobreInasistencias: number;
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
  studentAttendance: restSchoolSummary.indiceAsistenciaAlumnado,
  teacherAttendance: restSchoolSummary.indiceAsistenciaDocentes,
  adminAttendance: restSchoolSummary.indiceAsistenciaAdmin,
  maleStudentAbsenceProportion: restSchoolSummary.indiceAlumnosSobreInasistencias,
  femaleStudentAbsenceProportion: restSchoolSummary.indiceAlumnasSobreInasistencias,
  coordinates: [parseFloat(restSchoolSummary.coordenadas.longitud), parseFloat(restSchoolSummary.coordenadas.latitud)],
});
