<template>
  <div class="has-background-white card">
    <header class="card-header">
      <h2 class="card-header-title">Causas generales del total de inasistencia</h2>
    </header>
    <div class="card-content">
      <div class="columns is-mobile">
        <div class="column is-4 has-text-centered">
          <svg id="absence-details-chart" viewBox="0 0 150 150" perserveAspectRatio="xMinYMid meet"></svg>
        </div>
        <div class="column is-8">
          <table class="table">
            <tr>
              <td><i class="square-primary"></i></td>
              <td>La escuela no cuenta con instalaciones para el lavado de manos con agua y jabón</td>
              <td class="has-text-weight-bold has-text-centered has-text-secondary">{{ dataSet['1'].text }}</td>
            </tr>
            <tr>
              <td><i class="square-secondary"></i></td>
              <td>Los padres de familia no enviaron a sus hijos a la escuela</td>
              <td class="has-text-weight-bold has-text-centered has-text-secondary">{{ dataSet['2'].text }}</td>
            </tr>
            <tr>
              <td><i class="square-tertiary"></i></td>
              <td>Reportaron enfermos a los alumnos que no asistieron</td>
              <td class="has-text-weight-bold has-text-centered has-text-secondary">{{ dataSet['3'].text }}</td>
            </tr>
            <tr>
              <td><i class="square-grey"></i></td>
              <td>Se desconocen las causas</td>
              <td class="has-text-weight-bold has-text-centered has-text-secondary">{{ dataSet['4'].text }}</td>
            </tr>
            <tr>
              <td><i class="square-secondary-bis"></i></td>
              <td>Otras causas</td>
              <td class="has-text-weight-bold has-text-centered has-text-secondary">{{ dataSet['5'].text }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./AbsenceDetails.component.ts"></script>
