<template>
  <div class="has-background-white card">
    <header class="card-header">
      <h2 class="card-header-title has-text-primary">Información detallada</h2>
    </header>
    <div class="card-content">
      <h3 class="is-size-4 title has-text-weight-normal">Tasa de asistencia</h3>
      <table class="table is-fullwidth has-no-background">
        <tbody>
          <tr>
            <td>Alumnos</td>
            <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.maleStudentAttendance.text }}</td>
          </tr>
          <tr>
            <td>Alumnas</td>
            <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.femaleStudentAttendance.text }}</td>
          </tr>
          <tr>
            <td>Docentes</td>
            <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.teacherAttendance.text }}</td>
          </tr>
          <tr>
            <td>Personal</td>
            <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.adminAttendance.text }}</td>
          </tr>
        </tbody>
      </table>
      <hr />
      <h3 class="is-size-4 title has-text-weight-normal">
        Principales motivos de escuelas sin clases presenciales en regiones con semáforo verde
      </h3>
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
      <hr />
      <h3 class="is-size-4 has-text-weight-normal">Organización escolar</h3>
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
      <hr />
      <h3 class="is-size-4 title has-text-weight-normal">Condiciones sanitarias elementales en las escuelas</h3>
      <h4 class="is-size-5 has-text-weight-bold">Abastecimiento de agua</h4>
      <table class="table is-fullwidth has-no-background">
        <tbody>
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
        </tbody>
      </table>
      <h4 class="is-size-5 has-text-weight-bold">Frecuencia del abastecimiento de agua</h4>
      <table class="table is-fullwidth has-no-background">
        <tbody>
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
        </tbody>
      </table>
      <h4 class="is-size-5 has-text-weight-bold">Disponibilidad de agua para el lavado frecuente de manos</h4>
      <table class="table is-fullwidth has-no-background">
        <tbody>
          <tr>
            <td>Cuenta con agua para el lavado de manos</td>
            <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.schoolWithWaterForHandWashing['1'].text }}</td>
          </tr>
          <tr>
            <td>No cuenta con agua para lavado de manos</td>
            <td class="w80 has-text-centered">{{ administrativeDivisionDataSet.schoolWithWaterForHandWashing['2'].text }}</td>
          </tr>
        </tbody>
      </table>
      <h4 class="is-size-5 has-text-weight-bold">Disponibilidad de lavamanos</h4>
      <table class="table is-fullwidth has-no-background">
        <tbody>
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
        </tbody>
      </table>
      <h4 class="is-size-5 has-text-weight-bold">Disponibilidad de jabón para el lavado de manos</h4>
      <table class="table is-fullwidth has-no-background">
        <tbody>
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
        </tbody>
      </table>
      <h4 class="is-size-5 has-text-weight-bold">Disponibilidad de toallas para el secado de manos (papel o tela)</h4>
      <table class="table is-fullwidth has-no-background">
        <tbody>
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
        </tbody>
      </table>
      <h4 class="is-size-5 has-text-weight-bold">Disponibilidad de alcohol en gel al 70%</h4>
      <table class="table is-fullwidth has-no-background">
        <tbody>
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
        </tbody>
      </table>
      <h4 class="is-size-5 has-text-weight-bold">Disponibilidad de botes de basura</h4>
      <table class="table is-fullwidth has-no-background">
        <tbody>
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
        </tbody>
      </table>
      <h4 class="is-size-5 has-text-weight-bold">Existencia de drenaje</h4>
      <table class="table is-fullwidth has-no-background">
        <tbody>
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
  </div>
</template>

<script lang="ts" src="./AdministrativeDivisionDetails.component.ts"></script>
