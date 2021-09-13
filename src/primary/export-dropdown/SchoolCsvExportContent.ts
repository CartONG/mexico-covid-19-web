import { School } from '@/domain/school/School';
import { toNumericDataSet } from '@/primary/common/NumericDataSet';
import { toPercentageDataSet } from '@/primary/common/PercentageDataSet';

export interface SchoolCsvExportContent {
  ID: string;
  Nombre: string;
  'ID Localidad': string;
  Localidad: string;
  'ID Municipio': string;
  Municipio: string;
  'ID Entidad Federativa': string;
  'Fecha ultimo reporte': string;
  Nivel: string;
  'Clave del Centro de Trabajo': string;
  'Clave del turno': string;
  'Modalidad de atención': string;
  'Domicilio de la escuela': string;
  'Clave del inmueble': string;
  'Tipo de Sostenimiento': string;
  'Asistencia del alumnado': string;
  'Inasistencias de niñas': string;
  'Inasistencias de niños': string;
  'Asistencia de docentes': string;
  'Asistencia del personal': string;
  'En la escuela se reiniciaron las clases presenciales': string;
  'Total del alumnado': string;
  'Total del alumnas': string;
  'Total del alumnos': string;
  'Alumnas (% del alumnado)': string;
  'Alumnos (% del alumnado)': string;
  'Total de Docentes frente a grupo': string;
  'Total de grupos': string;
  'Total de directores': string;
  'Total de Subdirectores': string;
  'Total de maestros de Segunda lengua': string;
  'Total de docentes de Educación Física': string;
  'Total de personal Administrativo': string;
  'Total de personal de intendencia': string;
  'Total de otro tipo de personal': string;
  'Tipo de abastecimiento de agua': string;
  'Continuidad del servicio de agua': string;
  'Agua para el lavado de manos': string;
  'Número de lavamanos funcionales': string;
  'Existencia de Jabón para lavado de manos': string;
  'Existencia de toallas de papel en la escuela, tela u otro material  para el lavado de manos': string;
  'Sanitizante de alcohol': string;
  'Botes de basura para el manejo de residuos': string;
  'Red de drenaje, fosa séptica para desalojo de aguas': string;
  'La escuela puede reorganizar los espacios educativos': string;
  'Se tiene instalado el comité participativo de salud escolar': string;
  'Total de inasistencias de alumnos porque: Los padres de familia no enviaron a sus hijos a la escuela': string;
  'Total de inasistencias de alumnos porque: Casos de contagio (COVID 19) confirmados': string;
  'Total de inasistencias de alumnos porque: Se desconocen las causas': string;
  'Total de inasistencias de alumnos por otras causas': string;
  'Porcentaje de inasistencias de alumnos porque: Los padres de familia no enviaron a sus hijos a la escuela': string;
  'Porcentaje de inasistencias de alumnos porque: Casos de contagio (COVID 19) confirmados': string;
  'Porcentaje de inasistencias de alumnos porque: Se desconocen las causas': string;
  'Porcentaje de inasistencias de alumnos por otras causas': string;
  'Total de inasistencias de docentes porque: Casos de contagio (COVID 19) confirmados': string;
  'Total de inasistencias de docentes porque: Se reportaron enfermos (NO COVID 19)': string;
  'Total de inasistencias de docentes porque: Se desconocen las causas': string;
  'Total de inasistencias de docentes por otras causas': string;
  'Porcentaje de inasistencias de docentes porque: Casos de contagio (COVID 19) confirmados': string;
  'Porcentaje de inasistencias de docentes porque: Se reportaron enfermos (NO COVID 19)': string;
  'Porcentaje de inasistencias de docentes porque: Se desconocen las causas': string;
  'Porcentaje de inasistencias de docentes por otras causas': string;
  'Total de inasistencias de personal administrativo porque: Casos de contagio (COVID 19) confirmados': string;
  'Total de inasistencias de personal administrativo porque: Se reportaron enfermos (NO COVID 19)': string;
  'Total de inasistencias de personal administrativo porque: Se desconocen las causas': string;
  'Total de inasistencias de personal administrativo por otras causas de inasistencia': string;
  'Porcentaje de inasistencias de personal administrativo porque: Casos de contagio (COVID 19) confirmados': string;
  'Porcentaje de inasistencias de personal administrativo porque: Se reportaron enfermos (NO COVID 19)': string;
  'Porcentaje de inasistencias de personal administrativo porque: Se desconocen las causas': string;
  'Porcentaje de inasistencias de personal administrativo por otras causas de inasistencia': string;
  Comentarios: string;
  'Acciones para reincorporar a los alumnos con inasistencias': string;
  'Número de bebederos funcionales': string;
  'Número de baños funcionales para alumnas': string;
  'Número de baños funcionales para alumnos': string;
  'Reciben el apoyo de alimentación en la escuela': string;
  'Quienes proporcionan los alimentos': string;
  'Sí otros quién da el apoyo de alimentación': string;
  'La escuela pertenece al programa La Escuela es nuestra': string;
  'Fuente principal de energía eléctrica': string;
  'Acceso a internet': string;
}

const turnTexts: { [key: string]: string } = {
  '1': 'matutino',
  '2': 'vespertino',
  '3': 'nocturno',
  '4': 'discontinuo',
  '5': 'continuo (tiempo completo)',
  '6': 'complementario',
  '7': 'continuo (jornada ampliada)',
};

const waterSupplyTexts: string[] = [
  '-',
  'Red municipal de agua potable',
  'Abastecimiento a través de pipas',
  'Otra fuente (pozo, río, lago, etc.)',
  'No cuenta con ningún tipo de abastecimiento',
];

const waterServiceContinuityTexts: string[] = [
  '-',
  'Todos los días',
  'De 2 a 4 días a la semana',
  'Una sola vez por semana',
  'No cuenta con servicio de agua',
];

const waterForHandWashingTexts: { shortText: string; longText: string }[] = [
  { shortText: '-', longText: '-' },
  { shortText: 'Si', longText: 'Cuenta con agua para el lavado de manos' },
  { shortText: 'No', longText: 'No cuenta con agua para lavado de manos' },
];

const soapSufficiencyTexts: { shortText: string; longText: string }[] = [
  { shortText: '-', longText: '-' },
  { shortText: 'Suficiente', longText: 'Cuenta con suficiente jabón' },
  { shortText: 'Insuficiente', longText: 'No cuenta con suficiente jabón' },
  { shortText: 'No', longText: 'No cuenta' },
];

const towelSufficiencyTexts: string[] = ['-', 'Cuenta con suficientes toallas', 'No cuenta con suficientes toallas', 'No cuenta'];

const sanitizerSufficiencyTexts: string[] = [
  '-',
  'Cuenta con suficiente alcohol en gel',
  'No cuenta con suficiente alcohol en gel',
  'No cuenta',
];

const binSufficiencyTexts: string[] = [
  '-',
  'Cuenta con botes de basura para el manejo de los residuos',
  'No cuenta con botes de basura para el manejo de los residuos',
];

const hasSepticSystemTexts: string[] = [
  '-',
  'Cuenta con Red de drenaje, fosa séptica para desalojo de aguas',
  'No cuenta con Red de drenaje, fosa séptica para desalojo de aguas',
];

const hasAbilityToReorganizeSpaceTexts: string[] = ['-', 'Si', 'No'];
const hasHygieneCommitteeTexts: string[] = ['-', 'Si', 'No'];

const givesClassesText: { shortText: string; longText: string }[] = [
  { shortText: '-', longText: '-' },
  { shortText: 'Si', longText: 'Si, Personal y Alumnos realizan sus actividades en la escuela' },
  { shortText: 'No', longText: 'No, Se está realizando la limpieza de espacios para poder iniciar con las clases' },
  { shortText: 'No', longText: 'No, Existe la confirmación de al menos un caso de COVID-19 en la escuela' },
  { shortText: 'No', longText: 'No, La Autoridad Educativa Local determinó continuar con la suspensión de clases' },
  { shortText: 'No', longText: 'No, La comunidad escolar determinó continuar con la suspensión de clases' },
  { shortText: 'No', longText: 'No, El personal de la escuela decidió continuar con la suspensión de clases' },
  { shortText: 'No', longText: 'No, Todos las madres y los padres de familia determinarón no enviar a sus hijos a la escuela' },
  { shortText: 'No', longText: 'No, Otras razones' },
];

const electricitySourceTexts: string[] = [
  '-',
  'Conexión al servicio público',
  'Paneles o celdas solares',
  'Planta de luz propria',
  'Otra',
  'No tiene',
];

const internetAccessTexts: string[] = [
  '-',
  'La escuela cuenta con accesso a internet para uso de de alumnos, docentes y directivos',
  'La escuela no cuenta con accesso a internet para uso de de alumnos, docentes y directivos',
];

const toTakenActions = (takenActions: { [key: string]: boolean }): string => {
  const actions = [];

  if (takenActions.visits) {
    actions.push('Visita domiciliaria');
  }

  if (takenActions.calls) {
    actions.push('Llamada telefónica');
  }

  if (takenActions.scholarship) {
    actions.push('Gestión de becas');
  }

  if (takenActions.none) {
    actions.push('Ninguna');
  }

  return actions.join(', ');
};

const toFoodSupportTypes = (foodSupportType: { [key: string]: boolean }): string => {
  const types = [];

  if (foodSupportType.dif) {
    types.push('Reciben alimentos por parte del DIF');
  }

  if (foodSupportType.fullTimeProgram) {
    types.push('Reciben alimentos  por parte del Programa de Tiempo Completo');
  }

  if (foodSupportType.state) {
    types.push('Reciben alimentos por parte del Estado');
  }

  if (foodSupportType.others) {
    types.push('Quienes proporcionan los alimentos. Otros');
  }

  return types.join(' - ');
};

export const toSchoolCsvExportContent = (school: School): SchoolCsvExportContent => ({
  ID: school.id,
  Nombre: school.name,
  'ID Localidad': school.localityId,
  Localidad: school.locality,
  'ID Municipio': school.municipalityId,
  Municipio: school.municipality,
  'ID Entidad Federativa': school.stateId,
  'Fecha ultimo reporte': school.lastUpdateDate.toHuman(),
  Nivel: school.level,
  'Clave del Centro de Trabajo': school.workCenterKey,
  'Clave del turno': turnTexts[school.turn],
  'Modalidad de atención': school.modality,
  'Domicilio de la escuela': school.address,
  'Clave del inmueble': school.buildingId,
  'Tipo de Sostenimiento': school.support,
  'En la escuela se reiniciaron las clases presenciales': givesClassesText[school.givesClasses].longText,
  Comentarios: school.comments,
  'Asistencia del alumnado': toPercentageDataSet(school.studentAttendance).text,
  'Inasistencias de niñas': toPercentageDataSet(school.femaleStudentAbsencePercentageOverStudentAbsence).text,
  'Inasistencias de niños': toPercentageDataSet(school.maleStudentAbsencePercentageOverStudentAbsence).text,
  'Asistencia de docentes': toPercentageDataSet(school.teacherAttendance).text,
  'Asistencia del personal': toPercentageDataSet(school.adminAttendance).text,
  'Total de inasistencias de alumnos porque: Los padres de familia no enviaron a sus hijos a la escuela': toNumericDataSet(
    school.studentAbsenceMainReasons['1']
  ).rawText,
  'Total de inasistencias de alumnos porque: Casos de contagio (COVID 19) confirmados': toNumericDataSet(
    school.studentAbsenceMainReasons['3']
  ).rawText,
  'Total de inasistencias de alumnos porque: Se desconocen las causas': toNumericDataSet(school.studentAbsenceMainReasons['4']).rawText,
  'Total de inasistencias de alumnos por otras causas': toNumericDataSet(school.studentAbsenceMainReasons['5']).rawText,
  'Porcentaje de inasistencias de alumnos porque: Los padres de familia no enviaron a sus hijos a la escuela': toPercentageDataSet(
    school.studentAbsenceMainReasonsPercentages['1']
  ).text,
  'Porcentaje de inasistencias de alumnos porque: Casos de contagio (COVID 19) confirmados': toPercentageDataSet(
    school.studentAbsenceMainReasonsPercentages['3']
  ).text,
  'Porcentaje de inasistencias de alumnos porque: Se desconocen las causas': toPercentageDataSet(
    school.studentAbsenceMainReasonsPercentages['4']
  ).text,
  'Porcentaje de inasistencias de alumnos por otras causas': toPercentageDataSet(school.studentAbsenceMainReasonsPercentages['5']).text,
  'Total de inasistencias de docentes porque: Casos de contagio (COVID 19) confirmados': toNumericDataSet(
    school.teacherAbsenceMainReasons['1']
  ).rawText,
  'Total de inasistencias de docentes porque: Se reportaron enfermos (NO COVID 19)': toNumericDataSet(school.teacherAbsenceMainReasons['2'])
    .rawText,
  'Total de inasistencias de docentes porque: Se desconocen las causas': toNumericDataSet(school.teacherAbsenceMainReasons['3']).rawText,
  'Total de inasistencias de docentes por otras causas': toNumericDataSet(school.teacherAbsenceMainReasons['4']).rawText,
  'Porcentaje de inasistencias de docentes porque: Casos de contagio (COVID 19) confirmados': toPercentageDataSet(
    school.teacherAbsenceMainReasonsPercentages['1']
  ).text,
  'Porcentaje de inasistencias de docentes porque: Se reportaron enfermos (NO COVID 19)': toPercentageDataSet(
    school.teacherAbsenceMainReasonsPercentages['2']
  ).text,
  'Porcentaje de inasistencias de docentes porque: Se desconocen las causas': toPercentageDataSet(
    school.teacherAbsenceMainReasonsPercentages['3']
  ).text,
  'Porcentaje de inasistencias de docentes por otras causas': toPercentageDataSet(school.teacherAbsenceMainReasonsPercentages['4']).text,
  'Total de inasistencias de personal administrativo porque: Casos de contagio (COVID 19) confirmados': toNumericDataSet(
    school.adminAbsenceMainReasons['1']
  ).rawText,
  'Total de inasistencias de personal administrativo porque: Se reportaron enfermos (NO COVID 19)': toNumericDataSet(
    school.adminAbsenceMainReasons['2']
  ).rawText,
  'Total de inasistencias de personal administrativo porque: Se desconocen las causas': toNumericDataSet(
    school.adminAbsenceMainReasons['3']
  ).rawText,
  'Total de inasistencias de personal administrativo por otras causas de inasistencia': toNumericDataSet(
    school.adminAbsenceMainReasons['4']
  ).rawText,
  'Porcentaje de inasistencias de personal administrativo porque: Casos de contagio (COVID 19) confirmados': toPercentageDataSet(
    school.adminAbsenceMainReasonsPercentages['1']
  ).text,
  'Porcentaje de inasistencias de personal administrativo porque: Se reportaron enfermos (NO COVID 19)': toPercentageDataSet(
    school.adminAbsenceMainReasonsPercentages['2']
  ).text,
  'Porcentaje de inasistencias de personal administrativo porque: Se desconocen las causas': toPercentageDataSet(
    school.adminAbsenceMainReasonsPercentages['3']
  ).text,
  'Porcentaje de inasistencias de personal administrativo por otras causas de inasistencia': toPercentageDataSet(
    school.adminAbsenceMainReasonsPercentages['4']
  ).text,
  'Se tiene instalado el comité participativo de salud escolar': hasHygieneCommitteeTexts[school.hasHygieneCommittee],
  'La escuela puede reorganizar los espacios educativos': hasAbilityToReorganizeSpaceTexts[school.hasAbilityToReorganizeSpace],
  'Acciones para reincorporar a los alumnos con inasistencias': toTakenActions(school.takenActions),
  'Tipo de abastecimiento de agua': waterSupplyTexts[school.waterSupply],
  'Continuidad del servicio de agua': waterServiceContinuityTexts[school.waterServiceContinuity],
  'Agua para el lavado de manos': waterForHandWashingTexts[school.waterForHandWashing].longText,
  'Número de lavamanos funcionales': toNumericDataSet(school.functionalSinkCount).rawText,
  'Existencia de Jabón para lavado de manos': soapSufficiencyTexts[school.soapSufficiency].longText,
  'Existencia de toallas de papel en la escuela, tela u otro material  para el lavado de manos':
    towelSufficiencyTexts[school.towelSufficiency],
  'Sanitizante de alcohol': sanitizerSufficiencyTexts[school.sanitizerSufficiency],
  'Botes de basura para el manejo de residuos': binSufficiencyTexts[school.binSufficiency],
  'Red de drenaje, fosa séptica para desalojo de aguas': hasSepticSystemTexts[school.hasSepticSystem],
  'Número de bebederos funcionales': toNumericDataSet(school.drinkers).rawText,
  'Número de baños funcionales para alumnas': toNumericDataSet(school.femaleStudentToilets).rawText,
  'Número de baños funcionales para alumnos': toNumericDataSet(school.maleStudentToilets).rawText,
  'Reciben el apoyo de alimentación en la escuela': school.foodSupport
    ? 'Sí, reciben algún apoyo de alimentación'
    : 'No, recibe apoyo de alimentación',
  'Quienes proporcionan los alimentos': toFoodSupportTypes(school.foodSupportType),
  'Sí otros quién da el apoyo de alimentación': school.foodSupportComment,
  'La escuela pertenece al programa La Escuela es nuestra':
    school.theSchoolIsOurs === 1 ? 'Si pertenece' : school.theSchoolIsOurs === 2 ? 'No pertenece' : '-',
  'Total del alumnado': toNumericDataSet(school.students).rawText,
  'Total del alumnas': toNumericDataSet(school.femaleStudent).rawText,
  'Total del alumnos': toNumericDataSet(school.maleStudent).rawText,
  'Total de grupos': toNumericDataSet(school.assistants).rawText,
  'Alumnas (% del alumnado)': toPercentageDataSet(school.femaleStudentPercentage).text,
  'Alumnos (% del alumnado)': toPercentageDataSet(school.maleStudentPercentage).text,
  'Total de Docentes frente a grupo': toNumericDataSet(school.teachers).rawText,
  'Total de directores': toNumericDataSet(school.directors).rawText,
  'Total de Subdirectores': toNumericDataSet(school.subDirectors).rawText,
  'Total de maestros de Segunda lengua': toNumericDataSet(school.technicalPedagogicalAdvisers).rawText,
  'Total de docentes de Educación Física': toNumericDataSet(school.physicalEducationTeachers).rawText,
  'Total de personal Administrativo': toNumericDataSet(school.admins).rawText,
  'Total de personal de intendencia': toNumericDataSet(school.quartermasters).rawText,
  'Total de otro tipo de personal': toNumericDataSet(school.others).rawText,
  'Fuente principal de energía eléctrica': electricitySourceTexts[school.electricitySource],
  'Acceso a internet': internetAccessTexts[school.internetAccess],
});
