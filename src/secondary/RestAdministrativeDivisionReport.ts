import { AdministrativeDivisionReport } from '@/domain/AdministrativeDivisionReport';

export interface RestAdministrativeDivisionReport {
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

export const toAdministrativeDivisionReport = (
  restAdministrativeDivisionReport: RestAdministrativeDivisionReport
): AdministrativeDivisionReport => ({
  totalSchools: restAdministrativeDivisionReport.totalEscuelas,
  schoolGivingClassesPercentages: restAdministrativeDivisionReport.hayClases,
  studentsFirstGrade: restAdministrativeDivisionReport.alum1ro,
  studentsSecondGrade: restAdministrativeDivisionReport.alum2do,
  studentsThirdGrade: restAdministrativeDivisionReport.alum3ro,
  studentsFourthGrade: restAdministrativeDivisionReport.alum4to,
  studentsFifthGrade: restAdministrativeDivisionReport.alum5to,
  studentsSixthGrade: restAdministrativeDivisionReport.alum6to,
  teachersFirstGrade: restAdministrativeDivisionReport.docente1ro,
  teachersSecondGrade: restAdministrativeDivisionReport.docente2do,
  teachersThirdGrade: restAdministrativeDivisionReport.docente3ro,
  teachersFourthGrade: restAdministrativeDivisionReport.docente4to,
  teachersFifthGrade: restAdministrativeDivisionReport.docente5to,
  teachersSixthGrade: restAdministrativeDivisionReport.docente6to,
  assistantsFirstGrade: restAdministrativeDivisionReport.gpos1ro,
  assistantsSecondGrade: restAdministrativeDivisionReport.gpos2do,
  assistantsThirdGrade: restAdministrativeDivisionReport.gpos3ro,
  assistantsFourthGrade: restAdministrativeDivisionReport.gpos4to,
  assistantsFifthGrade: restAdministrativeDivisionReport.gpos5to,
  assistantsSixthGrade: restAdministrativeDivisionReport.gpos6to,
  absentStudentsFirstGrade: restAdministrativeDivisionReport.inaalum1ro,
  absentStudentsSecondGrade: restAdministrativeDivisionReport.inaalum2do,
  absentStudentsThirdGrade: restAdministrativeDivisionReport.inaalum3ro,
  absentStudentsFourthGrade: restAdministrativeDivisionReport.inaalum4to,
  absentStudentsFifthGrade: restAdministrativeDivisionReport.inaalum5to,
  absentStudentsSixthGrade: restAdministrativeDivisionReport.inaalum6to,
  absentTeachersFirstGrade: restAdministrativeDivisionReport.inadocente1ro,
  absentTeachersSecondGrade: restAdministrativeDivisionReport.inadocente2do,
  absentTeachersThirdGrade: restAdministrativeDivisionReport.inadocente3ro,
  absentTeachersFourthGrade: restAdministrativeDivisionReport.inadocente4to,
  absentTeachersFifthGrade: restAdministrativeDivisionReport.inadocente5to,
  absentTeachersSixthGrade: restAdministrativeDivisionReport.inadocente6to,
  directors: restAdministrativeDivisionReport.director,
  subDirector: restAdministrativeDivisionReport.subdirector,
  technicalPedagogicalAdvisers: restAdministrativeDivisionReport.atps,
  physicalEducationTeachers: restAdministrativeDivisionReport.educfis,
  administrativeStaff: restAdministrativeDivisionReport.admin,
  quartermasterStaff: restAdministrativeDivisionReport.intenden,
  others: restAdministrativeDivisionReport.otros,
  absentDirectors: restAdministrativeDivisionReport.inadirector,
  absentSubDirector: restAdministrativeDivisionReport.inasubdirector,
  absentTechnicalPedagogicalAdvisers: restAdministrativeDivisionReport.inaatps,
  absentPhysicalEducationTeachers: restAdministrativeDivisionReport.inaeducfis,
  absentAdministrativeStaff: restAdministrativeDivisionReport.inaadmin,
  absentQuartermasterStaff: restAdministrativeDivisionReport.inaintenden,
  absentOthers: restAdministrativeDivisionReport.inaotros,
  studentAbsenceMainReasonPercentages: restAdministrativeDivisionReport.causaInaAlum,
  schoolWaterSupplyPercentages: restAdministrativeDivisionReport.tipoAbasAgua,
  schoolWaterServiceContinuityPercentages: restAdministrativeDivisionReport.contServAgua,
  schoolWithWaterForHandWashingPercentages: restAdministrativeDivisionReport.aguaLavamanos,
  schoolSinkSufficiencyPercentages: restAdministrativeDivisionReport.lavamanos,
  schoolSoapSufficiencyPercentages: restAdministrativeDivisionReport.jabon,
  schoolTowelSufficiencyPercentages: restAdministrativeDivisionReport.toallas,
  schoolSanitizerSufficiencyPercentages: restAdministrativeDivisionReport.sanitizante,
  schoolBinSufficiencyPercentages: restAdministrativeDivisionReport.botesBasura,
  schoolWithSepticSystemPercentages: restAdministrativeDivisionReport.tipoDrenaje,
  schoolWithAbilityToReorganizeSpacePercentages: restAdministrativeDivisionReport.espacios,
});
