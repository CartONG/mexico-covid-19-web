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
  'Inasistencias de niñas': string;
  'Inasistencias de niños': string;
  'Asistencia de docentes': string;
  'Asistencia del personal': string;
  'Total de inasistencias de alumnos porque: Los padres de familia no enviaron a sus hijos a la escuela': string;
  'Total de inasistencias de alumnos porque: Reportados con síntomas de contagio': string;
  'Total de inasistencias de alumnos porque: Casos de contagio (COVID 19) confirmados': string;
  'Total de inasistencias de alumnos porque: Se desconocen las causas': string;
  'Total de inasistencias de alumnos por otras causas': string;
  'Porcentaje de inasistencias de alumnos porque: Los padres de familia no enviaron a sus hijos a la escuela': string;
  'Porcentaje de inasistencias de alumnos porque: Reportados con síntomas de contagio': string;
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
  'Principales motivos de escuelas sin clases presenciales en regiones con semáforo verde : Si, Personal y Alumnos realizan sus actividades en la escuela': string;
  'Principales motivos de escuelas sin clases presenciales en regiones con semáforo verde : No, se está realizando la limpieza de espacios para poder iniciar con las clases': string;
  'Principales motivos de escuelas sin clases presenciales en regiones con semáforo verde : No, todas las madres y los padres de familia determinarón no enviar a sus hijos a la escuela': string;
  'Principales motivos de escuelas sin clases presenciales en regiones con semáforo verde : No, otras razones': string;
  'Principales motivos de escuelas sin clases presenciales en regiones con semáforo verde : Si, Personal y Alumnos realizan sus actividades en la escuela (% de escuelas)': string;
  'Principales motivos de escuelas sin clases presenciales en regiones con semáforo verde : No, se está realizando la limpieza de espacios para poder iniciar con las clases (% de escuelas)': string;
  'Principales motivos de escuelas sin clases presenciales en regiones con semáforo verde : No, todos las madres y los padres de familia determinarón no enviar a sus hijos a la escuela (% de escuelas)': string;
  'Principales motivos de escuelas sin clases presenciales en regiones con semáforo verde : No, otras razones (% de escuelas)': string;
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
  'Botes de basura para el manejo de residuos : Cuenta con botes de basura para el manejo de los residuos': string;
  'Botes de basura para el manejo de residuos : No cuenta con botes de basura para el manejo de los residuos': string;
  'Botes de basura para el manejo de residuos : Cuenta con botes de basura para el manejo de los residuos (% de escuelas)': string;
  'Botes de basura para el manejo de residuos : No cuenta con botes de basura para el manejo de los residuos (% de escuelas)': string;
  'Red de drenaje, fosa séptica para desalojo de aguas : Si': string;
  'Red de drenaje, fosa séptica para desalojo de aguas : No': string;
  'Red de drenaje, fosa séptica para desalojo de aguas : Si (% de escuelas)': string;
  'Red de drenaje, fosa séptica para desalojo de aguas : No (% de escuelas)': string;
  'Escuelas que pueden reorganizar los espacios para facilitar la sana distancia : Si': string;
  'Escuelas que pueden reorganizar los espacios para facilitar la sana distancia : No': string;
  'Escuelas que pueden reorganizar los espacios para facilitar la sana distancia : Si (% de escuelas)': string;
  'Escuelas que pueden reorganizar los espacios para facilitar la sana distancia : No (% de escuelas)': string;
  'Escuelas que instalaron el comité participativo de salud escolar : Si': string;
  'Escuelas que instalaron el comité participativo de salud escolar : No': string;
  'Escuelas que instalaron el comité participativo de salud escolar : Si (% de escuelas)': string;
  'Escuelas que instalaron el comité participativo de salud escolar : No (% de escuelas)': string;
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
  'Fuente principal de energía eléctrica : Conexión al servicio público': string;
  'Fuente principal de energía eléctrica : Paneles o celdas solares': string;
  'Fuente principal de energía eléctrica : Planta de luz propria': string;
  'Fuente principal de energía eléctrica : Otra': string;
  'Fuente principal de energía eléctrica : No tiene': string;
  'Fuente principal de energía eléctrica : Conexión al servicio público (% de escuelas)': string;
  'Fuente principal de energía eléctrica : Paneles o celdas solares (% de escuelas)': string;
  'Fuente principal de energía eléctrica : Planta de luz propria (% de escuelas)': string;
  'Fuente principal de energía eléctrica : Otra (% de escuelas)': string;
  'Fuente principal de energía eléctrica : No tiene (% de escuelas)': string;
  'Acceso a internet : La escuela cuenta con accesso a internet para uso de de alumnos, docentes y directivos': string;
  'Acceso a internet : La escuela no cuenta con accesso a internet para uso de de alumnos, docentes y directivos': string;
  'Acceso a internet : La escuela cuenta con accesso a internet para uso de de alumnos, docentes y directivos (% de escuelas)': string;
  'Acceso a internet : La escuela no cuenta con accesso a internet para uso de de alumnos, docentes y directivos (% de escuelas)': string;
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
  'Inasistencias de niñas': toPercentageDataSet(administrativeDivision.femaleStudentAbsencePercentageOverStudentAbsence).text,
  'Inasistencias de niños': toPercentageDataSet(administrativeDivision.maleStudentAbsencePercentageOverStudentAbsence).text,
  'Asistencia de docentes': toPercentageDataSet(administrativeDivision.teacherAttendance).text,
  'Asistencia del personal': toPercentageDataSet(administrativeDivision.adminAttendance).text,
  'Total de inasistencias de alumnos porque: Los padres de familia no enviaron a sus hijos a la escuela': toNumericDataSet(
    administrativeDivision.studentAbsenceMainReasons['1']
  ).rawText,
  'Total de inasistencias de alumnos porque: Reportados con síntomas de contagio': toNumericDataSet(
    administrativeDivision.studentAbsenceMainReasons['2']
  ).rawText,
  'Total de inasistencias de alumnos porque: Casos de contagio (COVID 19) confirmados': toNumericDataSet(
    administrativeDivision.studentAbsenceMainReasons['3']
  ).rawText,
  'Total de inasistencias de alumnos porque: Se desconocen las causas': toNumericDataSet(
    administrativeDivision.studentAbsenceMainReasons['4']
  ).rawText,
  'Total de inasistencias de alumnos por otras causas': toNumericDataSet(administrativeDivision.studentAbsenceMainReasons['5']).rawText,
  'Porcentaje de inasistencias de alumnos porque: Los padres de familia no enviaron a sus hijos a la escuela': toPercentageDataSet(
    administrativeDivision.studentAbsenceMainReasonsPercentages['1']
  ).text,
  'Porcentaje de inasistencias de alumnos porque: Reportados con síntomas de contagio': toPercentageDataSet(
    administrativeDivision.studentAbsenceMainReasonsPercentages['2']
  ).text,
  'Porcentaje de inasistencias de alumnos porque: Casos de contagio (COVID 19) confirmados': toPercentageDataSet(
    administrativeDivision.studentAbsenceMainReasonsPercentages['3']
  ).text,
  'Porcentaje de inasistencias de alumnos porque: Se desconocen las causas': toPercentageDataSet(
    administrativeDivision.studentAbsenceMainReasonsPercentages['4']
  ).text,
  'Porcentaje de inasistencias de alumnos por otras causas': toPercentageDataSet(
    administrativeDivision.studentAbsenceMainReasonsPercentages['5']
  ).text,
  'Total de inasistencias de docentes porque: Casos de contagio (COVID 19) confirmados': toNumericDataSet(
    administrativeDivision.teacherAbsenceMainReasons['1']
  ).rawText,
  'Total de inasistencias de docentes porque: Se reportaron enfermos (NO COVID 19)': toNumericDataSet(
    administrativeDivision.teacherAbsenceMainReasons['2']
  ).rawText,
  'Total de inasistencias de docentes porque: Se desconocen las causas': toNumericDataSet(
    administrativeDivision.teacherAbsenceMainReasons['3']
  ).rawText,
  'Total de inasistencias de docentes por otras causas': toNumericDataSet(administrativeDivision.teacherAbsenceMainReasons['4']).rawText,
  'Porcentaje de inasistencias de docentes porque: Casos de contagio (COVID 19) confirmados': toPercentageDataSet(
    administrativeDivision.teacherAbsenceMainReasonsPercentages['1']
  ).text,
  'Porcentaje de inasistencias de docentes porque: Se reportaron enfermos (NO COVID 19)': toPercentageDataSet(
    administrativeDivision.teacherAbsenceMainReasonsPercentages['2']
  ).text,
  'Porcentaje de inasistencias de docentes porque: Se desconocen las causas': toPercentageDataSet(
    administrativeDivision.teacherAbsenceMainReasonsPercentages['3']
  ).text,
  'Porcentaje de inasistencias de docentes por otras causas': toPercentageDataSet(
    administrativeDivision.teacherAbsenceMainReasonsPercentages['4']
  ).text,
  'Total de inasistencias de personal administrativo porque: Casos de contagio (COVID 19) confirmados': toNumericDataSet(
    administrativeDivision.adminAbsenceMainReasons['1']
  ).rawText,
  'Total de inasistencias de personal administrativo porque: Se reportaron enfermos (NO COVID 19)': toNumericDataSet(
    administrativeDivision.adminAbsenceMainReasons['2']
  ).rawText,
  'Total de inasistencias de personal administrativo porque: Se desconocen las causas': toNumericDataSet(
    administrativeDivision.adminAbsenceMainReasons['3']
  ).rawText,
  'Total de inasistencias de personal administrativo por otras causas de inasistencia': toNumericDataSet(
    administrativeDivision.adminAbsenceMainReasons['4']
  ).rawText,
  'Porcentaje de inasistencias de personal administrativo porque: Casos de contagio (COVID 19) confirmados': toPercentageDataSet(
    administrativeDivision.adminAbsenceMainReasonsPercentages['1']
  ).text,
  'Porcentaje de inasistencias de personal administrativo porque: Se reportaron enfermos (NO COVID 19)': toPercentageDataSet(
    administrativeDivision.adminAbsenceMainReasonsPercentages['2']
  ).text,
  'Porcentaje de inasistencias de personal administrativo porque: Se desconocen las causas': toPercentageDataSet(
    administrativeDivision.adminAbsenceMainReasonsPercentages['3']
  ).text,
  'Porcentaje de inasistencias de personal administrativo por otras causas de inasistencia': toPercentageDataSet(
    administrativeDivision.adminAbsenceMainReasonsPercentages['4']
  ).text,
  'Escuelas que instalaron el comité participativo de salud escolar : Si': toNumericDataSet(administrativeDivision.hygieneCommittee['1'])
    .rawText,
  'Escuelas que instalaron el comité participativo de salud escolar : No': toNumericDataSet(administrativeDivision.hygieneCommittee['2'])
    .rawText,
  'Escuelas que instalaron el comité participativo de salud escolar : Si (% de escuelas)': toPercentageDataSet(
    administrativeDivision.hygieneCommitteePercentages['1']
  ).text,
  'Escuelas que instalaron el comité participativo de salud escolar : No (% de escuelas)': toPercentageDataSet(
    administrativeDivision.hygieneCommitteePercentages['2']
  ).text,
  'Escuelas que pueden reorganizar los espacios para facilitar la sana distancia : Si': toNumericDataSet(
    administrativeDivision.schoolWithAbilityToReorganizeSpace['1']
  ).rawText,
  'Escuelas que pueden reorganizar los espacios para facilitar la sana distancia : No': toNumericDataSet(
    administrativeDivision.schoolWithAbilityToReorganizeSpace['2']
  ).rawText,
  'Escuelas que pueden reorganizar los espacios para facilitar la sana distancia : Si (% de escuelas)': toPercentageDataSet(
    administrativeDivision.schoolWithAbilityToReorganizeSpacePercentages['1']
  ).text,
  'Escuelas que pueden reorganizar los espacios para facilitar la sana distancia : No (% de escuelas)': toPercentageDataSet(
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
  'Principales motivos de escuelas sin clases presenciales en regiones con semáforo verde : Si, Personal y Alumnos realizan sus actividades en la escuela': toNumericDataSet(
    administrativeDivision.schoolGivingClasses['1']
  ).rawText,
  'Principales motivos de escuelas sin clases presenciales en regiones con semáforo verde : No, se está realizando la limpieza de espacios para poder iniciar con las clases': toNumericDataSet(
    administrativeDivision.schoolGivingClasses['2']
  ).rawText,
  'Principales motivos de escuelas sin clases presenciales en regiones con semáforo verde : No, todas las madres y los padres de familia determinarón no enviar a sus hijos a la escuela': toNumericDataSet(
    administrativeDivision.schoolGivingClasses['7']
  ).rawText,
  'Principales motivos de escuelas sin clases presenciales en regiones con semáforo verde : No, otras razones': toNumericDataSet(
    administrativeDivision.schoolGivingClasses['8']
  ).rawText,
  'Principales motivos de escuelas sin clases presenciales en regiones con semáforo verde : Si, Personal y Alumnos realizan sus actividades en la escuela (% de escuelas)': toPercentageDataSet(
    administrativeDivision.schoolGivingClassesPercentages['1']
  ).text,
  'Principales motivos de escuelas sin clases presenciales en regiones con semáforo verde : No, se está realizando la limpieza de espacios para poder iniciar con las clases (% de escuelas)': toPercentageDataSet(
    administrativeDivision.schoolGivingClassesPercentages['2']
  ).text,
  'Principales motivos de escuelas sin clases presenciales en regiones con semáforo verde : No, todos las madres y los padres de familia determinarón no enviar a sus hijos a la escuela (% de escuelas)': toPercentageDataSet(
    administrativeDivision.schoolGivingClassesPercentages['7']
  ).text,
  'Principales motivos de escuelas sin clases presenciales en regiones con semáforo verde : No, otras razones (% de escuelas)': toPercentageDataSet(
    administrativeDivision.schoolGivingClassesPercentages['8']
  ).text,
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
  'Botes de basura para el manejo de residuos : Cuenta con botes de basura para el manejo de los residuos': toNumericDataSet(
    administrativeDivision.schoolBinSufficiency['1']
  ).rawText,
  'Botes de basura para el manejo de residuos : No cuenta con botes de basura para el manejo de los residuos': toNumericDataSet(
    administrativeDivision.schoolBinSufficiency['2']
  ).rawText,
  'Botes de basura para el manejo de residuos : Cuenta con botes de basura para el manejo de los residuos (% de escuelas)': toPercentageDataSet(
    administrativeDivision.schoolBinSufficiencyPercentages['1']
  ).text,
  'Botes de basura para el manejo de residuos : No cuenta con botes de basura para el manejo de los residuos (% de escuelas)': toPercentageDataSet(
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
  'Total de maestros de Segunda lengua': toNumericDataSet(administrativeDivision.technicalPedagogicalAdvisers).rawText,
  'Total de docentes de Educación Física': toNumericDataSet(administrativeDivision.physicalEducationTeachers).rawText,
  'Total de personal Administrativo': toNumericDataSet(administrativeDivision.admins).rawText,
  'Total de personal de intendencia': toNumericDataSet(administrativeDivision.quartermasters).rawText,
  'Total de otro tipo de personal': toNumericDataSet(administrativeDivision.others).rawText,
  'Fuente principal de energía eléctrica : Conexión al servicio público': toNumericDataSet(administrativeDivision.electricitySources['1'])
    .rawText,
  'Fuente principal de energía eléctrica : Paneles o celdas solares': toNumericDataSet(administrativeDivision.electricitySources['2'])
    .rawText,
  'Fuente principal de energía eléctrica : Planta de luz propria': toNumericDataSet(administrativeDivision.electricitySources['3']).rawText,
  'Fuente principal de energía eléctrica : Otra': toNumericDataSet(administrativeDivision.electricitySources['4']).rawText,
  'Fuente principal de energía eléctrica : No tiene': toNumericDataSet(administrativeDivision.electricitySources['5']).rawText,
  'Fuente principal de energía eléctrica : Conexión al servicio público (% de escuelas)': toPercentageDataSet(
    administrativeDivision.electricitySourcesPercentages['1']
  ).text,
  'Fuente principal de energía eléctrica : Paneles o celdas solares (% de escuelas)': toPercentageDataSet(
    administrativeDivision.electricitySourcesPercentages['2']
  ).text,
  'Fuente principal de energía eléctrica : Planta de luz propria (% de escuelas)': toPercentageDataSet(
    administrativeDivision.electricitySourcesPercentages['3']
  ).text,
  'Fuente principal de energía eléctrica : Otra (% de escuelas)': toPercentageDataSet(
    administrativeDivision.electricitySourcesPercentages['4']
  ).text,
  'Fuente principal de energía eléctrica : No tiene (% de escuelas)': toPercentageDataSet(
    administrativeDivision.electricitySourcesPercentages['5']
  ).text,
  'Acceso a internet : La escuela cuenta con accesso a internet para uso de de alumnos, docentes y directivos': toNumericDataSet(
    administrativeDivision.internetAccess['1']
  ).rawText,
  'Acceso a internet : La escuela no cuenta con accesso a internet para uso de de alumnos, docentes y directivos': toNumericDataSet(
    administrativeDivision.internetAccess['2']
  ).rawText,
  'Acceso a internet : La escuela cuenta con accesso a internet para uso de de alumnos, docentes y directivos (% de escuelas)': toPercentageDataSet(
    administrativeDivision.internetAccessPercentages['1']
  ).text,
  'Acceso a internet : La escuela no cuenta con accesso a internet para uso de de alumnos, docentes y directivos (% de escuelas)': toPercentageDataSet(
    administrativeDivision.internetAccessPercentages['2']
  ).text,
});
