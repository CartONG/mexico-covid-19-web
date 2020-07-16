<template>
  <div>
    <div class="has-background-white card mb-4">
      <header class="card-header">
        <h2 class="card-header-title">Motivo por el que la escuela no tiene clases presenciales</h2>
      </header>
      <div class="card-content px-0 py-0">
        <p v-if="schoolDataSet.givesClasses.shortText === 'Si'" class="px-2 py-2">No aplicable</p>
        <p v-else class="px-2 py-2">{{ schoolDataSet.givesClasses.longText }}</p>
      </div>
    </div>
    <div class="has-background-white card mb-4">
      <header class="card-header">
        <h2 class="card-header-title">Commentarios realizados por la escuela</h2>
      </header>
      <div class="card-content px-0 py-0">
        <p v-if="schoolDataSet.studentAbsenceOtherReason === ''" class="px-2 py-2">No aplicable</p>
        <p v-else class="px-2 py-2">{{ schoolDataSet.studentAbsenceOtherReason }}</p>
      </div>
    </div>
    <b-collapse class="card mb-4" animation="slide" aria-id="indiceDeAsistencia" :open="false">
      <div slot="trigger" slot-scope="props" class="card-header" role="button" aria-controls="indiceDeAsistencia">
        <h2 class="card-header-title">índice de asistencia</h2>
        <a class="card-header-icon"><b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon></a>
      </div>
      <div class="card-content px-0 py-0">
        <table class="table is-fullwidth has-no-background">
          <tbody>
            <tr>
              <td>Asistencia del alumnado</td>
              <td :class="`w80 has-text-centered has-text-${schoolDataSet.maleStudentAttendance.color}`">
                {{ schoolDataSet.maleStudentAttendance.text }}
              </td>
            </tr>
            <tr>
              <td>inasistencia de niñas sobre el total de inasistencias</td>
              <td :class="`w80 has-text-centered has-text-${schoolDataSet.femaleStudentAttendance.color}`">
                {{ schoolDataSet.maleStudentAttendance.text }}
              </td>
            </tr>
            <tr>
              <td>inasistencia de niños sobre el total de inasistencias</td>
              <td :class="`w80 has-text-centered has-text-${schoolDataSet.maleStudentAttendance.color}`">
                {{ schoolDataSet.maleStudentAttendance.text }}
              </td>
            </tr>
            <tr>
              <td>Asistencia de docentes</td>
              <td :class="`w80 has-text-centered has-text-${schoolDataSet.teacherAttendance.color}`">
                {{ schoolDataSet.teacherAttendance.text }}
              </td>
            </tr>
            <tr>
              <td>Asistencia de personal distinto a docentes</td>
              <td :class="`w80 has-text-centered has-text-${schoolDataSet.adminAttendance.color}`">
                {{ schoolDataSet.adminAttendance.text }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-collapse>
    <b-collapse class="card mb-4" animation="slide" aria-id="conditioneSsanitariasElementales" :open="false">
      <div slot="trigger" slot-scope="props" class="card-header" role="button" aria-controls="conditioneSsanitariasElementales">
        <h2 class="card-header-title">conditiones sanitarias elementales en la escuela</h2>
        <a class="card-header-icon"><b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon></a>
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
  </div>
  <!--
  <div class="has-background-white card">
    <header class="card-header">
      <H2 class="card-header-title">Información detallada</H2>
    </header>
    <div class="card-content">
      <h3 class="is-size-4 title has-text-weight-normal">Tasa de asistencia</h3>
      <table class="table is-fullwidth has-no-background">
        <tbody>
          <tr>
            <td>Alumnos</td>
            <td class="w80 has-text-centered">{{ schoolDataSet.maleStudentAttendance.text }}</td>
          </tr>
          <tr>
            <td>Alumnas</td>
            <td class="w80 has-text-centered">{{ schoolDataSet.femaleStudentAttendance.text }}</td>
          </tr>
          <tr>
            <td>Docentes</td>
            <td class="w80 has-text-centered">{{ schoolDataSet.teacherAttendance.text }}</td>
          </tr>
          <tr>
            <td>Personal</td>
            <td class="w80 has-text-centered">{{ schoolDataSet.adminAttendance.text }}</td>
          </tr>
        </tbody>
      </table>
      <hr />
      <h3 class="is-size-4 title has-text-weight-normal">Motivo por el que la escuela no tiene clases presenciales</h3>
      <div class="content">
        <p v-if="schoolDataSet.givesClasses.shortText === 'Si'">No aplicable</p>
        <p v-else>{{ schoolDataSet.givesClasses.longText }}</p>
      </div>
      <hr />
      <h3 class="is-size-4 title has-text-weight-normal">Organización escolar</h3>
      <h4 class="is-size-5 has-text-weight-bold">Escuelas que instalaron el filtro a cargo del comité de salud escolar</h4>
      <div class="content">
        <p>{{ schoolDataSet.hasHygieneCommittee }}</p>
      </div>
      <h4 class="is-size-5 has-text-weight-bold">Escuelas que alternan la asistencia de sus alumnas (os)</h4>
      <div class="content">
        <p>{{ schoolDataSet.alternatesAttendance }}</p>
      </div>
      <h4 class="is-size-5 has-text-weight-bold">Escuelas que pueden reorganizar los espacios para facilitar la sana distancia</h4>
      <div class="content">
        <p>{{ schoolDataSet.hasAbilityToReorganizeSpace }}</p>
      </div>
      <hr />
      <h3 class="is-size-4 title has-text-weight-normal">Condiciones sanitarias elementales en las escuelas</h3>
      <h4 class="is-size-5 has-text-weight-bold">Abastecimiento de agua</h4>
      <div class="content">
        <p>{{ schoolDataSet.waterSupply }}</p>
      </div>
      <h4 class="is-size-5 has-text-weight-bold">Frecuencia del abastecimiento de agua</h4>
      <div class="content">
        <p>{{ schoolDataSet.waterServiceContinuity }}</p>
      </div>
      <h4 class="is-size-5 has-text-weight-bold">Disponibilidad de agua para el lavado frecuente de manos</h4>
      <div class="content">
        <p>{{ schoolDataSet.waterForHandWashing.longText }}</p>
      </div>
      <h4 class="is-size-5 has-text-weight-bold">Disponibilidad de lavamanos</h4>
      <div class="content">
        <p>{{ schoolDataSet.sinkSufficiency }}</p>
      </div>
      <h4 class="is-size-5 has-text-weight-bold">Disponibilidad de jabón para el lavado de manos</h4>
      <div class="content">
        <p>{{ schoolDataSet.soapSufficiency.longText }}</p>
      </div>
      <h4 class="is-size-5 has-text-weight-bold">Disponibilidad de toallas para el secado de manos (papel o tela)</h4>
      <div class="content">
        <p>{{ schoolDataSet.towelSufficiency }}</p>
      </div>
      <h4 class="is-size-5 has-text-weight-bold">Disponibilidad de alcohol en gel al 70%</h4>
      <div class="content">
        <p>{{ schoolDataSet.sanitizerSufficiency }}</p>
      </div>
      <h4 class="is-size-5 has-text-weight-bold">Disponibilidad de botes de basura</h4>
      <div class="content">
        <p>{{ schoolDataSet.binSufficiency }}</p>
      </div>
      <h4 class="is-size-5 has-text-weight-bold">Existencia de drenaje</h4>
      <div class="content">
        <p>{{ schoolDataSet.hasSepticSystem }}</p>
      </div>
    </div>
  </div>
  -->
</template>

<script lang="ts" src="./SchoolDetails.component.ts"></script>
