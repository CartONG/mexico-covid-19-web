import { SchoolSummary } from '@/domain/school/SchoolSummary';

export interface RestSchoolSummary {
  id: string;
  nombre: string;
  entidadId: string;
  municipioId: string;
  coordenadas: {
    latitud: number;
    longitud: number;
  };
}

export const toSchoolSummary = (restSchoolSummary: RestSchoolSummary): SchoolSummary => ({
  id: restSchoolSummary.id,
  name: restSchoolSummary.nombre,
  stateId: restSchoolSummary.entidadId,
  municipalityId: restSchoolSummary.municipioId,
  coordinates: [restSchoolSummary.coordenadas.longitud, restSchoolSummary.coordenadas.latitud],
});
