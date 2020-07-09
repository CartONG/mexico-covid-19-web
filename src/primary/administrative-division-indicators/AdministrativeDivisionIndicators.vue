<template>
  <div>
    <div class="indicator-card card mb">
      <header class="card-header">
        <p class="card-header-title has-text-grey">
          Total de escuelas
        </p>
      </header>
      <div class="card-content has-text-centered">
        <p :class="`title has-text-${administrativeDivisionDataSet.schools === '-' ? 'unknown' : 'secondary'}`">
          {{ administrativeDivisionDataSet.schools }}
        </p>
      </div>
    </div>
    <div class="indicator-card card mb">
      <header class="card-header">
        <p class="card-header-title has-text-grey">
          Escuelas con clases presenciales
        </p>
      </header>
      <div class="card-content has-text-centered">
        <p :class="`title has-text-${administrativeDivisionDataSet.schoolGivingClasses['1'].color}`">
          {{ administrativeDivisionDataSet.schoolGivingClasses['1'].text }}
        </p>
      </div>
    </div>
    <div class="indicator-card card mb">
      <header class="card-header">
        <p class="card-header-title has-text-grey">
          Escuelas con disposición de agua para el lavado de manos
        </p>
      </header>
      <div class="card-content has-text-centered">
        <p :class="`title has-text-${administrativeDivisionDataSet.schoolWithWaterForHandWashing['1'].color}`">
          {{ administrativeDivisionDataSet.schoolWithWaterForHandWashing['1'].text }}
        </p>
      </div>
    </div>
    <div class="indicator-card card mb">
      <header class="card-header">
        <p class="card-header-title has-text-grey">
          Escuelas con disposición de jabón para el lavado de manos
        </p>
      </header>
      <div class="card-content has-text-centered">
        <p :class="`title has-text-${administrativeDivisionDataSet.schoolSoapSufficiency['1'].color}`">
          {{ administrativeDivisionDataSet.schoolSoapSufficiency['1'].text }}
        </p>
      </div>
    </div>
    <div class="indicator-card card mb">
      <header class="card-header">
        <p class="card-header-title has-text-grey">
          Escuelas que alternan la asistencia de sus alumnos
        </p>
      </header>
      <div class="card-content has-text-centered">
        <p :class="`title has-text-${administrativeDivisionDataSet.alternatesAttendance['1'].color}`">
          {{ administrativeDivisionDataSet.alternatesAttendance['1'].text }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./AdministrativeDivisionIndicators.component.ts"></script>
