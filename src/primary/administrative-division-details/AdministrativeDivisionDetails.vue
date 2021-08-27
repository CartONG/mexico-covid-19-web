<template>
  <div>
    <b-collapse class="card mb-4" animation="slide" aria-id="tasaDeAsistencia" open>
      <div slot="trigger" slot-scope="props" class="card-header py-1" role="button" aria-controls="tasaDeAsistencia">
        <table class="table is-fullwidth has-no-background">
          <tbody>
            <tr>
              <td class="has-text-weight-bold has-text-primary is-uppercase">ÍNDICES DE ASISTENCIA</td>
              <td class="w120 has-text-weight-bold has-text-secondary-bis is-uppercase w80 has-text-right opacity-6">Porcentaje</td>
              <td v-if="!printable" class="w40 has-text-right">
                <a class="card-header-icon px-0 py-0">
                  <span class="icon is-small"><i :class="`mdi mdi-chevron-${props.open ? 'down' : 'up'} is-size-3`"></i></span>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-content px-0 py-0">
        <table class="table is-fullwidth has-no-background">
          <tbody>
            <tr>
              <td>Asistencia del alumnado</td>
              <td :class="`w120 has-text-right has-text-weight-bold has-text-${administrativeDivisionDataSet.studentAttendance.color}`">
                {{ administrativeDivisionDataSet.studentAttendance.text }}
              </td>
              <td v-if="!printable" class="w40"></td>
            </tr>
            <tr>
              <td class="pl-2">- Inasistencias de niñas sobre el alumnado esperado</td>
              <td class="w120 has-text-right has-text-weight-bold">
                {{ administrativeDivisionDataSet.femaleStudentAbsencePercentageOverStudentAbsence.text }}
              </td>
              <td v-if="!printable" class="w40"></td>
            </tr>
            <tr>
              <td class="pl-2">- Inasistencias de niños sobre el alumnado esperado</td>
              <td class="w120 has-text-right has-text-weight-bold">
                {{ administrativeDivisionDataSet.maleStudentAbsencePercentageOverStudentAbsence.text }}
              </td>
              <td v-if="!printable" class="w40"></td>
            </tr>
            <tr>
              <td>Asistencia de docentes</td>
              <td :class="`w120 has-text-right has-text-weight-bold has-text-${administrativeDivisionDataSet.teacherAttendance.color}`">
                {{ administrativeDivisionDataSet.teacherAttendance.text }}
              </td>
              <td v-if="!printable" class="w40"></td>
            </tr>
            <tr>
              <td>Asistencia de personal distinto a docentes</td>
              <td :class="`w120 has-text-right has-text-weight-bold has-text-${administrativeDivisionDataSet.adminAttendance.color}`">
                {{ administrativeDivisionDataSet.adminAttendance.text }}
              </td>
              <td v-if="!printable" class="w40"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-collapse>
    <div :class="{ 'horizontal-scroll': !printable }">
      <b-collapse class="card mb-4 mw400" animation="slide" aria-id="causasDeInasistenciaDeAlumnos" :open="printable">
        <div slot="trigger" slot-scope="props" class="card-header py-1" role="button" aria-controls="causasDeInasistenciaDeAlumnos">
          <table class="table is-fullwidth has-no-background">
            <tbody>
              <tr>
                <td class="has-text-weight-bold has-text-primary is-uppercase">
                  Causas de inasistencia de alumnos
                </td>
                <td class="w120 has-text-weight-bold has-text-secondary-bis is-uppercase w80 has-text-right opacity-6">Número</td>
                <td class="w120 has-text-weight-bold has-text-secondary-bis is-uppercase w80 has-text-right opacity-6">Porcentaje</td>
                <td v-if="!printable" class="w40 has-text-right">
                  <a class="card-header-icon px-0 py-0">
                    <span class="icon is-small"><i :class="`mdi mdi-chevron-${props.open ? 'down' : 'up'} is-size-3`"></i></span>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="card-content px-0 py-0">
          <table class="table is-fullwidth has-no-background">
            <tbody>
              <tr>
                <td>La escuela no cuenta con instalaciones para el lavado de manos con agua y jabón</td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.studentAbsenceMainReasons['1'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.studentAbsenceMainReasonsPercentages['1'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>Los padres de familia no enviaron a sus hijos a la escuela</td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.studentAbsenceMainReasons['2'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.studentAbsenceMainReasonsPercentages['2'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>Reportaron enfermos a los alumnos que no asistieron</td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.studentAbsenceMainReasons['3'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.studentAbsenceMainReasonsPercentages['3'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>Se desconocen las causas</td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.studentAbsenceMainReasons['4'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.studentAbsenceMainReasonsPercentages['4'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>Otras causas</td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.studentAbsenceMainReasons['5'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.studentAbsenceMainReasonsPercentages['5'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-collapse>
    </div>
    <div :class="{ 'horizontal-scroll': !printable }">
      <b-collapse class="card mb-4 mw400" animation="slide" aria-id="causasDeInasistenciaDeDocentes" :open="printable">
        <div slot="trigger" slot-scope="props" class="card-header py-1" role="button" aria-controls="causasDeInasistenciaDeDocentes">
          <table class="table is-fullwidth has-no-background">
            <tbody>
              <tr>
                <td class="has-text-weight-bold has-text-primary is-uppercase">
                  Causas de inasistencia de docentes
                </td>
                <td class="w120 has-text-weight-bold has-text-secondary-bis is-uppercase w80 has-text-right opacity-6">Número</td>
                <td class="w120 has-text-weight-bold has-text-secondary-bis is-uppercase w80 has-text-right opacity-6">Porcentaje</td>
                <td v-if="!printable" class="w40 has-text-right">
                  <a class="card-header-icon px-0 py-0">
                    <span class="icon is-small"><i :class="`mdi mdi-chevron-${props.open ? 'down' : 'up'} is-size-3`"></i></span>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="card-content px-0 py-0">
          <table class="table is-fullwidth has-no-background">
            <tbody>
              <tr>
                <td>La escuela no cuenta con instalaciones para el lavado de manos con agua y jabón</td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.teacherAbsenceMainReasons['1'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.teacherAbsenceMainReasonsPercentages['1'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>Se reportaron enfermos</td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.teacherAbsenceMainReasons['2'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.teacherAbsenceMainReasonsPercentages['2'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>No se sabe las causas</td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.teacherAbsenceMainReasons['3'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.teacherAbsenceMainReasonsPercentages['3'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>Otras causas</td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.teacherAbsenceMainReasons['4'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.teacherAbsenceMainReasonsPercentages['4'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-collapse>
    </div>
    <div v-if="printable" class="columns has-page-break-before"><div class="column is-12"></div></div>
    <div :class="{ 'horizontal-scroll': !printable }">
      <b-collapse class="card mb-4 mw400" animation="slide" aria-id="causasDeInasistenciaDelPersonal" :open="printable">
        <div slot="trigger" slot-scope="props" class="card-header py-1" role="button" aria-controls="causasDeInasistenciaDelPersonal">
          <table class="table is-fullwidth has-no-background">
            <tbody>
              <tr>
                <td class="has-text-weight-bold has-text-primary is-uppercase">
                  Causas de inasistencia del personal
                </td>
                <td class="w120 has-text-weight-bold has-text-secondary-bis is-uppercase w80 has-text-right opacity-6">Número</td>
                <td class="w120 has-text-weight-bold has-text-secondary-bis is-uppercase w80 has-text-right opacity-6">Porcentaje</td>
                <td v-if="!printable" class="w40 has-text-right">
                  <a class="card-header-icon px-0 py-0">
                    <span class="icon is-small"><i :class="`mdi mdi-chevron-${props.open ? 'down' : 'up'} is-size-3`"></i></span>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="card-content px-0 py-0">
          <table class="table is-fullwidth has-no-background">
            <tbody>
              <tr>
                <td>La escuela no cuenta con instalaciones para el lavado de manos con agua y jabón</td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.adminsAbsenceMainReasons['1'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.adminsAbsenceMainReasonsPercentages['1'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>Se reportaron enfermos</td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.adminsAbsenceMainReasons['2'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.adminsAbsenceMainReasonsPercentages['2'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>No se sabe las causas</td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.adminsAbsenceMainReasons['3'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.adminsAbsenceMainReasonsPercentages['3'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>Otras causas</td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.adminsAbsenceMainReasons['4'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.adminsAbsenceMainReasonsPercentages['4'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-collapse>
    </div>
    <div :class="{ 'horizontal-scroll': !printable }">
      <b-collapse class="card mb-4 mw400" animation="slide" aria-id="organizaciónEscolar" :open="printable">
        <div slot="trigger" slot-scope="props" class="card-header py-1" role="button" aria-controls="organizaciónEscolar">
          <table class="table is-fullwidth has-no-background">
            <tbody>
              <tr>
                <td class="has-text-weight-bold has-text-primary is-uppercase">Organización escolar</td>
                <td class="w120 has-text-weight-bold has-text-secondary-bis is-uppercase has-text-right opacity-6">Número</td>
                <td class="w120 has-text-weight-bold has-text-secondary-bis is-uppercase has-text-right opacity-6">Porcentaje</td>
                <td v-if="!printable" class="w40 has-text-right">
                  <a class="card-header-icon px-0 py-0">
                    <span class="icon is-small"><i :class="`mdi mdi-chevron-${props.open ? 'down' : 'up'} is-size-3`"></i></span>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="card-content px-0 py-0">
          <table class="table is-fullwidth has-no-background">
            <tbody>
              <tr>
                <td>Escuelas que instalaron el filtro a cargo del comité de salud escolar</td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.hygieneCommittee['1'].text }}
                </td>
                <td
                  :class="
                    `w120 has-text-right has-text-weight-bold has-text-${administrativeDivisionDataSet.hygieneCommitteePercentages['1'].color}`
                  "
                >
                  {{ administrativeDivisionDataSet.hygieneCommitteePercentages['1'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>Escuelas que alternan la asistencia de sus alumnas (os)</td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.alternatesAttendance['1'].text }}
                </td>
                <td
                  :class="
                    `w120 has-text-right has-text-weight-bold has-text-${administrativeDivisionDataSet.alternatesAttendancePercentages['1'].color}`
                  "
                >
                  {{ administrativeDivisionDataSet.alternatesAttendancePercentages['1'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>Escuelas que pueden reorganizar los espacios para facilitar la sana distancia</td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolWithAbilityToReorganizeSpace['1'].text }}
                </td>
                <td
                  :class="
                    `w120 has-text-right has-text-weight-bold has-text-${administrativeDivisionDataSet.schoolWithAbilityToReorganizeSpacePercentages['1'].color}`
                  "
                >
                  {{ administrativeDivisionDataSet.schoolWithAbilityToReorganizeSpacePercentages['1'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td class="is-uppercase has-text-secondary-bis has-text-weight-bold">
                  Acciones para reincorporar a los alumnos con inasistencias
                </td>
                <td></td>
                <td></td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>Visita domiciliaria</td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.takenActions.visits.text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.takenActionsPercentages.visits.text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>Llamada telefónica</td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.takenActions.calls.text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.takenActionsPercentages.calls.text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>Gestión de becas</td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.takenActions.scholarship.text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.takenActionsPercentages.scholarship.text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>Ninguna</td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.takenActions.none.text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.takenActionsPercentages.none.text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-collapse>
    </div>
    <div v-if="printable" class="columns has-page-break-before"><div class="column is-12"></div></div>
    <div :class="{ 'horizontal-scroll': !printable }">
      <b-collapse class="card mb-4 mw500" animation="slide" aria-id="principaleMotivosDeEscuelasSinClasesPresenciales" :open="printable">
        <div
          slot="trigger"
          slot-scope="props"
          class="card-header py-1"
          role="button"
          aria-controls="principaleMotivosDeEscuelasSinClasesPresenciales"
        >
          <table class="table is-fullwidth has-no-background">
            <tbody>
              <tr class="wrap-words">
                <td class="has-text-weight-bold has-text-primary is-uppercase">
                  Principales motivos de escuelas sin clases presenciales en regiones con semáforo verde
                </td>
                <td class="w200 has-text-weight-bold has-text-secondary-bis is-uppercase has-text-right opacity-6">Número de escuelas</td>
                <td class="w120 has-text-weight-bold has-text-secondary-bis is-uppercase has-text-right opacity-6">Porcentaje</td>
                <td v-if="!printable" class="w40 has-text-right">
                  <a class="card-header-icon px-0 py-0">
                    <span class="icon is-small"><i :class="`mdi mdi-chevron-${props.open ? 'down' : 'up'} is-size-3`"></i></span>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="card-content px-0 py-0">
          <table class="table is-fullwidth has-no-background">
            <tbody>
              <tr>
                <td>Se está realizando la limpieza de espacios y mobiliario para poder iniciar con las clases</td>
                <td class="w200 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolGivingClasses['2'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolGivingClassesPercentages['2'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>Existe la confirmación de al menos un caso de COVID-19 en la escuela</td>
                <td class="w200 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolGivingClasses['3'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolGivingClassesPercentages['3'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>La Autoridad Educativa Local determinó continuar con la suspensión de clases</td>
                <td class="w200 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolGivingClasses['4'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolGivingClassesPercentages['4'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>La comunidad escolar determinó continuar con la suspensión de clases</td>
                <td class="w200 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolGivingClasses['5'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolGivingClassesPercentages['5'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>El personal de la escuela decidió continuar con la suspensión de clases</td>
                <td class="w200 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolGivingClasses['6'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolGivingClassesPercentages['6'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>Los padres de familia informaron que no enviarán a sus hijos a la escuela</td>
                <td class="w200 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolGivingClasses['7'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolGivingClassesPercentages['7'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>Otras razones</td>
                <td class="w200 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolGivingClasses['8'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolGivingClassesPercentages['8'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-collapse>
    </div>
    <div v-if="printable" class="columns has-page-break-before"><div class="column is-12"></div></div>
    <div :class="{ 'horizontal-scroll': !printable }">
      <b-collapse class="card mb-4 mw500" animation="slide" aria-id="condicionesSanitariasElementales" :open="printable">
        <div slot="trigger" slot-scope="props" class="card-header py-1" role="button" aria-controls="condicionesSanitariasElementales">
          <table class="table is-fullwidth has-no-background">
            <tbody>
              <tr>
                <td class="has-text-weight-bold has-text-primary is-uppercase">
                  Condiciones sanitarias elementales en las escuelas
                </td>
                <td class="w200 has-text-weight-bold has-text-secondary-bis is-uppercase has-text-right opacity-6">Número de escuelas</td>
                <td class="w120 has-text-weight-bold has-text-secondary-bis is-uppercase w80 has-text-right opacity-6">Porcentaje</td>
                <td v-if="!printable" class="w40 has-text-right">
                  <a class="card-header-icon px-0 py-0">
                    <span class="icon is-small"><i :class="`mdi mdi-chevron-${props.open ? 'down' : 'up'} is-size-3`"></i></span>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="card-content px-0 py-0">
          <table class="table is-fullwidth has-no-background">
            <tbody>
              <tr>
                <td class="is-uppercase has-text-secondary-bis has-text-weight-bold">Abastecimiento de agua</td>
                <td></td>
                <td></td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>Red municipal de agua potable</td>
                <td class="w200 has-text-right has-text-weight-bold">{{ administrativeDivisionDataSet.schoolWaterSupply['1'].text }}</td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolWaterSupplyPercentages['1'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>Abastecimiento a través de pipas</td>
                <td class="w200 has-text-right has-text-weight-bold">{{ administrativeDivisionDataSet.schoolWaterSupply['2'].text }}</td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolWaterSupplyPercentages['2'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>Otra fuente (pozo, río, lago, etc.)</td>
                <td class="w200 has-text-right has-text-weight-bold">{{ administrativeDivisionDataSet.schoolWaterSupply['3'].text }}</td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolWaterSupplyPercentages['3'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>No cuenta con ningún tipo de abastecimiento</td>
                <td class="w200 has-text-right has-text-weight-bold">{{ administrativeDivisionDataSet.schoolWaterSupply['4'].text }}</td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolWaterSupplyPercentages['4'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td class="is-uppercase has-text-secondary-bis has-text-weight-bold">Frecuencia del abastecimiento de agua</td>
                <td></td>
                <td></td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>Todos los días</td>
                <td class="w200 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolWaterServiceContinuity['1'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolWaterServiceContinuityPercentages['1'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>De 2 a 4 días a la semana</td>
                <td class="w200 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolWaterServiceContinuity['2'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolWaterServiceContinuityPercentages['2'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>Una sola vez por semana</td>
                <td class="w200 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolWaterServiceContinuity['3'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolWaterServiceContinuityPercentages['3'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>No cuenta con servicio de agua</td>
                <td class="w200 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolWaterServiceContinuity['4'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolWaterServiceContinuityPercentages['4'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td class="is-uppercase has-text-secondary-bis has-text-weight-bold">
                  Disponibilidad de agua para el lavado frecuente de manos
                </td>
                <td></td>
                <td></td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>Cuenta con agua para el lavado de manos</td>
                <td class="w200 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolWithWaterForHandWashing['1'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolWithWaterForHandWashingPercentages['1'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>No cuenta con agua para lavado de manos</td>
                <td class="w200 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolWithWaterForHandWashing['2'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolWithWaterForHandWashingPercentages['2'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td class="is-uppercase has-text-secondary-bis has-text-weight-bold">
                  Lavamanos
                </td>
                <td></td>
                <td></td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>Lavamanos funcionales</td>
                <td class="w200 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolFunctionalSinkCount.text }}
                </td>
                <td></td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td class="is-uppercase has-text-secondary-bis has-text-weight-bold">
                  Disponibilidad de jabón para el lavado de manos
                </td>
                <td></td>
                <td></td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>Cuenta con suficiente jabón</td>
                <td class="w200 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolSoapSufficiency['1'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolSoapSufficiencyPercentages['1'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>No cuenta con suficiente jabón</td>
                <td class="w200 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolSoapSufficiency['2'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolSoapSufficiencyPercentages['2'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>No cuenta</td>
                <td class="w200 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolSoapSufficiency['3'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolSoapSufficiencyPercentages['3'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr v-if="!printable">
                <td class="is-uppercase has-text-secondary-bis has-text-weight-bold">
                  Disponibilidad de toallas para el secado de manos (papel o tela)
                </td>
                <td></td>
                <td></td>
                <td class="w40"></td>
              </tr>
              <tr v-if="!printable">
                <td>Cuenta con suficientes toallas</td>
                <td class="w200 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolTowelSufficiency['1'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolTowelSufficiencyPercentages['1'].text }}
                </td>
                <td class="w40"></td>
              </tr>
              <tr v-if="!printable">
                <td>No cuenta con suficientes toallas</td>
                <td class="w200 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolTowelSufficiency['2'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolTowelSufficiencyPercentages['2'].text }}
                </td>
                <td class="w40"></td>
              </tr>
              <tr v-if="!printable">
                <td>No cuenta</td>
                <td class="w200 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolTowelSufficiency['3'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolTowelSufficiencyPercentages['3'].text }}
                </td>
                <td class="w40"></td>
              </tr>
              <tr v-if="!printable">
                <td class="is-uppercase has-text-secondary-bis has-text-weight-bold">
                  Disponibilidad de alcohol en gel al 70%
                </td>
                <td></td>
                <td></td>
                <td class="w40"></td>
              </tr>
              <tr v-if="!printable">
                <td>Cuenta con suficiente alcohol en gel</td>
                <td class="w200 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolSanitizerSufficiency['1'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolSanitizerSufficiencyPercentages['1'].text }}
                </td>
                <td class="w40"></td>
              </tr>
              <tr v-if="!printable">
                <td>No cuenta con suficiente alcohol en gel</td>
                <td class="w200 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolSanitizerSufficiency['2'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolSanitizerSufficiencyPercentages['2'].text }}
                </td>
                <td class="w40"></td>
              </tr>
              <tr v-if="!printable">
                <td>No cuenta</td>
                <td class="w200 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolSanitizerSufficiency['3'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolSanitizerSufficiencyPercentages['3'].text }}
                </td>
                <td class="w40"></td>
              </tr>
              <tr v-if="!printable">
                <td class="is-uppercase has-text-secondary-bis has-text-weight-bold">
                  Disponibilidad de botes de basura
                </td>
                <td></td>
                <td class="w40"></td>
              </tr>
              <tr v-if="!printable">
                <td>Cuenta con botes de basura para el manejo de los residuos</td>
                <td class="w200 has-text-right has-text-weight-bold">{{ administrativeDivisionDataSet.schoolBinSufficiency['1'].text }}</td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolBinSufficiencyPercentages['1'].text }}
                </td>
                <td class="w40"></td>
              </tr>
              <tr v-if="!printable">
                <td>No cuenta con botes de basura para el manejo de los residuos</td>
                <td class="w200 has-text-right has-text-weight-bold">{{ administrativeDivisionDataSet.schoolBinSufficiency['2'].text }}</td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolBinSufficiencyPercentages['2'].text }}
                </td>
                <td class="w40"></td>
              </tr>
              <tr v-if="!printable">
                <td class="is-uppercase has-text-secondary-bis has-text-weight-bold">
                  Existencia de drenaje
                </td>
                <td></td>
                <td class="w40"></td>
              </tr>
              <tr v-if="!printable">
                <td>Cuenta con Red de drenaje, fosa séptica para desalojo de aguas</td>
                <td class="w200 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolWithSepticSystem['1'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolWithSepticSystemPercentages['1'].text }}
                </td>
                <td class="w40"></td>
              </tr>
              <tr v-if="!printable">
                <td>No cuenta con Red de drenaje, fosa séptica para desalojo de aguas</td>
                <td class="w200 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolWithSepticSystem['2'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.schoolWithSepticSystemPercentages['2'].text }}
                </td>
                <td class="w40"></td>
              </tr>
              <tr v-if="!printable">
                <td class="is-uppercase has-text-secondary-bis has-text-weight-bold">
                  Bebederos
                </td>
                <td></td>
                <td class="w40"></td>
              </tr>
              <tr v-if="!printable">
                <td>Bebederos funcionales</td>
                <td class="w200 has-text-right has-text-weight-bold">{{ administrativeDivisionDataSet.drinkers.text }}</td>
                <td></td>
                <td class="w40"></td>
              </tr>
              <tr v-if="!printable">
                <td class="is-uppercase has-text-secondary-bis has-text-weight-bold">
                  Baños
                </td>
                <td></td>
                <td class="w40"></td>
              </tr>
              <tr v-if="!printable">
                <td>Baños funcionales, Alumnas</td>
                <td class="w200 has-text-right has-text-weight-bold">{{ administrativeDivisionDataSet.femaleStudentToilets.text }}</td>
                <td></td>
                <td class="w40"></td>
              </tr>
              <tr v-if="!printable">
                <td>Baños funcionales, Alumnos</td>
                <td class="w200 has-text-right has-text-weight-bold">{{ administrativeDivisionDataSet.maleStudentToilets.text }}</td>
                <td></td>
                <td class="w40"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-collapse>
    </div>
    <div v-if="printable" class="columns has-page-break-before"><div class="column is-12"></div></div>
    <b-collapse v-if="printable" class="card mb-4" animation="slide" aria-id="condicionesSanitariasElementales2" :open="printable">
      <div slot="trigger" slot-scope="props" class="card-header py-1" role="button" aria-controls="condicionesSanitariasElementales2">
        <table class="table is-fullwidth has-no-background">
          <tbody>
            <tr>
              <td class="has-text-weight-bold has-text-primary is-uppercase">
                Condiciones sanitarias elementales en las escuelas
              </td>
              <td class="w200 has-text-weight-bold has-text-secondary-bis is-uppercase has-text-right opacity-6">Número de escuelas</td>
              <td class="w120 has-text-weight-bold has-text-secondary-bis is-uppercase w80 has-text-right opacity-6">Porcentaje</td>
              <td v-if="!printable" class="w40 has-text-right">
                <a class="card-header-icon px-0 py-0">
                  <span class="icon is-small"><i :class="`mdi mdi-chevron-${props.open ? 'down' : 'up'} is-size-3`"></i></span>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-content px-0 py-0">
        <table class="table is-fullwidth has-no-background">
          <tbody>
            <tr>
              <td class="is-uppercase has-text-secondary-bis has-text-weight-bold">
                Disponibilidad de toallas para el secado de manos (papel o tela)
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Cuenta con suficientes toallas</td>
              <td class="w200 has-text-right has-text-weight-bold">{{ administrativeDivisionDataSet.schoolTowelSufficiency['1'].text }}</td>
              <td class="w120 has-text-right has-text-weight-bold">
                {{ administrativeDivisionDataSet.schoolTowelSufficiencyPercentages['1'].text }}
              </td>
            </tr>
            <tr>
              <td>No cuenta con suficientes toallas</td>
              <td class="w200 has-text-right has-text-weight-bold">{{ administrativeDivisionDataSet.schoolTowelSufficiency['2'].text }}</td>
              <td class="w120 has-text-right has-text-weight-bold">
                {{ administrativeDivisionDataSet.schoolTowelSufficiencyPercentages['2'].text }}
              </td>
            </tr>
            <tr>
              <td>No cuenta</td>
              <td class="w200 has-text-right has-text-weight-bold">{{ administrativeDivisionDataSet.schoolTowelSufficiency['3'].text }}</td>
              <td class="w120 has-text-right has-text-weight-bold">
                {{ administrativeDivisionDataSet.schoolTowelSufficiencyPercentages['3'].text }}
              </td>
            </tr>
            <tr>
              <td class="is-uppercase has-text-secondary-bis has-text-weight-bold">
                Disponibilidad de alcohol en gel al 70%
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Cuenta con suficiente alcohol en gel</td>
              <td class="w200 has-text-right has-text-weight-bold">
                {{ administrativeDivisionDataSet.schoolSanitizerSufficiency['1'].text }}
              </td>
              <td class="w120 has-text-right has-text-weight-bold">
                {{ administrativeDivisionDataSet.schoolSanitizerSufficiencyPercentages['1'].text }}
              </td>
            </tr>
            <tr>
              <td>No cuenta con suficiente alcohol en gel</td>
              <td class="w200 has-text-right has-text-weight-bold">
                {{ administrativeDivisionDataSet.schoolSanitizerSufficiency['2'].text }}
              </td>
              <td class="w120 has-text-right has-text-weight-bold">
                {{ administrativeDivisionDataSet.schoolSanitizerSufficiencyPercentages['2'].text }}
              </td>
            </tr>
            <tr>
              <td>No cuenta</td>
              <td class="w200 has-text-right has-text-weight-bold">
                {{ administrativeDivisionDataSet.schoolSanitizerSufficiency['3'].text }}
              </td>
              <td class="w120 has-text-right has-text-weight-bold">
                {{ administrativeDivisionDataSet.schoolSanitizerSufficiencyPercentages['3'].text }}
              </td>
            </tr>
            <tr>
              <td class="is-uppercase has-text-secondary-bis has-text-weight-bold">
                Disponibilidad de botes de basura
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Cuenta con botes de basura para el manejo de los residuos</td>
              <td class="w200 has-text-right has-text-weight-bold">{{ administrativeDivisionDataSet.schoolBinSufficiency['1'].text }}</td>
              <td class="w120 has-text-right has-text-weight-bold">
                {{ administrativeDivisionDataSet.schoolBinSufficiencyPercentages['1'].text }}
              </td>
            </tr>
            <tr>
              <td>No cuenta con botes de basura para el manejo de los residuos</td>
              <td class="w200 has-text-right has-text-weight-bold">{{ administrativeDivisionDataSet.schoolBinSufficiency['2'].text }}</td>
              <td class="w120 has-text-right has-text-weight-bold">
                {{ administrativeDivisionDataSet.schoolBinSufficiencyPercentages['2'].text }}
              </td>
            </tr>
            <tr>
              <td class="is-uppercase has-text-secondary-bis has-text-weight-bold">
                Existencia de drenaje
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Cuenta con Red de drenaje, fosa séptica para desalojo de aguas</td>
              <td class="w200 has-text-right has-text-weight-bold">{{ administrativeDivisionDataSet.schoolWithSepticSystem['1'].text }}</td>
              <td class="w120 has-text-right has-text-weight-bold">
                {{ administrativeDivisionDataSet.schoolWithSepticSystemPercentages['1'].text }}
              </td>
            </tr>
            <tr>
              <td>No cuenta con Red de drenaje, fosa séptica para desalojo de aguas</td>
              <td class="w200 has-text-right has-text-weight-bold">{{ administrativeDivisionDataSet.schoolWithSepticSystem['2'].text }}</td>
              <td class="w120 has-text-right has-text-weight-bold">
                {{ administrativeDivisionDataSet.schoolWithSepticSystemPercentages['2'].text }}
              </td>
            </tr>
            <tr>
              <td class="is-uppercase has-text-secondary-bis has-text-weight-bold">
                Bebederos
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Bebederos funcionales</td>
              <td class="w200 has-text-right has-text-weight-bold">{{ administrativeDivisionDataSet.drinkers.text }}</td>
              <td></td>
            </tr>
            <tr>
              <td class="is-uppercase has-text-secondary-bis has-text-weight-bold">
                Baños
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Baños funcionales, Alumnas</td>
              <td class="w200 has-text-right has-text-weight-bold">{{ administrativeDivisionDataSet.femaleStudentToilets.text }}</td>
              <td></td>
            </tr>
            <tr>
              <td>Baños funcionales, Alumnos</td>
              <td class="w200 has-text-right has-text-weight-bold">{{ administrativeDivisionDataSet.maleStudentToilets.text }}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-collapse>
    <div v-if="printable" class="columns has-page-break-before"><div class="column is-12"></div></div>
    <div :class="{ 'horizontal-scroll': !printable }">
      <b-collapse class="card mb-4 mw400" animation="slide" aria-id="programasAdheridosALaEscuela" :open="printable">
        <div slot="trigger" slot-scope="props" class="card-header py-1" role="button" aria-controls="programasAdheridosALaEscuela">
          <table class="table is-fullwidth has-no-background">
            <tbody>
              <tr>
                <td class="has-text-weight-bold has-text-primary is-uppercase">Programas adheridos a la escuela</td>
                <td class="w200 has-text-weight-bold has-text-secondary-bis is-uppercase has-text-right opacity-6">Número de escuelas</td>
                <td class="w120 has-text-weight-bold has-text-secondary-bis is-uppercase has-text-right opacity-6 break-word">
                  Porcentaje
                </td>
                <td v-if="!printable" class="w40 has-text-right">
                  <a class="card-header-icon px-0 py-0">
                    <span class="icon is-small"><i :class="`mdi mdi-chevron-${props.open ? 'down' : 'up'} is-size-3`"></i></span>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="card-content px-0 py-0">
          <table class="table is-fullwidth has-no-background">
            <tbody>
              <tr>
                <td class="is-uppercase has-text-secondary-bis has-text-weight-bold">
                  Reciben el apoyo de alimentación en la escuela
                </td>
                <td></td>
                <td></td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>Si reciben algún apoyo de alimentación</td>
                <td class="w200 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.foodSupport['1'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.foodSupportPercentages['1'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>No recibe apoyo de alimentación</td>
                <td class="w200 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.foodSupport['2'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.foodSupportPercentages['2'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td class="is-uppercase has-text-secondary-bis has-text-weight-bold">
                  Quienes proporcionan los alimentos
                </td>
                <td></td>
                <td></td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>Reciben alimentos por parte del DIF</td>
                <td class="w200 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.foodSupportType.dif.text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.foodSupportTypePercentages.dif.text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>Reciben alimentos por parte del Programa La Escuela es Nuestra</td>
                <td class="w200 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.foodSupportType.fullTimeProgram.text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.foodSupportTypePercentages.fullTimeProgram.text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>Reciben alimentos por parte del Estado</td>
                <td class="w200 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.foodSupportType.state.text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.foodSupportTypePercentages.state.text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>Otros</td>
                <td class="w200 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.foodSupportType.others.text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.foodSupportTypePercentages.others.text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td class="is-uppercase has-text-secondary-bis has-text-weight-bold">
                  La escuela pertenece al programa La Escuela es nuestra
                </td>
                <td></td>
                <td></td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>Si pertenece</td>
                <td class="w200 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.theSchoolIsOurs['1'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.theSchoolIsOursPercentages['1'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>No pertenece</td>
                <td class="w200 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.theSchoolIsOurs['2'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.theSchoolIsOursPercentages['2'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-collapse>
    </div>
    <div v-if="printable" class="columns has-page-break-before"><div class="column is-12"></div></div>
    <div :class="{ 'horizontal-scroll': !printable }">
      <b-collapse class="card mb-4 mw400" animation="slide" aria-id="estadísticaBásicaSobreMatricula" :open="printable">
        <div slot="trigger" slot-scope="props" class="card-header py-1" role="button" aria-controls="estadísticaBásicaSobreMatricula">
          <table class="table is-fullwidth has-no-background">
            <tbody>
              <tr>
                <td class="has-text-weight-bold has-text-primary is-uppercase">Estadística básica sobre matricula</td>
                <td class="w120 has-text-weight-bold has-text-secondary-bis is-uppercase has-text-right opacity-6 break-word">Número</td>
                <td class="w120 has-text-weight-bold has-text-secondary-bis is-uppercase has-text-right opacity-6 break-word">
                  Porcentaje
                </td>
                <td v-if="!printable" class="w40 has-text-right">
                  <a class="card-header-icon px-0 py-0">
                    <span class="icon is-small"><i :class="`mdi mdi-chevron-${props.open ? 'down' : 'up'} is-size-3`"></i></span>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="card-content px-0 py-0">
          <table class="table is-fullwidth has-no-background">
            <tbody>
              <tr>
                <td>Total de alumnos</td>
                <td class="w120 has-text-right has-text-weight-bold">{{ administrativeDivisionDataSet.students.text }}</td>
                <td class="w120 has-text-right has-text-weight-bold">100%</td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td class="pl-2">- de los cuales alumnas</td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.femaleStudents.text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.femaleStudentPercentage.text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td class="pl-2">- de los cuales alumnos</td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.maleStudents.text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.maleStudentPercentage.text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>Grupos</td>
                <td class="w120 has-text-right has-text-weight-bold">{{ administrativeDivisionDataSet.assistants }}</td>
                <td class="w120 has-text-right has-text-weight-bold">-</td>
                <td v-if="!printable" class="w40"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-collapse>
    </div>
    <b-collapse class="card mb-4" animation="slide" aria-id="estadísticasBásicasDelPersonal" :open="printable">
      <div slot="trigger" slot-scope="props" class="card-header py-1" role="button" aria-controls="estadísticasBásicasDelPersonal">
        <table class="table is-fullwidth has-no-background">
          <tbody>
            <tr>
              <td class="has-text-weight-bold has-text-primary is-uppercase">
                Estadísticas básicas del personal
              </td>
              <td class="w120 has-text-weight-bold has-text-secondary-bis is-uppercase w80 has-text-right opacity-6">Número</td>
              <td v-if="!printable" class="w40 has-text-right">
                <a class="card-header-icon px-0 py-0">
                  <span class="icon is-small"><i :class="`mdi mdi-chevron-${props.open ? 'down' : 'up'} is-size-3`"></i></span>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-content px-0 py-0">
        <table class="table is-fullwidth has-no-background">
          <tbody>
            <tr>
              <td>Docentes</td>
              <td class="w120 has-text-right has-text-weight-bold">{{ administrativeDivisionDataSet.teachers }}</td>
              <td v-if="!printable" class="w40"></td>
            </tr>
            <tr>
              <td>Directores</td>
              <td class="w120 has-text-right has-text-weight-bold">{{ administrativeDivisionDataSet.directors }}</td>
              <td v-if="!printable" class="w40"></td>
            </tr>
            <tr>
              <td>Subdirectores</td>
              <td class="w120 has-text-right has-text-weight-bold">{{ administrativeDivisionDataSet.subDirectors }}</td>
              <td v-if="!printable" class="w40"></td>
            </tr>
            <tr>
              <td>Asesores Técnicos Pedagógicos</td>
              <td class="w120 has-text-right has-text-weight-bold">{{ administrativeDivisionDataSet.technicalPedagogicalAdvisers }}</td>
              <td v-if="!printable" class="w40"></td>
            </tr>
            <tr>
              <td>Docentes de Educación Física</td>
              <td class="w120 has-text-right has-text-weight-bold">{{ administrativeDivisionDataSet.physicalEducationTeachers }}</td>
              <td v-if="!printable" class="w40"></td>
            </tr>
            <tr>
              <td>Personal Administrativo</td>
              <td class="w120 has-text-right has-text-weight-bold">{{ administrativeDivisionDataSet.admins }}</td>
              <td v-if="!printable" class="w40"></td>
            </tr>
            <tr>
              <td>Personal de intendencia</td>
              <td class="w120 has-text-right has-text-weight-bold">{{ administrativeDivisionDataSet.quartermasters }}</td>
              <td v-if="!printable" class="w40"></td>
            </tr>
            <tr>
              <td>Otro tipo de personal</td>
              <td class="w120 has-text-right has-text-weight-bold">{{ administrativeDivisionDataSet.others }}</td>
              <td v-if="!printable" class="w40"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-collapse>
    <div v-if="printable" class="columns has-page-break-before"><div class="column is-12"></div></div>
    <div :class="{ 'horizontal-scroll': !printable }">
      <b-collapse class="card mb-4 mw400" animation="slide" aria-id="serviciosBasicos" :open="printable">
        <div slot="trigger" slot-scope="props" class="card-header py-1" role="button" aria-controls="serviciosBasicos">
          <table class="table is-fullwidth has-no-background">
            <tbody>
              <tr>
                <td class="has-text-weight-bold has-text-primary is-uppercase">Servicios básicos</td>
                <td class="w200 has-text-weight-bold has-text-secondary-bis is-uppercase has-text-right opacity-6">Número de escuelas</td>
                <td class="w120 has-text-weight-bold has-text-secondary-bis is-uppercase has-text-right opacity-6 break-word">
                  Porcentaje
                </td>
                <td v-if="!printable" class="w40 has-text-right">
                  <a class="card-header-icon px-0 py-0">
                    <span class="icon is-small"><i :class="`mdi mdi-chevron-${props.open ? 'down' : 'up'} is-size-3`"></i></span>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="card-content px-0 py-0">
          <table class="table is-fullwidth has-no-background">
            <tbody>
              <tr>
                <td class="is-uppercase has-text-secondary-bis has-text-weight-bold">
                  Fuente principal de energía eléctrica
                </td>
                <td></td>
                <td></td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>Conexión al servicio público</td>
                <td class="w200 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.electricitySources['1'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.electricitySourcesPercentages['1'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>Paneles o celdas solares</td>
                <td class="w200 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.electricitySources['2'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.electricitySourcesPercentages['2'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>Planta de luz propria</td>
                <td class="w200 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.electricitySources['3'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.electricitySourcesPercentages['3'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>Otra</td>
                <td class="w200 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.electricitySources['4'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.electricitySourcesPercentages['4'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>No tiene</td>
                <td class="w200 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.electricitySources['5'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.electricitySourcesPercentages['5'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td class="is-uppercase has-text-secondary-bis has-text-weight-bold">
                  Acceso a internet
                </td>
                <td></td>
                <td></td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>La escuela cuenta con accesso a internet para uso de de alumnos, docentes y directivos</td>
                <td class="w200 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.internetAccess['1'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.internetAccessPercentages['1'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
              <tr>
                <td>La escuela no cuenta con accesso a internet para uso de de alumnos, docentes y directivos</td>
                <td class="w200 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.internetAccess['2'].text }}
                </td>
                <td class="w120 has-text-right has-text-weight-bold">
                  {{ administrativeDivisionDataSet.internetAccessPercentages['2'].text }}
                </td>
                <td v-if="!printable" class="w40"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-collapse>
    </div>
  </div>
</template>

<script lang="ts" src="./AdministrativeDivisionDetails.component.ts"></script>
