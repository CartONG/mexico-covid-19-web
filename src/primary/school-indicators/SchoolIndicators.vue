<template>
  <div>
    <div class="indicator-card card mb-4">
      <div class="card-content has-text-centered">
        <img src="/university.svg" alt="escuela" class="mb-1" />
        <p class="has-text-secondary-bis has-text-weight-bold is-size-7 is-uppercase">
          {{ schoolDataSet.name }}
        </p>
        <p class="has-text-secondary has-text-weight-bold is-size-3 mb-2">
          {{ schoolDataSet.id }}
        </p>
        <p class="has-text-primary is-uppercase has-text-weight-bold is-size-7">
          {{ schoolDataSet.level }}
        </p>
        <p class="has-text-grey is-capitalized has-text-weight-bold is-size-6">
          {{ schoolDataSet.turn }}
        </p>
        <p class="has-text-grey is-capitalized has-text-weight-bold is-size-6">
          {{ schoolDataSet.support }}
        </p>
      </div>
    </div>
    <div class="indicator-card card mb-3 px-2 py-1">
      <header class="card-header">
        <p class="has-text-grey is-size-7 has-text-left has-text-weight-bold">
          Tiene clases presenciales
        </p>
      </header>
      <div class="card-content">
        <img src="/desk-copy.svg" alt="despacho" class="is-pulled-left is-absolute" />
        <p class="title has-text-secondary has-text-centered is-size-2">
          {{ schoolDataSet.givesClasses.shortText }}
        </p>
      </div>
    </div>
    <div class="indicator-card card mb-3 px-2 py-1">
      <header class="card-header">
        <p class="has-text-grey is-size-7 has-text-left has-text-weight-bold">
          Dispone de agua para el lavado de manos
        </p>
      </header>
      <div class="card-content">
        <img src="/wudu.svg" alt="lavamano" class="is-pulled-left is-absolute" />
        <p class="title has-text-secondary has-text-centered is-size-2">
          {{ schoolDataSet.waterForHandWashing.shortText }}
        </p>
      </div>
    </div>
    <div class="indicator-card card mb-3 px-2 py-1">
      <header class="card-header">
        <p class="has-text-grey is-size-7 has-text-left has-text-weight-bold">
          Dispone de jabón para el lavado de manos
        </p>
      </header>
      <div class="card-content">
        <img src="/hand-sanitizer.svg" alt="jabón" class="is-pulled-left is-absolute" />
        <p class="title has-text-secondary has-text-centered is-size-2">
          {{ schoolDataSet.soapSufficiency.shortText }}
        </p>
      </div>
    </div>
    <div class="indicator-card card px-2 py-1">
      <header class="card-header">
        <p class="has-text-grey is-size-7 has-text-left has-text-weight-bold">
          Se alterna la asistencia de los alumnos
        </p>
      </header>
      <div class="card-content">
        <img src="/desk.svg" alt="despacho" class="is-pulled-left is-absolute" />
        <p class="title has-text-secondary has-text-centered is-size-2">
          {{ schoolDataSet.alternatesAttendance }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./SchoolIndicators.component.ts"></script>
