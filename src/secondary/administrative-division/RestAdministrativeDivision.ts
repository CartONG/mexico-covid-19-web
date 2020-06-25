import { AdministrativeDivision } from '@/domain/administrative-division/AdministrativeDivision';
import { AdministrativeDivisionTypes } from '@/domain/administrative-division/AdministrativeDivisionTypes';

export interface RestAdministrativeDivision {
  id: string;
  nombre: string;
  entidadid?: string;
  totalEscuelas: number;
  totalAlum: number;
  alumnosInasistencia: number;
  docentesInasistencia: number;
  adminInasistencia: number;
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

export const toAdministrativeDivision = (
  restAdministrativeDivision: RestAdministrativeDivision,
  type: AdministrativeDivisionTypes
): AdministrativeDivision => ({
  id: `${restAdministrativeDivision.entidadid || ''}${restAdministrativeDivision.id}`,
  name: restAdministrativeDivision.nombre,
  type: type,
  stateId: restAdministrativeDivision.entidadid || '',
  totalSchools: restAdministrativeDivision.totalEscuelas,
  totalStudent: restAdministrativeDivision.totalAlum,
  totalTeachers:
    restAdministrativeDivision.docente1ro +
    restAdministrativeDivision.docente2do +
    restAdministrativeDivision.docente3ro +
    restAdministrativeDivision.docente4to +
    restAdministrativeDivision.docente5to +
    restAdministrativeDivision.docente6to,
  studentAbsenceRate: restAdministrativeDivision.alumnosInasistencia,
  teacherAbsenceRate: restAdministrativeDivision.docentesInasistencia,
  adminAbsenceRate: restAdministrativeDivision.adminInasistencia,
  schoolGivingClassesPercentages: restAdministrativeDivision.hayClases,
  studentsFirstGrade: restAdministrativeDivision.alum1ro,
  studentsSecondGrade: restAdministrativeDivision.alum2do,
  studentsThirdGrade: restAdministrativeDivision.alum3ro,
  studentsFourthGrade: restAdministrativeDivision.alum4to,
  studentsFifthGrade: restAdministrativeDivision.alum5to,
  studentsSixthGrade: restAdministrativeDivision.alum6to,
  teachersFirstGrade: restAdministrativeDivision.docente1ro,
  teachersSecondGrade: restAdministrativeDivision.docente2do,
  teachersThirdGrade: restAdministrativeDivision.docente3ro,
  teachersFourthGrade: restAdministrativeDivision.docente4to,
  teachersFifthGrade: restAdministrativeDivision.docente5to,
  teachersSixthGrade: restAdministrativeDivision.docente6to,
  assistantsFirstGrade: restAdministrativeDivision.gpos1ro,
  assistantsSecondGrade: restAdministrativeDivision.gpos2do,
  assistantsThirdGrade: restAdministrativeDivision.gpos3ro,
  assistantsFourthGrade: restAdministrativeDivision.gpos4to,
  assistantsFifthGrade: restAdministrativeDivision.gpos5to,
  assistantsSixthGrade: restAdministrativeDivision.gpos6to,
  absentStudentsFirstGrade: restAdministrativeDivision.inaalum1ro,
  absentStudentsSecondGrade: restAdministrativeDivision.inaalum2do,
  absentStudentsThirdGrade: restAdministrativeDivision.inaalum3ro,
  absentStudentsFourthGrade: restAdministrativeDivision.inaalum4to,
  absentStudentsFifthGrade: restAdministrativeDivision.inaalum5to,
  absentStudentsSixthGrade: restAdministrativeDivision.inaalum6to,
  absentTeachersFirstGrade: restAdministrativeDivision.inadocente1ro,
  absentTeachersSecondGrade: restAdministrativeDivision.inadocente2do,
  absentTeachersThirdGrade: restAdministrativeDivision.inadocente3ro,
  absentTeachersFourthGrade: restAdministrativeDivision.inadocente4to,
  absentTeachersFifthGrade: restAdministrativeDivision.inadocente5to,
  absentTeachersSixthGrade: restAdministrativeDivision.inadocente6to,
  directors: restAdministrativeDivision.director,
  subDirector: restAdministrativeDivision.subdirector,
  technicalPedagogicalAdvisers: restAdministrativeDivision.atps,
  physicalEducationTeachers: restAdministrativeDivision.educfis,
  administrativeStaff: restAdministrativeDivision.admin,
  quartermasterStaff: restAdministrativeDivision.intenden,
  others: restAdministrativeDivision.otros,
  absentDirectors: restAdministrativeDivision.inadirector,
  absentSubDirector: restAdministrativeDivision.inasubdirector,
  absentTechnicalPedagogicalAdvisers: restAdministrativeDivision.inaatps,
  absentPhysicalEducationTeachers: restAdministrativeDivision.inaeducfis,
  absentAdministrativeStaff: restAdministrativeDivision.inaadmin,
  absentQuartermasterStaff: restAdministrativeDivision.inaintenden,
  absentOthers: restAdministrativeDivision.inaotros,
  studentAbsenceMainReasonPercentages: restAdministrativeDivision.causaInaAlum,
  schoolWaterSupplyPercentages: restAdministrativeDivision.tipoAbasAgua,
  schoolWaterServiceContinuityPercentages: restAdministrativeDivision.contServAgua,
  schoolWithWaterForHandWashingPercentages: restAdministrativeDivision.aguaLavamanos,
  schoolSinkSufficiencyPercentages: restAdministrativeDivision.lavamanos,
  schoolSoapSufficiencyPercentages: restAdministrativeDivision.jabon,
  schoolTowelSufficiencyPercentages: restAdministrativeDivision.toallas,
  schoolSanitizerSufficiencyPercentages: restAdministrativeDivision.sanitizante,
  schoolBinSufficiencyPercentages: restAdministrativeDivision.botesBasura,
  schoolWithSepticSystemPercentages: restAdministrativeDivision.tipoDrenaje,
  schoolWithAbilityToReorganizeSpacePercentages: restAdministrativeDivision.espacios,
});
