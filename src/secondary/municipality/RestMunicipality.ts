import { Municipality } from '@/domain/municipality/Municipality';
import { toAdministrativeDivisionReport } from '@/secondary/RestAdministrativeDivisionReport';

export interface RestMunicipality {
  id: string;
  nombre: string;
  entidadId: string;
  alumnosInasistencia: number;
  docentesInasistencia: number;
  adminInasistencia: number;
  totalEscuelas: number;
  totalAlum: number;
  hayClases: { [key: string]: number };
  alum1ro: number;
  alum2do: number;
  alum3ro: number;
  alum4to: number;
  alum5to: number;
  alum6to: number;
  docente1ro: number;
  docente2do: number;
  docente3ro: number;
  docente4to: number;
  docente5to: number;
  docente6to: number;
  gpos1ro: number;
  gpos2do: number;
  gpos3ro: number;
  gpos4to: number;
  gpos5to: number;
  gpos6to: number;
  inaalum1ro: number;
  inaalum2do: number;
  inaalum3ro: number;
  inaalum4to: number;
  inaalum5to: number;
  inaalum6to: number;
  inadocente1ro: number;
  inadocente2do: number;
  inadocente3ro: number;
  inadocente4to: number;
  inadocente5to: number;
  inadocente6to: number;
  director: number;
  subdirector: number;
  atps: number;
  educfis: number;
  admin: number;
  intenden: number;
  otros: number;
  inadirector: number;
  inasubdirector: number;
  inaatps: number;
  inaeducfis: number;
  inaadmin: number;
  inaintenden: number;
  inaotros: number;
  causaInaAlum: { [key: string]: number };
  tipoAbasAgua: { [key: string]: number };
  contServAgua: { [key: string]: number };
  aguaLavamanos: { [key: string]: number };
  lavamanos: { [key: string]: number };
  jabon: { [key: string]: number };
  toallas: { [key: string]: number };
  sanitizante: { [key: string]: number };
  botesBasura: { [key: string]: number };
  tipoDrenaje: { [key: string]: number };
  espacios: { [key: string]: number };
}

export const toMunicipality = (restMunicipality: RestMunicipality): Municipality => ({
  id: `${restMunicipality.entidadId}${restMunicipality.id}`,
  name: restMunicipality.nombre,
  stateId: restMunicipality.entidadId,
  studentAbsenceRate: restMunicipality.alumnosInasistencia,
  teacherAbsenceRate: restMunicipality.docentesInasistencia,
  adminAbsenceRate: restMunicipality.adminInasistencia,
  report: toAdministrativeDivisionReport(restMunicipality),
});
