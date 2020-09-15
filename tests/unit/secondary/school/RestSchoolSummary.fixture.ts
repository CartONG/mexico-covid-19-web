import { RestSchoolSummary } from '@/secondary/school/RestSchoolSummary';

const defaultRestSchoolSummary: RestSchoolSummary = {
  id: '03DDI0003E4',
  nombre: 'CENTRO DE ATENCIÓN INFANTIL 3 CARMEN VERDUGO PEDRIN',
  turno: '4',
  localidad: 'SAN JOSÉ DEL CABO',
  coordenadas: { latitud: '23.054972', longitud: '-109.696335' },
  indiceAsistenciaDocentes: 1,
  indiceAsistenciaAdmin: 1,
  indiceAsistenciaAlumnado: 0.62,
  indiceInasistenciaAlumnas: 0.24,
  indiceInasistenciaAlumnos: 0.14,
};

export const restSchoolSummary = (override: Partial<RestSchoolSummary> = {}) => ({
  ...defaultRestSchoolSummary,
  ...override,
});
