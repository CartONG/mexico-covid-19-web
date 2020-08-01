import { AdministrativeDivision } from '@/domain/administrative-division/AdministrativeDivision';
import { AdministrativeDivisionTypes } from '@/domain/administrative-division/AdministrativeDivisionTypes';

export interface RestAdministrativeDivision {
  id: string;
  nombre: string;
  entidadid: string;
  sostenimiento: { privado: number; publico: number };
  indiceAsistenciaAlumnado: number;
  indiceAsistenciaDocentes: number;
  indiceAsistenciaAdmin: number;
  sumaEscuelas: number;
  sumaAlumnado: number;
  sumaAlumnas: number;
  sumaAlumnos: number;
  hayClases: { [key: string]: number };
  sumaDocentes: number;
  sumaGrupos: number;
  sumaDirector: number;
  sumaSubdirector: number;
  sumaAtps: number;
  sumaEducfis: number;
  sumaAdmin: number;
  sumaIntenden: number;
  sumaOtros: number;
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
  comite: { [key: string]: number };
  alterna_asis: { [key: string]: number };
  sumaInaAlumnas: number;
  sumaInaAlumnos: number;
  causaInaAlum: { [key: string]: number };
  sumaInaDocentes: number;
  causaInaDocente: { [key: string]: number };
  sumaInaAdministrativos: number;
  causaInaAdmin: { [key: string]: number };
}

export const toAdministrativeDivision = (
  restAdministrativeDivision: RestAdministrativeDivision,
  type: AdministrativeDivisionTypes
): AdministrativeDivision => ({
  id: `${restAdministrativeDivision.entidadid || ''}${restAdministrativeDivision.id}`,
  name: restAdministrativeDivision.nombre,
  type: type,
  stateId: restAdministrativeDivision.entidadid || '',
  support: {
    private: restAdministrativeDivision.sostenimiento.privado,
    public: restAdministrativeDivision.sostenimiento.publico,
  },
  studentAttendance: restAdministrativeDivision.indiceAsistenciaAlumnado,
  teacherAttendance: restAdministrativeDivision.indiceAsistenciaDocentes,
  adminAttendance: restAdministrativeDivision.indiceAsistenciaAdmin,
  schools: restAdministrativeDivision.sumaEscuelas,
  students: restAdministrativeDivision.sumaAlumnado,
  femaleStudents: restAdministrativeDivision.sumaAlumnas,
  maleStudents: restAdministrativeDivision.sumaAlumnos,
  teachers: restAdministrativeDivision.sumaDocentes,
  assistants: restAdministrativeDivision.sumaGrupos,
  directors: restAdministrativeDivision.sumaDirector,
  subDirectors: restAdministrativeDivision.sumaSubdirector,
  technicalPedagogicalAdvisers: restAdministrativeDivision.sumaAtps,
  physicalEducationTeachers: restAdministrativeDivision.sumaEducfis,
  admins: restAdministrativeDivision.sumaAdmin,
  quartermasters: restAdministrativeDivision.sumaIntenden,
  others: restAdministrativeDivision.sumaOtros,
  schoolGivingClasses: restAdministrativeDivision.hayClases,
  schoolWaterSupply: restAdministrativeDivision.tipoAbasAgua,
  schoolWaterServiceContinuity: restAdministrativeDivision.contServAgua,
  schoolWithWaterForHandWashing: restAdministrativeDivision.aguaLavamanos,
  schoolSinkSufficiency: restAdministrativeDivision.lavamanos,
  schoolSoapSufficiency: restAdministrativeDivision.jabon,
  schoolTowelSufficiency: restAdministrativeDivision.toallas,
  schoolSanitizerSufficiency: restAdministrativeDivision.sanitizante,
  schoolBinSufficiency: restAdministrativeDivision.botesBasura,
  schoolWithSepticSystem: restAdministrativeDivision.tipoDrenaje,
  schoolWithAbilityToReorganizeSpace: restAdministrativeDivision.espacios,
  hygieneCommittee: restAdministrativeDivision.comite,
  alternatesAttendance: restAdministrativeDivision.alterna_asis,
  absentFemaleStudents: restAdministrativeDivision.sumaInaAlumnas,
  absentMaleStudents: restAdministrativeDivision.sumaInaAlumnos,
  studentAbsenceMainReasons: restAdministrativeDivision.causaInaAlum || {},
  absentTeachers: restAdministrativeDivision.sumaInaDocentes,
  teacherAbsenceMainReasons: restAdministrativeDivision.causaInaDocente || {},
  absentAdmins: restAdministrativeDivision.sumaInaAdministrativos,
  adminAbsenceMainReasons: restAdministrativeDivision.causaInaAdmin || {},
});
