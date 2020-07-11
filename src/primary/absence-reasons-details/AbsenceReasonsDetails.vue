<template>
  <div class="absence-reasons-details has-background-white card">
    <header class="card-header">
      <h2 class="card-header-title">Causas generales del total de inasistencia</h2>
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
              <td class="has-text-weight-bold has-text-centered has-text-secondary">{{ dataSet['1'].text }}</td>
            </tr>
            <tr>
              <td><div class="legend-box has-background-secondary"></div></td>
              <td>Los padres de familia no enviaron a sus hijos a la escuela</td>
              <td class="has-text-weight-bold has-text-centered has-text-secondary">{{ dataSet['2'].text }}</td>
            </tr>
            <tr>
              <td><div class="legend-box has-background-tertiary"></div></td>
              <td>Reportaron enfermos a los alumnos que no asistieron</td>
              <td class="has-text-weight-bold has-text-centered has-text-secondary">{{ dataSet['3'].text }}</td>
            </tr>
            <tr>
              <td><div class="legend-box has-background-grey-lighter"></div></td>
              <td>Se desconocen las causas</td>
              <td class="has-text-weight-bold has-text-centered has-text-secondary">{{ dataSet['4'].text }}</td>
            </tr>
            <tr>
              <td><div class="legend-box has-background-secondary-bis"></div></td>
              <td>Otras causas</td>
              <td class="has-text-weight-bold has-text-centered has-text-secondary">{{ dataSet['5'].text }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./AbsenceReasonsDetails.component.ts"></script>
