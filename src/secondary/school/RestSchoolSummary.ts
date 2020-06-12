import { SchoolSummary } from '@/domain/school/SchoolSummary';

export interface RestSchoolSummary {
  id: string;
  nombre: string;
  nivel: string;
  coordenadas: {
    latitud: string;
    longitud: string;
  };
}

export const toSchoolSummary = (restSchoolSummary: RestSchoolSummary): SchoolSummary => ({
  id: `${restSchoolSummary.id}${restSchoolSummary.nivel}`,
  name: restSchoolSummary.nombre,
  level: restSchoolSummary.nivel,
  coordinates: [parseFloat(restSchoolSummary.coordenadas.longitud), parseFloat(restSchoolSummary.coordenadas.latitud)],
});
