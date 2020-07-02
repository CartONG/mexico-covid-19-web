import { AdministrativeDivision } from '@/domain/administrative-division/AdministrativeDivision';
import { AdministrativeDivisionTypes } from '@/domain/administrative-division/AdministrativeDivisionTypes';

export interface RestAdministrativeDivision {
  id: string;
  nombre: string;
  entidadid: string;
  sostenimiento: { privado: number; publico: number };
  alumnasPorcentaje: number;
  alumnosPorcentaje: number;
  docentesPorcentaje: number;
  adminPorcentaje: number;
  totalEscuelas: number;
  totalAlum: number;
  totAlumnas: number;
  totAlumnos: number;
  hayClases: { [key: string]: number };
  docentes: number;
  grupos: number;
  director: number;
  subdirector: number;
  atps: number;
  educfis: number;
  admin: number;
  intenden: number;
  otros: number;
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
  asistencia50: { [key: string]: number };
  inaAlumnas: number;
  inaAlumnos: number;
  causaInaAlum: { [key: string]: number };
  inaDocentes: number;
  causaInaDocente: { [key: string]: number };
  inaAdministrativos: number;
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
  femaleStudentAttendance: restAdministrativeDivision.alumnasPorcentaje,
  maleStudentAttendance: restAdministrativeDivision.alumnosPorcentaje,
  teacherAttendance: restAdministrativeDivision.docentesPorcentaje,
  adminAttendance: restAdministrativeDivision.adminPorcentaje,
  schools: restAdministrativeDivision.totalEscuelas,
  students: restAdministrativeDivision.totalAlum,
  femaleStudents: restAdministrativeDivision.totAlumnas,
  maleStudents: restAdministrativeDivision.totAlumnos,
  teachers: restAdministrativeDivision.docentes,
  assistants: restAdministrativeDivision.grupos,
  directors: restAdministrativeDivision.director,
  subDirectors: restAdministrativeDivision.subdirector,
  technicalPedagogicalAdvisers: restAdministrativeDivision.atps,
  physicalEducationTeachers: restAdministrativeDivision.educfis,
  admins: restAdministrativeDivision.admin,
  quartermasters: restAdministrativeDivision.intenden,
  others: restAdministrativeDivision.otros,
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
  alternatesAttendance: restAdministrativeDivision.asistencia50,
  absentFemaleStudents: restAdministrativeDivision.inaAlumnas,
  absentMaleStudents: restAdministrativeDivision.inaAlumnos,
  studentAbsenceMainReasons: restAdministrativeDivision.causaInaAlum,
  absentTeachers: restAdministrativeDivision.inaDocentes,
  teacherAbsenceMainReasons: restAdministrativeDivision.causaInaDocente,
  absentAdmins: restAdministrativeDivision.inaAdministrativos,
  adminsAbsenceMainReasons: restAdministrativeDivision.causaInaAdmin,
});
