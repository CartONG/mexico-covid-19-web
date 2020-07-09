<template>
  <div>
    <div class="indicator-card card mb">
      <div class="card-content has-text-centered">
        <div class="content">
          <p class="has-text-tertiary has-text-weight-bold is-size-7">
            {{ schoolDataSet.name }}
          </p>
          <p class="has-text-secondary has-text-weight-bold">
            {{ schoolDataSet.id }}
          </p>
          <p class="has-text-primary is-uppercase has-text-weight-bold is-size-7">
            {{ schoolDataSet.level }}
          </p>
          <p class="has-text-grey is-capitalized has-text-weight-bold is-size-7">
            {{ schoolDataSet.turn }}
          </p>
          <p class="has-text-grey is-capitalized has-text-weight-bold is-size-7">
            {{ schoolDataSet.support }}
          </p>
        </div>
      </div>
    </div>
    <div class="indicator-card card mb">
      <header class="card-header">
        <p class="card-header-title has-text-grey">
          Tiene clases presenciales
        </p>
      </header>
      <div class="card-content has-text-centered">
        <p class="title has-text-secondary">
          {{ schoolDataSet.givesClasses.shortText }}
        </p>
      </div>
    </div>
    <div class="indicator-card card mb">
      <header class="card-header">
        <p class="card-header-title has-text-grey">
          Dispone de agua para el lavado de manos
        </p>
      </header>
      <div class="card-content has-text-centered">
        <p class="title has-text-secondary">
          {{ schoolDataSet.waterForHandWashing.shortText }}
        </p>
      </div>
    </div>
    <div class="indicator-card card mb">
      <header class="card-header">
        <p class="card-header-title has-text-grey">
          Dispone de jabón para el lavado de manos
        </p>
      </header>
      <div class="card-content has-text-centered">
        <p class="title has-text-secondary">
          {{ schoolDataSet.soapSufficiency.shortText }}
        </p>
      </div>
    </div>
    <div class="indicator-card card mb">
      <header class="card-header">
        <p class="card-header-title has-text-grey">
          Se alterna la asistencia de los alumnos
        </p>
      </header>
      <div class="card-content has-text-centered">
        <p class="title has-text-secondary">
          {{ schoolDataSet.alternatesAttendance }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./SchoolIndicators.component.ts"></script>
