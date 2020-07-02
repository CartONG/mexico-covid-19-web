<template>
  <div class="absence-reasons-details has-background-white card">
    <header class="card-header">
      <p class="card-header-title has-text-primary">Causas generales del total de inasistencia</p>
    </header>
    <div class="card-content">
      <div class="columns">
        <div class="column is-5 has-text-centered">
          <svg
            v-show="absenceReasonsDetailsDataSet"
            id="absence-reasons-details-chart"
            viewBox="0 0 150 150"
            perserveAspectRatio="xMinYMid meet"
          ></svg>
          <div v-show="!absenceReasonsDetailsDataSet" class="has-text-grey">
            No se han encontrado resultados
          </div>
        </div>
        <div class="column is-7">
          <div class="legend-item">
            <div class="legend-box has-background-primary"></div>
            <p class="is-inline has-text-justified">La escuela no cuenta con instalaciones para el lavado de manos con agua y jabón</p>
          </div>
          <div class="legend-item">
            <div class="legend-box has-background-secondary"></div>
            <p class="is-inline has-text-justified">Los padres de familia no enviaron a sus hijos a la escuela</p>
          </div>
          <div class="legend-item">
            <div class="legend-box  has-background-quaternary"></div>
            <p class="is-inline has-text-justified">Reportaron enfermos a los alumnos que no asistieron</p>
          </div>
          <div class="legend-item">
            <div class="legend-box has-background-quinary"></div>
            <p class="is-inline has-text-justified">Se desconocen las causas</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./AbsenceReasonsDetails.component.ts"></script>
