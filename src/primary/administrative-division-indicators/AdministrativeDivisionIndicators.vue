<template>
  <div>
    <div class="indicator-card card mb px-2 py-1">
      <header class="card-header">
        <p class="has-text-grey is-size-7 has-text-left has-text-weight-bold">
          Total de escuelas
        </p>
      </header>
      <div class="card-content has-text-centered">
        <img src="/university.svg" alt="escuela" />
        <p :class="`has-text-${administrativeDivisionDataSet.schools === '-' ? 'unknown' : 'secondary'} is-size-1 has-text-weight-bold`">
          {{ administrativeDivisionDataSet.schools }}
        </p>
        <p class="has-text-primary is-uppercase has-text-weight-bold is-size-7">
          escuelas
        </p>
      </div>
    </div>
    <div class="indicator-card card mb px-2 py-1">
      <header class="card-header">
        <p class="has-text-grey is-size-7 has-text-left has-text-weight-bold">
          Escuelas con clases presenciales
        </p>
      </header>
      <div class="card-content">
        <img src="/desk-copy.svg" alt="despacho" class="is-pulled-left is-absolute" />
        <p :class="`title has-text-${administrativeDivisionDataSet.schoolGivingClasses['1'].color} has-text-centered is-size-2`">
          {{ administrativeDivisionDataSet.schoolGivingClasses['1'].text }}
        </p>
      </div>
    </div>
    <div class="indicator-card card mb px-2 py-1">
      <header class="card-header">
        <p class="has-text-grey is-size-7 has-text-left has-text-weight-bold">
          Escuelas con disposición de agua para el lavado de manos
        </p>
      </header>
      <div class="card-content">
        <img src="/wudu.svg" alt="lavamano" class="is-pulled-left is-absolute" />
        <p :class="`title has-text-${administrativeDivisionDataSet.schoolWithWaterForHandWashing['1'].color} has-text-centered is-size-2`">
          {{ administrativeDivisionDataSet.schoolWithWaterForHandWashing['1'].text }}
        </p>
      </div>
    </div>
    <div class="indicator-card card mb px-2 py-1">
      <header class="card-header">
        <p class="has-text-grey is-size-7 has-text-left has-text-weight-bold">
          Escuelas con disposición de jabón para el lavado de manos
        </p>
      </header>
      <div class="card-content">
        <img src="/hand-sanitizer.svg" alt="jabón" class="is-pulled-left is-absolute" />
        <p :class="`title has-text-${administrativeDivisionDataSet.schoolSoapSufficiency['1'].color} has-text-centered is-size-2`">
          {{ administrativeDivisionDataSet.schoolSoapSufficiency['1'].text }}
        </p>
      </div>
    </div>
    <div class="indicator-card card mb px-2 py-1">
      <header class="card-header">
        <p class="has-text-grey is-size-7 has-text-left has-text-weight-bold">
          Escuelas que alternan la asistencia de sus alumnos
        </p>
      </header>
      <div class="card-content">
        <img src="/desk.svg" alt="despacho" class="is-pulled-left is-absolute" />
        <p :class="`title has-text-${administrativeDivisionDataSet.alternatesAttendance['1'].color} has-text-centered is-size-2`">
          {{ administrativeDivisionDataSet.alternatesAttendance['1'].text }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./AdministrativeDivisionIndicators.component.ts"></script>
