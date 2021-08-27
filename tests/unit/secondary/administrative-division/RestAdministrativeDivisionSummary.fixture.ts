import { RestAdministrativeDivisionSummary } from '@/secondary/administrative-division/RestAdministrativeDivisionSummary';

const defaultRestAdministrativeDivisionSummary: RestAdministrativeDivisionSummary = {
  id: '01',
  entidadId: '',
  nombre: 'AGUASCALIENTES',
  indiceAsistenciaAlumnado: 0.68,
  indiceAsistenciaDocentes: 0.95,
  indiceAsistenciaAdmin: 0.97,
};

export const restAdministrativeDivisionSummary = (override: Partial<RestAdministrativeDivisionSummary> = {}) => ({
  ...defaultRestAdministrativeDivisionSummary,
  ...override,
});
