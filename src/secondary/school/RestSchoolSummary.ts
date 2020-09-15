import { SchoolSummary } from '@/domain/school/SchoolSummary';

export interface RestSchoolSummary {
  id: string;
  nombre: string;
  turno: string;
  localidad: string;
  indiceAsistenciaAlumnado: number;
  indiceAsistenciaDocentes: number;
  indiceAsistenciaAdmin: number;
  indiceInasistenciaAlumnos: number;
  indiceInasistenciaAlumnas: number;
  coordenadas: {
    latitud: string;
    longitud: string;
  };
}

const toTurn = (restTurn: string) => {
  switch (restTurn) {
    case '1':
      return 'Matutino';
    case '2':
      return 'Vespertino';
    case '3':
      return 'Nocturno';
    case '4':
      return 'Discontinuo';
    case '5':
      return 'Continuo (tiempo completo)';
    case '6':
      return 'Complementario';
    case '7':
      return 'Continuo (jornada ampliada)';
  }
  return '';
};

export const toSchoolSummary = (restSchoolSummary: RestSchoolSummary): SchoolSummary => ({
  id: restSchoolSummary.id,
  name: restSchoolSummary.nombre,
  turn: toTurn(restSchoolSummary.turno),
  locality: restSchoolSummary.localidad,
  studentAttendance: restSchoolSummary.indiceAsistenciaAlumnado,
  teacherAttendance: restSchoolSummary.indiceAsistenciaDocentes,
  adminAttendance: restSchoolSummary.indiceAsistenciaAdmin,
  maleStudentAbsence: restSchoolSummary.indiceInasistenciaAlumnos,
  femaleStudentAbsence: restSchoolSummary.indiceInasistenciaAlumnas,
  coordinates: [parseFloat(restSchoolSummary.coordenadas.longitud), parseFloat(restSchoolSummary.coordenadas.latitud)],
});
