<template>
  <div class="absence-reasons-details has-background-white card">
    <header class="card-header">
      <p class="card-header-title has-text-primary">Causas generales del total de inasistencia</p>
    </header>
    <div class="card-content">
      <div class="columns is-mobile">
        <div class="column is-5 has-text-centered">
          <svg id="absence-reasons-details-chart" viewBox="0 0 150 150" perserveAspectRatio="xMinYMid meet"></svg>
        </div>
        <div class="column is-7">
          <table class="table">
            <tr>
              <td><div class="legend-box has-background-primary"></div></td>
              <td>La escuela no cuenta con instalaciones para el lavado de manos con agua y jabón</td>
              <td class="has-text-weight-bold has-text-centered">{{ dataSet['1'].text }}</td>
            </tr>
            <tr>
              <td><div class="legend-box has-background-secondary"></div></td>
              <td>Los padres de familia no enviaron a sus hijos a la escuela</td>
              <td class="has-text-weight-bold has-text-centered">{{ dataSet['2'].text }}</td>
            </tr>
            <tr>
              <td><div class="legend-box has-background-quaternary"></div></td>
              <td>Reportaron enfermos a los alumnos que no asistieron</td>
              <td class="has-text-weight-bold has-text-centered">{{ dataSet['3'].text }}</td>
            </tr>
            <tr>
              <td><div class="legend-box has-background-quinary"></div></td>
              <td>Se desconocen las causas</td>
              <td class="has-text-weight-bold has-text-centered">{{ dataSet['4'].text }}</td>
            </tr>
            <tr>
              <td><div class="legend-box has-background-senary"></div></td>
              <td>Otras causas</td>
              <td class="has-text-weight-bold has-text-centered">{{ dataSet['5'].text }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./AbsenceReasonsDetails.component.ts"></script>
