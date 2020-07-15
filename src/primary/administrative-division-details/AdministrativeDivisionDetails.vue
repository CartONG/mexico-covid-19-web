<template>
  <div>
    <b-collapse class="card mb-4" animation="slide" aria-id="tasaDeAsistencia" open>
      <div slot="trigger" slot-scope="props" class="card-header" role="button" aria-controls="tasaDeAsistencia">
        <h2 class="card-header-title">Tasa de asistencia</h2>
        <a class="card-header-icon"><b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon></a>
      </div>
      <div class="card-content px-0 py-0">
        <table class="table is-fullwidth has-no-background">
          <tbody>
            <tr>
              <td>Alumnos</td>
              <td :class="`w80 has-text-centered has-text-${administrativeDivisionDataSet.maleStudentAttendance.color}`">
                {{ administrativeDivisionDataSet.maleStudentAttendance.text }}
              </td>
            </tr>
            <tr>
              <td>Alumnas</td>
              <td :class="`w80 has-text-centered has-text-${administrativeDivisionDataSet.femaleStudentAttendance.color}`">
                {{ administrativeDivisionDataSet.femaleStudentAttendance.text }}
              </td>
            </tr>
            <tr>
              <td>Docentes</td>
              <td :class="`w80 has-text-centered has-text-${administrativeDivisionDataSet.teacherAttendance.color}`">
                {{ administrativeDivisionDataSet.teacherAttendance.text }}
              </td>
            </tr>
            <tr>
              <td>Personal</td>
              <td :class="`w80 has-text-centered has-text-${administrativeDivisionDataSet.adminAttendance.color}`">
                {{ administrativeDivisionDataSet.adminAttendance.text }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-collapse>
    <b-collapse class="card mb-4" animation="slide" aria-id="principaleMotivosDeEscuelasSinClasesPresenciales" :open="false">
      <div
        slot="trigger"
        slot-scope="props"
        class="card-header"
        role="button"
        aria-controls="principaleMotivosDeEscuelasSinClasesPresenciales"
      >
        <h2 class="card-header-title">Principales motivos de escuelas sin clases presenciales en regiones con semáforo verde</h2>
        <a class="card-header-icon"><b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon></a>
      </div>
      <div class="card-content px-0 py-0">
        <table class="table is-fullwidth has-no-background">
          <tbody>
            <tr>
              <td>Se está realizando la limpieza de espacios y mobiliario para poder iniciar con las clases</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.schoolGivingClasses['2'].text }}</td>
            </tr>
            <tr>
              <td>Existe la confirmación de al menos un caso de COVID-19 en la escuela</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.schoolGivingClasses['3'].text }}</td>
            </tr>
            <tr>
              <td>La Autoridad Educativa Local determinó continuar con la suspensión de clases</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.schoolGivingClasses['4'].text }}</td>
            </tr>
            <tr>
              <td>La comunidad escolar determinó continuar con la suspensión de clases</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.schoolGivingClasses['5'].text }}</td>
            </tr>
            <tr>
              <td>El personal de la escuela decidió continuar con la suspensión de clases</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.schoolGivingClasses['6'].text }}</td>
            </tr>
            <tr>
              <td>Los padres de familia informaron que no enviarán a sus hijos a la escuela</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.schoolGivingClasses['7'].text }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-collapse>
    <b-collapse class="card mb-4" animation="slide" aria-id="organizaciónEscolar" :open="false">
      <div slot="trigger" slot-scope="props" class="card-header" role="button" aria-controls="organizaciónEscolar">
        <h2 class="card-header-title">Organización escolar</h2>
        <a class="card-header-icon"><b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon></a>
      </div>
      <div class="card-content px-0 py-0">
        <table class="table is-fullwidth has-no-background">
          <tbody>
            <tr>
              <td>Escuelas que instalaron el filtro a cargo del comité de salud escolar</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.hygieneCommittee['1'].text }}</td>
            </tr>
            <tr>
              <td>Escuelas que alternan la asistencia de sus alumnas (os)</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.alternatesAttendance['1'].text }}</td>
            </tr>
            <tr>
              <td>Escuelas que pueden reorganizar los espacios para facilitar la sana distancia</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.schoolWithAbilityToReorganizeSpace['1'].text }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-collapse>
    <b-collapse class="card mb-4" animation="slide" aria-id="condicionesSanitariasElementales" :open="false">
      <div slot="trigger" slot-scope="props" class="card-header" role="button" aria-controls="condicionesSanitariasElementales">
        <h2 class="card-header-title">Condiciones sanitarias elementales en las escuelas</h2>
        <a class="card-header-icon"><b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon></a>
      </div>
      <div class="card-content px-0 py-0">
        <table class="table is-fullwidth has-no-background">
          <tbody>
            <tr>
              <td class="is-uppercase has-text-secondary-bis has-text-weight-bold">Abastecimiento de agua</td>
              <td></td>
            </tr>
            <tr>
              <td>Red municipal de agua potable</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.schoolWaterSupply['1'].text }}</td>
            </tr>
            <tr>
              <td>Abastecimiento a través de pipas</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.schoolWaterSupply['2'].text }}</td>
            </tr>
            <tr>
              <td>Otra fuente (pozo, río, lago, etc.)</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.schoolWaterSupply['3'].text }}</td>
            </tr>
            <tr>
              <td>No cuenta con ningún tipo de abastecimiento</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.schoolWaterSupply['4'].text }}</td>
            </tr>
            <tr>
              <td class="is-uppercase has-text-secondary-bis has-text-weight-bold">Frecuencia del abastecimiento de agua</td>
              <td></td>
            </tr>
            <tr>
              <td>Todos los días</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.schoolWaterServiceContinuity['1'].text }}</td>
            </tr>
            <tr>
              <td>De 2 a 4 días a la semana</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.schoolWaterServiceContinuity['2'].text }}</td>
            </tr>
            <tr>
              <td>Una sola vez por semana</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.schoolWaterServiceContinuity['3'].text }}</td>
            </tr>
            <tr>
              <td>No cuenta con servicio de agua</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.schoolWaterServiceContinuity['4'].text }}</td>
            </tr>
            <tr>
              <td class="is-uppercase has-text-secondary-bis has-text-weight-bold">
                Disponibilidad de agua para el lavado frecuente de manos
              </td>
              <td></td>
            </tr>
            <tr>
              <td>Cuenta con agua para el lavado de manos</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.schoolWithWaterForHandWashing['1'].text }}</td>
            </tr>
            <tr>
              <td>No cuenta con agua para lavado de manos</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.schoolWithWaterForHandWashing['2'].text }}</td>
            </tr>
            <tr>
              <td class="is-uppercase has-text-secondary-bis has-text-weight-bold">
                Disponibilidad de lavamanos
              </td>
              <td></td>
            </tr>
            <tr>
              <td>Cuenta con suficientes lavamanos</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.schoolSinkSufficiency['1'].text }}</td>
            </tr>
            <tr>
              <td>No cuenta con suficientes lavamanos</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.schoolSinkSufficiency['2'].text }}</td>
            </tr>
            <tr>
              <td>No cuenta</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.schoolSinkSufficiency['3'].text }}</td>
            </tr>
            <tr>
              <td class="is-uppercase has-text-secondary-bis has-text-weight-bold">
                Disponibilidad de jabón para el lavado de manos
              </td>
              <td></td>
            </tr>
            <tr>
              <td>Cuenta con suficiente jabón</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.schoolSoapSufficiency['1'].text }}</td>
            </tr>
            <tr>
              <td>No cuenta con suficiente jabón</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.schoolSoapSufficiency['2'].text }}</td>
            </tr>
            <tr>
              <td>No cuenta</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.schoolSoapSufficiency['3'].text }}</td>
            </tr>
            <tr>
              <td class="is-uppercase has-text-secondary-bis has-text-weight-bold">
                Disponibilidad de toallas para el secado de manos (papel o tela)
              </td>
              <td></td>
            </tr>
            <tr>
              <td>Cuenta con suficientes toallas</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.schoolTowelSufficiency['1'].text }}</td>
            </tr>
            <tr>
              <td>No cuenta con suficientes toallas</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.schoolTowelSufficiency['2'].text }}</td>
            </tr>
            <tr>
              <td>No cuenta</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.schoolTowelSufficiency['3'].text }}</td>
            </tr>
            <tr>
              <td class="is-uppercase has-text-secondary-bis has-text-weight-bold">
                Disponibilidad de alcohol en gel al 70%
              </td>
              <td></td>
            </tr>
            <tr>
              <td>Cuenta con suficiente alcohol en gel</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.schoolSanitizerSufficiency['1'].text }}</td>
            </tr>
            <tr>
              <td>No cuenta con suficiente alcohol en gel</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.schoolSanitizerSufficiency['2'].text }}</td>
            </tr>
            <tr>
              <td>No cuenta</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.schoolSanitizerSufficiency['3'].text }}</td>
            </tr>
            <tr>
              <td class="is-uppercase has-text-secondary-bis has-text-weight-bold">
                Disponibilidad de botes de basura
              </td>
              <td></td>
            </tr>
            <tr>
              <td>Cuenta con suficientes botes de basura</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.schoolBinSufficiency['1'].text }}</td>
            </tr>
            <tr>
              <td>No cuenta con suficientes botes de basura</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.schoolBinSufficiency['2'].text }}</td>
            </tr>
            <tr>
              <td>No cuenta</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.schoolBinSufficiency['3'].text }}</td>
            </tr>
            <tr>
              <td class="is-uppercase has-text-secondary-bis has-text-weight-bold">
                Existencia de drenaje
              </td>
              <td></td>
            </tr>
            <tr>
              <td>Cuenta con Red de drenaje, fosa séptica para desalojo de aguas</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.schoolWithSepticSystem['1'].text }}</td>
            </tr>
            <tr>
              <td>No cuenta con Red de drenaje, fosa séptica para desalojo de aguas</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.schoolWithSepticSystem['2'].text }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-collapse>
    <b-collapse class="card mb-4" animation="slide" aria-id="estadísticasBásicasDelPersonal" :open="false">
      <div slot="trigger" slot-scope="props" class="card-header" role="button" aria-controls="estadísticasBásicasDelPersonal">
        <h2 class="card-header-title">Estadísticas básicas del personal</h2>
        <a class="card-header-icon"><b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon></a>
      </div>
      <div class="card-content px-0 py-0">
        <table class="table is-fullwidth has-no-background">
          <tbody>
            <tr>
              <td>Docentes</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.teachers }}</td>
            </tr>
            <tr>
              <td>Director</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.directors }}</td>
            </tr>
            <tr>
              <td>Subdirector</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.subDirectors }}</td>
            </tr>
            <tr>
              <td>Atps</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.technicalPedagogicalAdvisers }}</td>
            </tr>
            <tr>
              <td>Educfis</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.physicalEducationTeachers }}</td>
            </tr>
            <tr>
              <td>Admin</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.admins }}</td>
            </tr>
            <tr>
              <td>Intenden</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.quartermasters }}</td>
            </tr>
            <tr>
              <td>Otros</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.others }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-collapse>
    <b-collapse class="card mb-4" animation="slide" aria-id="causasDeInasistenciaDeAlumnos" :open="false">
      <div slot="trigger" slot-scope="props" class="card-header" role="button" aria-controls="causasDeInasistenciaDeAlumnos">
        <h2 class="card-header-title">Causas de inasistencia de alumnos</h2>
        <a class="card-header-icon"><b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon></a>
      </div>
      <div class="card-content px-0 py-0">
        <table class="table is-fullwidth has-no-background">
          <tbody>
            <tr>
              <td>La escuela no cuenta con instalaciones para el lavado de manos con agua y jabón</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.studentAbsenceMainReasons['1'].text }}</td>
            </tr>
            <tr>
              <td>Los padres de familia no enviaron a sus hijos a la escuela</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.studentAbsenceMainReasons['2'].text }}</td>
            </tr>
            <tr>
              <td>Reportaron enfermos a los alumnos que no asistieron</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.studentAbsenceMainReasons['3'].text }}</td>
            </tr>
            <tr>
              <td>Se desconocen las causas</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.studentAbsenceMainReasons['4'].text }}</td>
            </tr>
            <tr>
              <td>Otras causas</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.studentAbsenceMainReasons['5'].text }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-collapse>
    <b-collapse class="card mb-4" animation="slide" aria-id="causasDeInasistenciaDeDocentes" :open="false">
      <div slot="trigger" slot-scope="props" class="card-header" role="button" aria-controls="causasDeInasistenciaDeDocentes">
        <h2 class="card-header-title">Causas de inasistencia de docentes</h2>
        <a class="card-header-icon"><b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon></a>
      </div>
      <div class="card-content px-0 py-0">
        <table class="table is-fullwidth has-no-background">
          <tbody>
            <tr>
              <td>La escuela no cuenta con instalaciones para el lavado de manos con agua y jabón</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.teacherAbsenceMainReasons['1'].text }}</td>
            </tr>
            <tr>
              <td>Se reportaron enfermos</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.teacherAbsenceMainReasons['2'].text }}</td>
            </tr>
            <tr>
              <td>No se sabe las causas</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.teacherAbsenceMainReasons['3'].text }}</td>
            </tr>
            <tr>
              <td>Otras causas</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.teacherAbsenceMainReasons['4'].text }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-collapse>
    <b-collapse class="card mb-4" animation="slide" aria-id="causasDeInasistenciaDelPersonal" :open="false">
      <div slot="trigger" slot-scope="props" class="card-header" role="button" aria-controls="causasDeInasistenciaDelPersonal">
        <h2 class="card-header-title">Causas de inasistencia del personal</h2>
        <a class="card-header-icon"><b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon></a>
      </div>
      <div class="card-content px-0 py-0">
        <table class="table is-fullwidth has-no-background">
          <tbody>
            <tr>
              <td>La escuela no cuenta con instalaciones para el lavado de manos con agua y jabón</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.adminsAbsenceMainReasons['1'].text }}</td>
            </tr>
            <tr>
              <td>Se reportaron enfermos</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.adminsAbsenceMainReasons['2'].text }}</td>
            </tr>
            <tr>
              <td>No se sabe las causas</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.adminsAbsenceMainReasons['3'].text }}</td>
            </tr>
            <tr>
              <td>Otras causas</td>
              <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.adminsAbsenceMainReasons['4'].text }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </b-collapse>
  </div>
</template>

<script lang="ts" src="./AdministrativeDivisionDetails.component.ts"></script>
