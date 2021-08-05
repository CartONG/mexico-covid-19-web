import { AdministrativeDivision } from '@/domain/administrative-division/AdministrativeDivision';
import { AdministrativeDivisionTypes } from '@/domain/administrative-division/AdministrativeDivisionTypes';
import { toNumericDataSet } from '@/primary/common/NumericDataSet';
import { toPercentageDataSet } from '@/primary/common/PercentageDataSet';

export interface AdministrativeDivisionCsvExportContent {
  ID?: string;
  'Fecha ultimo reporte': string;
  Nombre: string;
  'Total de escuelas': string;
  'ID Entidad Federativa'?: string;
  'Sostenimiento privado (% de escuelas)': string;
  'Sostenimiento publico (% de escuelas)': string;
  'Asistencia del alumnado': string;
  'Inasistencias de niñas sobre el alumnado esperado': string;
  'Inasistencias de niños sobre el alumnado esperado': string;
  'Asistencia de docentes': string;
  'Asistencia del personal': string;
  'Total de inasistencias de alumnos porque: La escuela no cuenta con instalaciones para el lavado de manos con agua y jabón': string;
  'Total de inasistencias de alumnos porque: Los padres de familia no enviaron a sus hijos a la escuela': string;
  'Total de inasistencias de alumnos porque: Reportaron enfermos a los alumnos que no asistieron': string;
  'Total de inasistencias de alumnos porque: Se desconocen las causas': string;
  'Total de inasistencias de alumnos por otras causas': string;
  'Porcentaje de inasistencias de alumnos porque: La escuela no cuenta con instalaciones para el lavado de manos con agua y jabón': string;
  'Porcentaje de inasistencias de alumnos porque: Los padres de familia no enviaron a sus hijos a la escuela': string;
  'Porcentaje de inasistencias de alumnos porque: Reportaron enfermos a los alumnos que no asistieron': string;
  'Porcentaje de inasistencias de alumnos porque: Se desconocen las causas': string;
  'Porcentaje de inasistencias de alumnos por otras causas': string;
  'Total de inasistencias de docentes porque: La escuela no cuenta con instalaciones para el lavado de manos con agua y jabón': string;
  'Total de inasistencias de docentes porque: Se reportaron como inasistencia por enfermedad': string;
  'Total de inasistencias de docentes porque: Se desconocen las causas': string;
  'Total de inasistencias de docentes por tras causas': string;
  'Porcentaje de inasistencias de docentes porque: La escuela no cuenta con instalaciones para el lavado de manos con agua y jabón': string;
  'Porcentaje de inasistencias de docentes porque: Se reportaron como inasistencia por enfermedad': string;
  'Porcentaje de inasistencias de docentes porque: Se desconocen las causas': string;
  'Porcentaje de inasistencias de docentes por tras causas': string;
  'Total de inasistencias de personal administrativo porque: La escuela no cuenta con instalaciones para el lavado de manos con agua y jabón': string;
  'Total de inasistencias de personal administrativo porque: Se reportaron como inasistencia por enfermedad': string;
  'Total de inasistencias de personal administrativo porque: Se desconocen las causas': string;
  'Total de inasistencias de personal administrativo por otras causas de inasistencia': string;
  'Porcentaje de inasistencias de personal administrativo porque: La escuela no cuenta con instalaciones para el lavado de manos con agua y jabón': string;
  'Porcentaje de inasistencias de personal administrativo porque: Se reportaron como inasistencia por enfermedad': string;
  'Porcentaje de inasistencias de personal administrativo porque: Se desconocen las causas': string;
  'Porcentaje de inasistencias de personal administrativo por otras causas de inasistencia': string;
  'Total del alumnado': string;
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
  'Personal y Alumnos realizan sus actividades en la escuela': string;
  'Se está realizando la limpieza de espacios y mobiliario para poder iniciar con las clases': string;
  'Existe la confirmación de al menos un caso de COVID-19 en la escuela': string;
  'La Autoridad Educativa Local determinó continuar con la suspensión de clases': string;
  'La comunidad escolar determinó continuar con la suspensión de clases': string;
  'El personal de la escuela decidió continuar con la suspensión de clases': string;
  'Los padres de familia informaron que no enviarán a sus hijos a la escuela': string;
  'Otras razones': string;
  'Personal y Alumnos realizan sus actividades en la escuela (% de escuelas)': string;
  'Se está realizando la limpieza de espacios y mobiliario para poder iniciar con las clases (% de escuelas)': string;
  'Existe la confirmación de al menos un caso de COVID-19 en la escuela (% de escuelas)': string;
  'La Autoridad Educativa Local determinó continuar con la suspensión de clases (% de escuelas)': string;
  'La comunidad escolar determinó continuar con la suspensión de clases (% de escuelas)': string;
  'El personal de la escuela decidió continuar con la suspensión de clases (% de escuelas)': string;
  'Los padres de familia informaron que no enviarán a sus hijos a la escuela (% de escuelas)': string;
  'Otras razones (% de escuelas)': string;
  'Tipo de abastecimiento de agua : Red municipal de agua potable': string;
  'Tipo de abastecimiento de agua : Abastecimiento a través de pipas': string;
  'Tipo de abastecimiento de agua : Otra fuente (pozo, río, lago, etc.)': string;
  'Tipo de abastecimiento de agua : No cuenta con ningún tipo de abastecimiento': string;
  'Tipo de abastecimiento de agua : Red municipal de agua potable (% de escuelas)': string;
  'Tipo de abastecimiento de agua : Abastecimiento a través de pipas (% de escuelas)': string;
  'Tipo de abastecimiento de agua : Otra fuente (pozo, río, lago, etc.) (% de escuelas)': string;
  'Tipo de abastecimiento de agua : No cuenta con ningún tipo de abastecimiento (% de escuelas)': string;
  'Continuidad del servicio de agua : Todos los días': string;
  'Continuidad del servicio de agua :  De 2 a 4 días a la semana': string;
  'Continuidad del servicio de agua :  Una sola vez por semana': string;
  'Continuidad del servicio de agua :  No cuenta con servicio de agua': string;
  'Continuidad del servicio de agua : Todos los días  (% de escuelas)': string;
  'Continuidad del servicio de agua :  De 2 a 4 días a la semana  (% de escuelas)': string;
  'Continuidad del servicio de agua :  Una sola vez por semana  (% de escuelas)': string;
  'Continuidad del servicio de agua :  No cuenta con servicio de agua  (% de escuelas)': string;
  'Agua para el lavado de manos : Si': string;
  'Agua para el lavado de manos : No': string;
  'Agua para el lavado de manos : Si (% de escuelas)': string;
  'Agua para el lavado de manos : No (% de escuelas)': string;
  'Número de lavamanos funcionales': string;
  'Existencia de Jabón para lavado de manos : Suficiente': string;
  'Existencia de Jabón para lavado de manos : Insuficiente': string;
  'Existencia de Jabón para lavado de manos : No cuenta': string;
  'Existencia de Jabón para lavado de manos : Suficiente (% de escuelas)': string;
  'Existencia de Jabón para lavado de manos : Insuficiente (% de escuelas)': string;
  'Existencia de Jabón para lavado de manos : No cuenta (% de escuelas)': string;
  'Existencia de toallas de papel en la escuela, tela u otro material  para el lavado de manos : Suficiente': string;
  'Existencia de toallas de papel en la escuela, tela u otro material  para el lavado de manos : Insuficiente': string;
  'Existencia de toallas de papel en la escuela, tela u otro material  para el lavado de manos : No cuenta': string;
  'Existencia de toallas de papel en la escuela, tela u otro material  para el lavado de manos : Suficiente (% de escuelas)': string;
  'Existencia de toallas de papel en la escuela, tela u otro material  para el lavado de manos : Insuficiente (% de escuelas)': string;
  'Existencia de toallas de papel en la escuela, tela u otro material  para el lavado de manos : No cuenta (% de escuelas)': string;
  'Sanitizante de alcohol : Suficiente': string;
  'Sanitizante de alcohol : Insuficiente': string;
  'Sanitizante de alcohol : No cuenta': string;
  'Sanitizante de alcohol : Suficiente (% de escuelas)': string;
  'Sanitizante de alcohol : Insuficiente (% de escuelas)': string;
  'Sanitizante de alcohol : No cuenta (% de escuelas)': string;
  'Botes de basura para el manejo de residuos : Sí': string;
  'Botes de basura para el manejo de residuos : No': string;
  'Botes de basura para el manejo de residuos : Sí (% de escuelas)': string;
  'Botes de basura para el manejo de residuos : No (% de escuelas)': string;
  'Red de drenaje, fosa séptica para desalojo de aguas : Si': string;
  'Red de drenaje, fosa séptica para desalojo de aguas : No': string;
  'Red de drenaje, fosa séptica para desalojo de aguas : Si (% de escuelas)': string;
  'Red de drenaje, fosa séptica para desalojo de aguas : No (% de escuelas)': string;
  'La escuela puede reorganizar los espacios educativos : Si': string;
  'La escuela puede reorganizar los espacios educativos : No': string;
  'La escuela puede reorganizar los espacios educativos : Si (% de escuelas)': string;
  'La escuela puede reorganizar los espacios educativos : No (% de escuelas)': string;
  'Se tiene instalado el comité de higiene : Si': string;
  'Se tiene instalado el comité de higiene : No': string;
  'Se tiene instalado el comité de higiene : Si (% de escuelas)': string;
  'Se tiene instalado el comité de higiene : No (% de escuelas)': string;
  'La escuela alterna la asistencia de los alumnos : Si': string;
  'La escuela alterna la asistencia de los alumnos : No': string;
  'La escuela alterna la asistencia de los alumnos : Si (% de escuelas)': string;
  'La escuela alterna la asistencia de los alumnos : No (% de escuelas)': string;
  'Acciones para reincorporar a los alumnos con inasistencias : Visita domiciliaria': string;
  'Acciones para reincorporar a los alumnos con inasistencias : Llamada telefónica': string;
  'Acciones para reincorporar a los alumnos con inasistencias : Gestión de becas': string;
  'Acciones para reincorporar a los alumnos con inasistencias : Ninguna': string;
  'Acciones para reincorporar a los alumnos con inasistencias : Visita domiciliaria (% de escuelas)': string;
  'Acciones para reincorporar a los alumnos con inasistencias : Llamada telefónica (% de escuelas)': string;
  'Acciones para reincorporar a los alumnos con inasistencias : Gestión de becas (% de escuelas)': string;
  'Acciones para reincorporar a los alumnos con inasistencias : Ninguna (% de escuelas)': string;
  'Bebederos funcionales': string;
  'Baños funcionales, Alumnas': string;
  'Baños funcionales, Alumnos': string;
  'Reciben algún apoyo de alimentación': string;
  'No recibe apoyo de alimentación': string;
  'Reciben algún apoyo de alimentación (% de escuelas)': string;
  'No recibe apoyo de alimentación (% de escuelas)': string;
  'Reciben alimentos por parte del DIF': string;
  'Reciben alimentos por parte del Programa de Tiempo Completo': string;
  'Reciben alimentos por parte del Estado': string;
  'Quienes proporcionan los alimentos. Otros': string;
  'Reciben alimentos por parte del DIF (% de escuelas)': string;
  'Reciben alimentos por parte del Programa de Tiempo Completo (% de escuelas)': string;
  'Reciben alimentos por parte del Estado (% de escuelas)': string;
  'Quienes proporcionan los alimentos. Otros (% de escuelas)': string;
  'La escuela pertenece al programa La Escuela es nuestra': string;
  'La escuela no pertenece al programa La Escuela es nuestra': string;
  'La escuela pertenece al programa La Escuela es nuestra (% de escuelas)': string;
  'La escuela no pertenece al programa La Escuela es nuestra (% de escuelas)': string;
}

export const toAdministrativeDivisionCsvExportContent = (
  administrativeDivision: AdministrativeDivision
): AdministrativeDivisionCsvExportContent => ({
  ID: administrativeDivision.type === AdministrativeDivisionTypes.COUNTRY ? 'N/A' : administrativeDivision.id,
  Nombre: administrativeDivision.type === AdministrativeDivisionTypes.COUNTRY ? 'México' : administrativeDivision.name,
  'Fecha ultimo reporte': administrativeDivision.lastUpdateDate.toHuman(),
  'ID Entidad Federativa':
    administrativeDivision.type === AdministrativeDivisionTypes.MUNICIPALITY ? administrativeDivision.stateId : 'N/A',
  'Total de escuelas': toNumericDataSet(administrativeDivision.schools).rawText,
  'Sostenimiento privado (% de escuelas)': toPercentageDataSet(administrativeDivision.support.private).text,
  'Sostenimiento publico (% de escuelas)': toPercentageDataSet(administrativeDivision.support.public).text,
  'Asistencia del alumnado': toPercentageDataSet(administrativeDivision.studentAttendance).text,
  'Inasistencias de niñas sobre el alumnado esperado': toPercentageDataSet(
    administrativeDivision.femaleStudentAbsencePercentageOverStudentAbsence
  ).text,
  'Inasistencias de niños sobre el alumnado esperado': toPercentageDataSet(
    administrativeDivision.maleStudentAbsencePercentageOverStudentAbsence
  ).text,
  'Asistencia de docentes': toPercentageDataSet(administrativeDivision.teacherAttendance).text,
  'Asistencia del personal': toPercentageDataSet(administrativeDivision.adminAttendance).text,
  'Total de inasistencias de alumnos porque: La escuela no cuenta con instalaciones para el lavado de manos con agua y jabón': toNumericDataSet(
    administrativeDivision.studentAbsenceMainReasons['1']
  ).rawText,
  'Total de inasistencias de alumnos porque: Los padres de familia no enviaron a sus hijos a la escuela': toNumericDataSet(
    administrativeDivision.studentAbsenceMainReasons['2']
  ).rawText,
  'Total de inasistencias de alumnos porque: Reportaron enfermos a los alumnos que no asistieron': toNumericDataSet(
    administrativeDivision.studentAbsenceMainReasons['3']
  ).rawText,
  'Total de inasistencias de alumnos porque: Se desconocen las causas': toNumericDataSet(
    administrativeDivision.studentAbsenceMainReasons['4']
  ).rawText,
  'Total de inasistencias de alumnos por otras causas': toNumericDataSet(administrativeDivision.studentAbsenceMainReasons['5']).rawText,
  'Porcentaje de inasistencias de alumnos porque: La escuela no cuenta con instalaciones para el lavado de manos con agua y jabón': toPercentageDataSet(
    administrativeDivision.studentAbsenceMainReasonsPercentages['1']
  ).text,
  'Porcentaje de inasistencias de alumnos porque: Los padres de familia no enviaron a sus hijos a la escuela': toPercentageDataSet(
    administrativeDivision.studentAbsenceMainReasonsPercentages['2']
  ).text,
  'Porcentaje de inasistencias de alumnos porque: Reportaron enfermos a los alumnos que no asistieron': toPercentageDataSet(
    administrativeDivision.studentAbsenceMainReasonsPercentages['3']
  ).text,
  'Porcentaje de inasistencias de alumnos porque: Se desconocen las causas': toPercentageDataSet(
    administrativeDivision.studentAbsenceMainReasonsPercentages['4']
  ).text,
  'Porcentaje de inasistencias de alumnos por otras causas': toPercentageDataSet(
    administrativeDivision.studentAbsenceMainReasonsPercentages['5']
  ).text,
  'Total de inasistencias de docentes porque: La escuela no cuenta con instalaciones para el lavado de manos con agua y jabón': toNumericDataSet(
    administrativeDivision.teacherAbsenceMainReasons['1']
  ).rawText,
  'Total de inasistencias de docentes porque: Se reportaron como inasistencia por enfermedad': toNumericDataSet(
    administrativeDivision.teacherAbsenceMainReasons['2']
  ).rawText,
  'Total de inasistencias de docentes porque: Se desconocen las causas': toNumericDataSet(
    administrativeDivision.teacherAbsenceMainReasons['3']
  ).rawText,
  'Total de inasistencias de docentes por tras causas': toNumericDataSet(administrativeDivision.teacherAbsenceMainReasons['4']).rawText,
  'Porcentaje de inasistencias de docentes porque: La escuela no cuenta con instalaciones para el lavado de manos con agua y jabón': toPercentageDataSet(
    administrativeDivision.teacherAbsenceMainReasonsPercentages['1']
  ).text,
  'Porcentaje de inasistencias de docentes porque: Se reportaron como inasistencia por enfermedad': toPercentageDataSet(
    administrativeDivision.teacherAbsenceMainReasonsPercentages['2']
  ).text,
  'Porcentaje de inasistencias de docentes porque: Se desconocen las causas': toPercentageDataSet(
    administrativeDivision.teacherAbsenceMainReasonsPercentages['3']
  ).text,
  'Porcentaje de inasistencias de docentes por tras causas': toPercentageDataSet(
    administrativeDivision.teacherAbsenceMainReasonsPercentages['4']
  ).text,
  'Total de inasistencias de personal administrativo porque: La escuela no cuenta con instalaciones para el lavado de manos con agua y jabón': toNumericDataSet(
    administrativeDivision.adminAbsenceMainReasons['1']
  ).rawText,
  'Total de inasistencias de personal administrativo porque: Se reportaron como inasistencia por enfermedad': toNumericDataSet(
    administrativeDivision.adminAbsenceMainReasons['2']
  ).rawText,
  'Total de inasistencias de personal administrativo porque: Se desconocen las causas': toNumericDataSet(
    administrativeDivision.adminAbsenceMainReasons['3']
  ).rawText,
  'Total de inasistencias de personal administrativo por otras causas de inasistencia': toNumericDataSet(
    administrativeDivision.adminAbsenceMainReasons['4']
  ).rawText,
  'Porcentaje de inasistencias de personal administrativo porque: La escuela no cuenta con instalaciones para el lavado de manos con agua y jabón': toPercentageDataSet(
    administrativeDivision.adminAbsenceMainReasonsPercentages['1']
  ).text,
  'Porcentaje de inasistencias de personal administrativo porque: Se reportaron como inasistencia por enfermedad': toPercentageDataSet(
    administrativeDivision.adminAbsenceMainReasonsPercentages['2']
  ).text,
  'Porcentaje de inasistencias de personal administrativo porque: Se desconocen las causas': toPercentageDataSet(
    administrativeDivision.adminAbsenceMainReasonsPercentages['3']
  ).text,
  'Porcentaje de inasistencias de personal administrativo por otras causas de inasistencia': toPercentageDataSet(
    administrativeDivision.adminAbsenceMainReasonsPercentages['4']
  ).text,
  'Se tiene instalado el comité de higiene : Si': toNumericDataSet(administrativeDivision.hygieneCommittee['1']).rawText,
  'Se tiene instalado el comité de higiene : No': toNumericDataSet(administrativeDivision.hygieneCommittee['2']).rawText,
  'Se tiene instalado el comité de higiene : Si (% de escuelas)': toPercentageDataSet(
    administrativeDivision.hygieneCommitteePercentages['1']
  ).text,
  'Se tiene instalado el comité de higiene : No (% de escuelas)': toPercentageDataSet(
    administrativeDivision.hygieneCommitteePercentages['2']
  ).text,
  'La escuela alterna la asistencia de los alumnos : Si': toNumericDataSet(administrativeDivision.alternatesAttendance['1']).rawText,
  'La escuela alterna la asistencia de los alumnos : No': toNumericDataSet(administrativeDivision.alternatesAttendance['2']).rawText,
  'La escuela alterna la asistencia de los alumnos : Si (% de escuelas)': toPercentageDataSet(
    administrativeDivision.alternatesAttendancePercentages['1']
  ).text,
  'La escuela alterna la asistencia de los alumnos : No (% de escuelas)': toPercentageDataSet(
    administrativeDivision.alternatesAttendancePercentages['2']
  ).text,
  'La escuela puede reorganizar los espacios educativos : Si': toNumericDataSet(
    administrativeDivision.schoolWithAbilityToReorganizeSpace['1']
  ).rawText,
  'La escuela puede reorganizar los espacios educativos : No': toNumericDataSet(
    administrativeDivision.schoolWithAbilityToReorganizeSpace['2']
  ).rawText,
  'La escuela puede reorganizar los espacios educativos : Si (% de escuelas)': toPercentageDataSet(
    administrativeDivision.schoolWithAbilityToReorganizeSpacePercentages['1']
  ).text,
  'La escuela puede reorganizar los espacios educativos : No (% de escuelas)': toPercentageDataSet(
    administrativeDivision.schoolWithAbilityToReorganizeSpacePercentages['1']
  ).text,
  'Acciones para reincorporar a los alumnos con inasistencias : Visita domiciliaria': toNumericDataSet(
    administrativeDivision.takenActions.visits
  ).text,
  'Acciones para reincorporar a los alumnos con inasistencias : Llamada telefónica': toNumericDataSet(
    administrativeDivision.takenActions.calls
  ).text,
  'Acciones para reincorporar a los alumnos con inasistencias : Gestión de becas': toNumericDataSet(
    administrativeDivision.takenActions.scholarship
  ).text,
  'Acciones para reincorporar a los alumnos con inasistencias : Ninguna': toNumericDataSet(administrativeDivision.takenActions.none).text,
  'Acciones para reincorporar a los alumnos con inasistencias : Visita domiciliaria (% de escuelas)': toPercentageDataSet(
    administrativeDivision.takenActionsPercentages.visits
  ).text,
  'Acciones para reincorporar a los alumnos con inasistencias : Llamada telefónica (% de escuelas)': toPercentageDataSet(
    administrativeDivision.takenActionsPercentages.calls
  ).text,
  'Acciones para reincorporar a los alumnos con inasistencias : Gestión de becas (% de escuelas)': toPercentageDataSet(
    administrativeDivision.takenActionsPercentages.scholarship
  ).text,
  'Acciones para reincorporar a los alumnos con inasistencias : Ninguna (% de escuelas)': toPercentageDataSet(
    administrativeDivision.takenActionsPercentages.none
  ).text,
  'Personal y Alumnos realizan sus actividades en la escuela': toNumericDataSet(administrativeDivision.schoolGivingClasses['1']).rawText,
  'Se está realizando la limpieza de espacios y mobiliario para poder iniciar con las clases': toNumericDataSet(
    administrativeDivision.schoolGivingClasses['2']
  ).rawText,
  'Existe la confirmación de al menos un caso de COVID-19 en la escuela': toNumericDataSet(administrativeDivision.schoolGivingClasses['3'])
    .rawText,
  'La Autoridad Educativa Local determinó continuar con la suspensión de clases': toNumericDataSet(
    administrativeDivision.schoolGivingClasses['4']
  ).rawText,
  'La comunidad escolar determinó continuar con la suspensión de clases': toNumericDataSet(administrativeDivision.schoolGivingClasses['5'])
    .rawText,
  'El personal de la escuela decidió continuar con la suspensión de clases': toNumericDataSet(
    administrativeDivision.schoolGivingClasses['6']
  ).rawText,
  'Los padres de familia informaron que no enviarán a sus hijos a la escuela': toNumericDataSet(
    administrativeDivision.schoolGivingClasses['7']
  ).rawText,
  'Otras razones': toNumericDataSet(administrativeDivision.schoolGivingClasses['8']).rawText,
  'Personal y Alumnos realizan sus actividades en la escuela (% de escuelas)': toPercentageDataSet(
    administrativeDivision.schoolGivingClassesPercentages['1']
  ).text,
  'Se está realizando la limpieza de espacios y mobiliario para poder iniciar con las clases (% de escuelas)': toPercentageDataSet(
    administrativeDivision.schoolGivingClassesPercentages['2']
  ).text,
  'Existe la confirmación de al menos un caso de COVID-19 en la escuela (% de escuelas)': toPercentageDataSet(
    administrativeDivision.schoolGivingClassesPercentages['3']
  ).text,
  'La Autoridad Educativa Local determinó continuar con la suspensión de clases (% de escuelas)': toPercentageDataSet(
    administrativeDivision.schoolGivingClassesPercentages['4']
  ).text,
  'La comunidad escolar determinó continuar con la suspensión de clases (% de escuelas)': toPercentageDataSet(
    administrativeDivision.schoolGivingClassesPercentages['5']
  ).text,
  'El personal de la escuela decidió continuar con la suspensión de clases (% de escuelas)': toPercentageDataSet(
    administrativeDivision.schoolGivingClassesPercentages['6']
  ).text,
  'Los padres de familia informaron que no enviarán a sus hijos a la escuela (% de escuelas)': toPercentageDataSet(
    administrativeDivision.schoolGivingClassesPercentages['7']
  ).text,
  'Otras razones (% de escuelas)': toPercentageDataSet(administrativeDivision.schoolGivingClassesPercentages['8']).text,
  'Tipo de abastecimiento de agua : Red municipal de agua potable': toNumericDataSet(administrativeDivision.schoolWaterSupply['1']).rawText,
  'Tipo de abastecimiento de agua : Abastecimiento a través de pipas': toNumericDataSet(administrativeDivision.schoolWaterSupply['2'])
    .rawText,
  'Tipo de abastecimiento de agua : Otra fuente (pozo, río, lago, etc.)': toNumericDataSet(administrativeDivision.schoolWaterSupply['3'])
    .rawText,
  'Tipo de abastecimiento de agua : No cuenta con ningún tipo de abastecimiento': toNumericDataSet(
    administrativeDivision.schoolWaterSupply['4']
  ).rawText,
  'Tipo de abastecimiento de agua : Red municipal de agua potable (% de escuelas)': toPercentageDataSet(
    administrativeDivision.schoolWaterSupplyPercentages['1']
  ).text,
  'Tipo de abastecimiento de agua : Abastecimiento a través de pipas (% de escuelas)': toPercentageDataSet(
    administrativeDivision.schoolWaterSupplyPercentages['2']
  ).text,
  'Tipo de abastecimiento de agua : Otra fuente (pozo, río, lago, etc.) (% de escuelas)': toPercentageDataSet(
    administrativeDivision.schoolWaterSupplyPercentages['3']
  ).text,
  'Tipo de abastecimiento de agua : No cuenta con ningún tipo de abastecimiento (% de escuelas)': toPercentageDataSet(
    administrativeDivision.schoolWaterSupplyPercentages['4']
  ).text,
  'Continuidad del servicio de agua : Todos los días': toNumericDataSet(administrativeDivision.schoolWaterServiceContinuity['1']).rawText,
  'Continuidad del servicio de agua :  De 2 a 4 días a la semana': toNumericDataSet(
    administrativeDivision.schoolWaterServiceContinuity['2']
  ).rawText,
  'Continuidad del servicio de agua :  Una sola vez por semana': toNumericDataSet(administrativeDivision.schoolWaterServiceContinuity['3'])
    .rawText,
  'Continuidad del servicio de agua :  No cuenta con servicio de agua': toNumericDataSet(
    administrativeDivision.schoolWaterServiceContinuity['4']
  ).rawText,
  'Continuidad del servicio de agua : Todos los días  (% de escuelas)': toPercentageDataSet(
    administrativeDivision.schoolWaterServiceContinuityPercentages['1']
  ).text,
  'Continuidad del servicio de agua :  De 2 a 4 días a la semana  (% de escuelas)': toPercentageDataSet(
    administrativeDivision.schoolWaterServiceContinuityPercentages['2']
  ).text,
  'Continuidad del servicio de agua :  Una sola vez por semana  (% de escuelas)': toPercentageDataSet(
    administrativeDivision.schoolWaterServiceContinuityPercentages['3']
  ).text,
  'Continuidad del servicio de agua :  No cuenta con servicio de agua  (% de escuelas)': toPercentageDataSet(
    administrativeDivision.schoolWaterServiceContinuityPercentages['4']
  ).text,
  'Agua para el lavado de manos : Si': toNumericDataSet(administrativeDivision.schoolWithWaterForHandWashing['1']).rawText,
  'Agua para el lavado de manos : No': toNumericDataSet(administrativeDivision.schoolWithWaterForHandWashing['2']).rawText,
  'Agua para el lavado de manos : Si (% de escuelas)': toPercentageDataSet(
    administrativeDivision.schoolWithWaterForHandWashingPercentages['1']
  ).text,
  'Agua para el lavado de manos : No (% de escuelas)': toPercentageDataSet(
    administrativeDivision.schoolWithWaterForHandWashingPercentages['2']
  ).text,
  'Número de lavamanos funcionales': toNumericDataSet(administrativeDivision.schoolFunctionalSinkCount).rawText,
  'Existencia de Jabón para lavado de manos : Suficiente': toNumericDataSet(administrativeDivision.schoolSoapSufficiency['1']).rawText,
  'Existencia de Jabón para lavado de manos : Insuficiente': toNumericDataSet(administrativeDivision.schoolSoapSufficiency['2']).rawText,
  'Existencia de Jabón para lavado de manos : No cuenta': toNumericDataSet(administrativeDivision.schoolSoapSufficiency['3']).rawText,
  'Existencia de Jabón para lavado de manos : Suficiente (% de escuelas)': toPercentageDataSet(
    administrativeDivision.schoolSoapSufficiencyPercentages['1']
  ).text,
  'Existencia de Jabón para lavado de manos : Insuficiente (% de escuelas)': toPercentageDataSet(
    administrativeDivision.schoolSoapSufficiencyPercentages['2']
  ).text,
  'Existencia de Jabón para lavado de manos : No cuenta (% de escuelas)': toPercentageDataSet(
    administrativeDivision.schoolSoapSufficiencyPercentages['3']
  ).text,
  'Existencia de toallas de papel en la escuela, tela u otro material  para el lavado de manos : Suficiente': toNumericDataSet(
    administrativeDivision.schoolTowelSufficiency['1']
  ).rawText,
  'Existencia de toallas de papel en la escuela, tela u otro material  para el lavado de manos : Insuficiente': toNumericDataSet(
    administrativeDivision.schoolTowelSufficiency['2']
  ).rawText,
  'Existencia de toallas de papel en la escuela, tela u otro material  para el lavado de manos : No cuenta': toNumericDataSet(
    administrativeDivision.schoolTowelSufficiency['3']
  ).rawText,
  'Existencia de toallas de papel en la escuela, tela u otro material  para el lavado de manos : Suficiente (% de escuelas)': toPercentageDataSet(
    administrativeDivision.schoolTowelSufficiencyPercentages['1']
  ).text,
  'Existencia de toallas de papel en la escuela, tela u otro material  para el lavado de manos : Insuficiente (% de escuelas)': toPercentageDataSet(
    administrativeDivision.schoolTowelSufficiencyPercentages['2']
  ).text,
  'Existencia de toallas de papel en la escuela, tela u otro material  para el lavado de manos : No cuenta (% de escuelas)': toPercentageDataSet(
    administrativeDivision.schoolTowelSufficiencyPercentages['3']
  ).text,
  'Sanitizante de alcohol : Suficiente': toNumericDataSet(administrativeDivision.schoolSanitizerSufficiency['1']).rawText,
  'Sanitizante de alcohol : Insuficiente': toNumericDataSet(administrativeDivision.schoolSanitizerSufficiency['2']).rawText,
  'Sanitizante de alcohol : No cuenta': toNumericDataSet(administrativeDivision.schoolSanitizerSufficiency['3']).rawText,
  'Sanitizante de alcohol : Suficiente (% de escuelas)': toPercentageDataSet(
    administrativeDivision.schoolSanitizerSufficiencyPercentages['1']
  ).text,
  'Sanitizante de alcohol : Insuficiente (% de escuelas)': toPercentageDataSet(
    administrativeDivision.schoolSanitizerSufficiencyPercentages['2']
  ).text,
  'Sanitizante de alcohol : No cuenta (% de escuelas)': toPercentageDataSet(
    administrativeDivision.schoolSanitizerSufficiencyPercentages['3']
  ).text,
  'Botes de basura para el manejo de residuos : Sí': toNumericDataSet(administrativeDivision.schoolBinSufficiency['1']).rawText,
  'Botes de basura para el manejo de residuos : No': toNumericDataSet(administrativeDivision.schoolBinSufficiency['2']).rawText,
  'Botes de basura para el manejo de residuos : Sí (% de escuelas)': toPercentageDataSet(
    administrativeDivision.schoolBinSufficiencyPercentages['1']
  ).text,
  'Botes de basura para el manejo de residuos : No (% de escuelas)': toPercentageDataSet(
    administrativeDivision.schoolBinSufficiencyPercentages['2']
  ).text,
  'Red de drenaje, fosa séptica para desalojo de aguas : Si': toNumericDataSet(administrativeDivision.schoolWithSepticSystem['1']).rawText,
  'Red de drenaje, fosa séptica para desalojo de aguas : No': toNumericDataSet(administrativeDivision.schoolWithSepticSystem['2']).rawText,
  'Red de drenaje, fosa séptica para desalojo de aguas : Si (% de escuelas)': toPercentageDataSet(
    administrativeDivision.schoolWithSepticSystemPercentages['1']
  ).text,
  'Red de drenaje, fosa séptica para desalojo de aguas : No (% de escuelas)': toPercentageDataSet(
    administrativeDivision.schoolWithSepticSystemPercentages['2']
  ).text,
  'Bebederos funcionales': toNumericDataSet(administrativeDivision.drinkers).rawText,
  'Baños funcionales, Alumnas': toNumericDataSet(administrativeDivision.femaleStudentToilets).rawText,
  'Baños funcionales, Alumnos': toNumericDataSet(administrativeDivision.maleStudentToilets).rawText,
  'Reciben algún apoyo de alimentación': toNumericDataSet(administrativeDivision.foodSupport[1]).rawText,
  'No recibe apoyo de alimentación': toNumericDataSet(administrativeDivision.foodSupport[2]).rawText,
  'Reciben algún apoyo de alimentación (% de escuelas)': toPercentageDataSet(administrativeDivision.foodSupportPercentages[1]).text,
  'No recibe apoyo de alimentación (% de escuelas)': toPercentageDataSet(administrativeDivision.foodSupportPercentages[2]).text,
  'Reciben alimentos por parte del DIF': toNumericDataSet(administrativeDivision.foodSupportType.dif).rawText,
  'Reciben alimentos por parte del Programa de Tiempo Completo': toNumericDataSet(administrativeDivision.foodSupportType.fullTimeProgram)
    .rawText,
  'Reciben alimentos por parte del Estado': toNumericDataSet(administrativeDivision.foodSupportType.state).rawText,
  'Quienes proporcionan los alimentos. Otros': toNumericDataSet(administrativeDivision.foodSupportType.others).rawText,
  'Reciben alimentos por parte del DIF (% de escuelas)': toPercentageDataSet(administrativeDivision.foodSupportTypePercentages.dif).text,
  'Reciben alimentos por parte del Programa de Tiempo Completo (% de escuelas)': toPercentageDataSet(
    administrativeDivision.foodSupportTypePercentages.fullTimeProgram
  ).text,
  'Reciben alimentos por parte del Estado (% de escuelas)': toPercentageDataSet(administrativeDivision.foodSupportTypePercentages.state)
    .text,
  'Quienes proporcionan los alimentos. Otros (% de escuelas)': toPercentageDataSet(administrativeDivision.foodSupportTypePercentages.others)
    .text,
  'La escuela pertenece al programa La Escuela es nuestra': toNumericDataSet(administrativeDivision.theSchoolIsOurs['1']).rawText,
  'La escuela no pertenece al programa La Escuela es nuestra': toNumericDataSet(administrativeDivision.theSchoolIsOurs['2']).rawText,
  'La escuela pertenece al programa La Escuela es nuestra (% de escuelas)': toPercentageDataSet(
    administrativeDivision.theSchoolIsOursPercentages['1']
  ).text,
  'La escuela no pertenece al programa La Escuela es nuestra (% de escuelas)': toPercentageDataSet(
    administrativeDivision.theSchoolIsOursPercentages['2']
  ).text,
  'Total del alumnado': toNumericDataSet(administrativeDivision.students).rawText,
  'Total del alumnas': toNumericDataSet(administrativeDivision.femaleStudents).rawText,
  'Total del alumnos': toNumericDataSet(administrativeDivision.maleStudents).rawText,
  'Alumnas (% del alumnado)': toPercentageDataSet(administrativeDivision.femaleStudentPercentage).text,
  'Alumnos (% del alumnado)': toPercentageDataSet(administrativeDivision.maleStudentPercentage).text,
  'Total de Docentes frente a grupo': toNumericDataSet(administrativeDivision.teachers).rawText,
  'Total de grupos': toNumericDataSet(administrativeDivision.assistants).rawText,
  'Total de directores': toNumericDataSet(administrativeDivision.directors).rawText,
  'Total de Subdirectores': toNumericDataSet(administrativeDivision.subDirectors).rawText,
  'Total de Asesores Técnicos Pedagógicos': toNumericDataSet(administrativeDivision.technicalPedagogicalAdvisers).rawText,
  'Total de docentes de Educación Física': toNumericDataSet(administrativeDivision.physicalEducationTeachers).rawText,
  'Total de personal Administrativo': toNumericDataSet(administrativeDivision.admins).rawText,
  'Total de personal de intendencia': toNumericDataSet(administrativeDivision.quartermasters).rawText,
  'Total de otro tipo de personal': toNumericDataSet(administrativeDivision.others).rawText,
});
