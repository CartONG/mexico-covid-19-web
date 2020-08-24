import { AdministrativeDivision } from '@/domain/administrative-division/AdministrativeDivision';
import { AdministrativeDivisionTypes } from '@/domain/administrative-division/AdministrativeDivisionTypes';
import { toNumericDataSet } from '@/primary/common/NumericDataSet';
import { toPercentageDataSet } from '@/primary/common/PercentageDataSet';

export interface AdministrativeDivisionCsvExport {
  ID?: string;
  Nombre?: string;
  'Fecha ultimo reporte': string;
  'ID Entidad'?: string;
  'Sostenimiento privado (% de escuelas)': string;
  'Sostenimiento publico (% de escuelas)': string;
  'Asistencia del alumnado': string;
  'Asistencia de docentes': string;
  'Asistencia del personal': string;
  'Inasistencias de niñas sobre el total de inasistencias': string;
  'Inasistencias de niños sobre el total de inasistencias': string;
  'Total de escuelas': string;
  'Total del alumnados': string;
  'Total del alumnas': string;
  'Total del alumnos': string;
  'Alumnas (% del alumnado)': string;
  'Alumnos (% del alumnado)': string;
  'Total de Docentes frente a grupo': string;
  'Total de grupos': string;
  'Total de directores': string;
  'Total de Subdirectores': string;
  'Total de Asesores Técnicos Pedagógicos': string;
  'Total de docentes de Educación Física': string;
  'Total de personal Administrativo': string;
  'Total de personal de intendencia': string;
  'Total de otro tipo de personal': string;
  /*
  schoolGivingClasses: { [key: string]: number };
  schoolGivingClassesPercentages: { [key: string]: number };
  schoolWaterSupply: { [key: string]: number };
  schoolWaterSupplyPercentages: { [key: string]: number };
  schoolWaterServiceContinuity: { [key: string]: number };
  schoolWaterServiceContinuityPercentages: { [key: string]: number };
  schoolWithWaterForHandWashing: { [key: string]: number };
  schoolWithWaterForHandWashingPercentages: { [key: string]: number };
  schoolSinkSufficiency: { [key: string]: number };
  schoolSinkSufficiencyPercentages: { [key: string]: number };
  schoolSoapSufficiency: { [key: string]: number };
  schoolSoapSufficiencyPercentages: { [key: string]: number };
  schoolTowelSufficiency: { [key: string]: number };
  schoolTowelSufficiencyPercentages: { [key: string]: number };
  schoolSanitizerSufficiency: { [key: string]: number };
  schoolSanitizerSufficiencyPercentages: { [key: string]: number };
  schoolBinSufficiency: { [key: string]: number };
  schoolBinSufficiencyPercentages: { [key: string]: number };
  schoolWithSepticSystem: { [key: string]: number };
  schoolWithSepticSystemPercentages: { [key: string]: number };
  schoolWithAbilityToReorganizeSpace: { [key: string]: number };
  schoolWithAbilityToReorganizeSpacePercentages: { [key: string]: number };
  hygieneCommittee: { [key: string]: number };
  hygieneCommitteePercentages: { [key: string]: number };
  alternatesAttendance: { [key: string]: number };
  alternatesAttendancePercentages: { [key: string]: number };
  absentFemaleStudents: number;
  absentMaleStudents: number;
  studentAbsenceMainReasons: { [key: string]: number };
  studentAbsenceMainReasonsPercentages: { [key: string]: number };
  absentTeachers: number;
  teacherAbsenceMainReasons: { [key: string]: number };
  teacherAbsenceMainReasonsPercentages: { [key: string]: number };
  absentAdmins: number;
  adminAbsenceMainReasons: { [key: string]: number };
  adminAbsenceMainReasonsPercentages: { [key: string]: number };
   */
}

export const toAdministrativeDivisionCsvExport = (administrativeDivision: AdministrativeDivision) => ({
  ID: administrativeDivision.type === AdministrativeDivisionTypes.COUNTRY ? 'N/A' : administrativeDivision.id,
  Nombre: administrativeDivision.type === AdministrativeDivisionTypes.COUNTRY ? 'N/A' : administrativeDivision.name,
  'Fecha ultimo reporte': administrativeDivision.lastUpdateDate.toHuman(),
  'ID Entidad': administrativeDivision.type === AdministrativeDivisionTypes.MUNICIPALITY ? administrativeDivision.stateId : 'N/A',
  'Sostenimiento privado (% de escuelas)': toPercentageDataSet(administrativeDivision.support.private).text,
  'Sostenimiento publico (% de escuelas)': toPercentageDataSet(administrativeDivision.support.public).text,
  'Asistencia del alumnado': toPercentageDataSet(administrativeDivision.studentAttendance).text,
  'Asistencia de docentes': toPercentageDataSet(administrativeDivision.teacherAttendance).text,
  'Asistencia del personal': toPercentageDataSet(administrativeDivision.teacherAttendance).text,
  'Inasistencias de niñas sobre el total de inasistencias': toPercentageDataSet(
    administrativeDivision.femaleStudentAbsencePercentageOverStudentAbsence
  ).text,
  'Inasistencias de niños sobre el total de inasistencias': toPercentageDataSet(
    administrativeDivision.maleStudentAbsencePercentageOverStudentAbsence
  ).text,
  'Total de escuelas': toNumericDataSet(administrativeDivision.schools).text,
  'Total del alumnados': toNumericDataSet(administrativeDivision.students).text,
  'Total del alumnas': toNumericDataSet(administrativeDivision.femaleStudents).text,
  'Total del alumnos': toNumericDataSet(administrativeDivision.maleStudents).text,
  'Alumnas (% del alumnado)': toPercentageDataSet(administrativeDivision.femaleStudentPercentage).text,
  'Alumnos (% del alumnado)': toPercentageDataSet(administrativeDivision.maleStudentPercentage).text,
  'Total de Docentes frente a grupo': toNumericDataSet(administrativeDivision.teachers).text,
  'Total de grupos': toNumericDataSet(administrativeDivision.assistants).text,
  'Total de directores': toNumericDataSet(administrativeDivision.directors).text,
  'Total de Subdirectores': toNumericDataSet(administrativeDivision.subDirectors).text,
  'Total de Asesores Técnicos Pedagógicos': toNumericDataSet(administrativeDivision.technicalPedagogicalAdvisers).text,
  'Total de docentes de Educación Física': toNumericDataSet(administrativeDivision.physicalEducationTeachers).text,
  'Total de personal Administrativo': toNumericDataSet(administrativeDivision.admins).text,
  'Total de personal de intendencia': toNumericDataSet(administrativeDivision.quartermasters).text,
  'Total de otro tipo de personal': toNumericDataSet(administrativeDivision.others).text,
});
