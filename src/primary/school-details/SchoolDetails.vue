<template>
  <div>
    <div class="has-background-white card mb-4">
      <header class="card-header py-2 px-2">
        <h2 class="has-text-weight-bold has-text-primary is-uppercase">Motivo por el que la escuela no tiene clases presenciales</h2>
      </header>
      <div class="card-content px-0 py-0">
        <p v-if="schoolDataSet.givesClasses.shortText === 'Si'" class="px-2 py-2">No aplicable</p>
        <p v-else class="px-2 py-2">{{ schoolDataSet.givesClasses.longText }}</p>
      </div>
    </div>
    <div class="has-background-white card mb-4">
      <header class="card-header py-2 px-2">
        <h2 class="has-text-weight-bold has-text-primary is-uppercase">Commentarios realizados por la escuela</h2>
      </header>
      <div class="card-content px-0 py-0">
        <p v-if="schoolDataSet.studentAbsenceOtherReason === ''" class="px-2 py-2">No aplicable</p>
        <p v-else class="px-2 py-2">{{ schoolDataSet.studentAbsenceOtherReason }}</p>
      </div>
    </div>
    <b-collapse class="card mb-4" animation="slide" aria-id="indiceDeAsistencia" :open="printable">
      <div slot="trigger" slot-scope="props" class="card-header py-1" role="button" aria-controls="indiceDeAsistencia">
        <table class="table is-fullwidth has-no-background">
          <tbody>
            <tr>
              <td class="has-text-weight-bold has-text-primary is-uppercase">índice de asistencia</td>
              <td class="w120 has-text-weight-bold has-text-secondary-bis is-uppercase w80 has-text-right opacity-6">Porcentaje</td>
              <td class="w40 has-text-right">
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
              <td :class="`w120 has-text-right has-text-${schoolDataSet.maleStudentAttendance.color}`">
                {{ schoolDataSet.maleStudentAttendance.text }}
              </td>
              <td class="w40"></td>
            </tr>
            <tr>
              <td>inasistencia de niñas sobre el total de inasistencias</td>
              <td :class="`w120 has-text-right has-text-${schoolDataSet.femaleStudentAttendance.color}`">
                {{ schoolDataSet.maleStudentAttendance.text }}
              </td>
              <td class="w40"></td>
            </tr>
            <tr>
              <td>inasistencia de niños sobre el total de inasistencias</td>
              <td :class="`w120 has-text-right has-text-${schoolDataSet.maleStudentAttendance.color}`">
                {{ schoolDataSet.maleStudentAttendance.text }}
              </td>
              <td class="w40"></td>
            </tr>
            <tr>
              <td>Asistencia de docentes</td>
              <td :class="`w120 has-text-right has-text-${schoolDataSet.teacherAttendance.color}`">
                {{ schoolDataSet.teacherAttendance.text }}
              </td>
              <td class="w40"></td>
            </tr>
            <tr>
              <td>Asistencia de personal distinto a docentes</td>
              <td :class="`w120 has-text-right has-text-${schoolDataSet.adminAttendance.color}`">
                {{ schoolDataSet.adminAttendance.text }}
              </td>
              <td class="w40"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-collapse>
    <div v-if="printable" class="columns has-page-break-before"><div class="column is-12"></div></div>
    <b-collapse class="card mb-4" animation="slide" aria-id="conditioneSsanitariasElementales" :open="printable">
      <div slot="trigger" slot-scope="props" class="card-header py-1" role="button" aria-controls="conditioneSsanitariasElementales">
        <table class="table is-fullwidth has-no-background">
          <tbody>
            <tr>
              <td class="has-text-weight-bold has-text-primary is-uppercase">conditiones sanitarias elementales en la escuela</td>
              <td class="w40 has-text-right">
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
              <td>Abastecimiento de agua</td>
              <td>
                {{ schoolDataSet.waterSupply }}
              </td>
            </tr>
            <tr>
              <td>Frecuencia del abastecimiento de agua</td>
              <td>
                {{ schoolDataSet.waterServiceContinuity }}
              </td>
            </tr>
            <tr>
              <td>Disponibilidad de agua para el lavado frecuente de manos</td>
              <td>
                {{ schoolDataSet.waterForHandWashing.longText }}
              </td>
            </tr>
            <tr>
              <td>Disponibilidad de lavamanos</td>
              <td>
                {{ schoolDataSet.sinkSufficiency }}
              </td>
            </tr>
            <tr>
              <td>Disponibilidad de jabón para el lavado de manos</td>
              <td>
                {{ schoolDataSet.soapSufficiency.longText }}
              </td>
            </tr>
            <tr>
              <td>Disponibilidad de toallas para el secado de manos (papel o tela)</td>
              <td>
                {{ schoolDataSet.towelSufficiency }}
              </td>
            </tr>
            <tr>
              <td>Disponibilidad de alcohol en gel al 70%</td>
              <td>
                {{ schoolDataSet.sanitizerSufficiency }}
              </td>
            </tr>
            <tr>
              <td>Disponibilidad de botes de basura</td>
              <td>
                {{ schoolDataSet.binSufficiency }}
              </td>
            </tr>
            <tr>
              <td>Existencia de drenaje</td>
              <td>
                {{ schoolDataSet.hasSepticSystem }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-collapse>
    <b-collapse class="card mb-4" animation="slide" aria-id="estadísticasBásicasDelPersonal" :open="printable">
      <div slot="trigger" slot-scope="props" class="card-header py-1" role="button" aria-controls="estadísticasBásicasDelPersonal">
        <table class="table is-fullwidth has-no-background">
          <tbody>
            <tr>
              <td class="has-text-weight-bold has-text-primary is-uppercase">
                Estadísticas básicas del personal
              </td>
              <td class="w120 has-text-weight-bold has-text-secondary-bis is-uppercase w80 has-text-right opacity-6">Número</td>
              <td class="w40 has-text-right">
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
              <td class="w120 has-text-right">{{ schoolDataSet.teachers }}</td>
              <td class="w40"></td>
            </tr>
            <tr>
              <td>Director</td>
              <td class="w120 has-text-right">{{ schoolDataSet.directors }}</td>
              <td class="w40"></td>
            </tr>
            <tr>
              <td>Subdirector</td>
              <td class="w120 has-text-right">{{ schoolDataSet.subDirectors }}</td>
              <td class="w40"></td>
            </tr>
            <tr>
              <td>Atps</td>
              <td class="w120 has-text-right">{{ schoolDataSet.technicalPedagogicalAdvisers }}</td>
              <td class="w40"></td>
            </tr>
            <tr>
              <td>Educfis</td>
              <td class="w120 has-text-right">{{ schoolDataSet.physicalEducationTeachers }}</td>
              <td class="w40"></td>
            </tr>
            <tr>
              <td>Admin</td>
              <td class="w120 has-text-right">{{ schoolDataSet.admins }}</td>
              <td class="w40"></td>
            </tr>
            <tr>
              <td>Intenden</td>
              <td class="w120 has-text-right">{{ schoolDataSet.quartermasters }}</td>
              <td class="w40"></td>
            </tr>
            <tr>
              <td>Otros</td>
              <td class="w120 has-text-right">{{ schoolDataSet.others }}</td>
              <td class="w40"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-collapse>
    <div v-if="printable" class="columns has-page-break-before"><div class="column is-12"></div></div>
    <b-collapse class="card mb-4" animation="slide" aria-id="causasDeInasistenciaDeAlumnos" :open="printable">
      <div slot="trigger" slot-scope="props" class="card-header py-1" role="button" aria-controls="causasDeInasistenciaDeAlumnos">
        <table class="table is-fullwidth has-no-background">
          <tbody>
            <tr>
              <td class="has-text-weight-bold has-text-primary is-uppercase">
                Causas de inasistencia de alumnos
              </td>
              <td class="w120 has-text-weight-bold has-text-secondary-bis is-uppercase w80 has-text-right opacity-6">Número</td>
              <td class="w40 has-text-right">
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
              <td class="w120 has-text-right">{{ schoolDataSet.studentAbsenceMainReasons['1'].text }}</td>
              <td class="w40"></td>
            </tr>
            <tr>
              <td>Los padres de familia no enviaron a sus hijos a la escuela</td>
              <td class="w120 has-text-right">{{ schoolDataSet.studentAbsenceMainReasons['2'].text }}</td>
              <td class="w40"></td>
            </tr>
            <tr>
              <td>Reportaron enfermos a los alumnos que no asistieron</td>
              <td class="w120 has-text-right">{{ schoolDataSet.studentAbsenceMainReasons['3'].text }}</td>
              <td class="w40"></td>
            </tr>
            <tr>
              <td>Se desconocen las causas</td>
              <td class="w120 has-text-right">{{ schoolDataSet.studentAbsenceMainReasons['4'].text }}</td>
              <td class="w40"></td>
            </tr>
            <tr>
              <td>Otras causas</td>
              <td class="w120 has-text-right">{{ schoolDataSet.studentAbsenceMainReasons['5'].text }}</td>
              <td class="w40"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-collapse>
    <b-collapse class="card mb-4" animation="slide" aria-id="causasDeInasistenciaDeDocentes" :open="printable">
      <div slot="trigger" slot-scope="props" class="card-header py-1" role="button" aria-controls="causasDeInasistenciaDeDocentes">
        <table class="table is-fullwidth has-no-background">
          <tbody>
            <tr>
              <td class="has-text-weight-bold has-text-primary is-uppercase">
                Causas de inasistencia de docentes
              </td>
              <td class="w120 has-text-weight-bold has-text-secondary-bis is-uppercase w80 has-text-right opacity-6">Número</td>
              <td class="w40 has-text-right">
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
              <td class="w120 has-text-right">{{ schoolDataSet.teacherAbsenceMainReasons['1'].text }}</td>
              <td class="w40"></td>
            </tr>
            <tr>
              <td>Se reportaron enfermos</td>
              <td class="w120 has-text-right">{{ schoolDataSet.teacherAbsenceMainReasons['2'].text }}</td>
              <td class="w40"></td>
            </tr>
            <tr>
              <td>No se sabe las causas</td>
              <td class="w120 has-text-right">{{ schoolDataSet.teacherAbsenceMainReasons['3'].text }}</td>
              <td class="w40"></td>
            </tr>
            <tr>
              <td>Otras causas</td>
              <td class="w120 has-text-right">{{ schoolDataSet.teacherAbsenceMainReasons['4'].text }}</td>
              <td class="w40"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-collapse>
    <b-collapse class="card mb-4" animation="slide" aria-id="causasDeInasistenciaDelPersonal" :open="printable">
      <div slot="trigger" slot-scope="props" class="card-header py-1" role="button" aria-controls="causasDeInasistenciaDelPersonal">
        <table class="table is-fullwidth has-no-background">
          <tbody>
            <tr>
              <td class="has-text-weight-bold has-text-primary is-uppercase">
                Causas de inasistencia del personal
              </td>
              <td class="w120 has-text-weight-bold has-text-secondary-bis is-uppercase w80 has-text-right opacity-6">Número</td>
              <td class="w40 has-text-right">
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
              <td class="w120 has-text-right">{{ schoolDataSet.adminAbsenceMainReasons['1'].text }}</td>
              <td class="w40"></td>
            </tr>
            <tr>
              <td>Se reportaron enfermos</td>
              <td class="w120 has-text-right">{{ schoolDataSet.adminAbsenceMainReasons['2'].text }}</td>
              <td class="w40"></td>
            </tr>
            <tr>
              <td>No se sabe las causas</td>
              <td class="w120 has-text-right">{{ schoolDataSet.adminAbsenceMainReasons['3'].text }}</td>
              <td class="w40"></td>
            </tr>
            <tr>
              <td>Otras causas</td>
              <td class="w120 has-text-right">{{ schoolDataSet.adminAbsenceMainReasons['4'].text }}</td>
              <td class="w40"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-collapse>
  </div>
</template>

<script lang="ts" src="./SchoolDetails.component.ts"></script>
