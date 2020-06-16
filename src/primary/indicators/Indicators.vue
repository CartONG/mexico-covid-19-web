<template>
  <div>
    <div class="indicator-card card mb">
      <header class="card-header">
        <p class="card-header-title has-text-grey">
          Total de escuelas
        </p>
      </header>
      <div class="card-content has-text-centered">
        <p :class="`title has-text-${indicatorsDataSet.schools.color}`">
          {{ indicatorsDataSet.schools.text }}
        </p>
      </div>
    </div>
    <div class="indicator-card card mb">
      <header class="card-header">
        <p class="card-header-title has-text-grey">
          Existencia de lavamanos en la escuela
        </p>
      </header>
      <div class="card-content has-text-centered">
        <p :class="`title has-text-${indicatorsDataSet.schools.color}`">
          {{ indicatorsDataSet.sinkSufficiencyPercentage.text }}
        </p>
      </div>
    </div>
    <div class="indicator-card card mb">
      <header class="card-header">
        <p class="card-header-title has-text-grey">
          Existencia de Jabón para lavado de manos
        </p>
      </header>
      <div class="card-content has-text-centered">
        <p :class="`title has-text-${indicatorsDataSet.schools.color}`">
          {{ indicatorsDataSet.soapSufficiencyPercentage.text }}
        </p>
      </div>
    </div>
    <div class="indicator-card card">
      <header class="card-header">
        <p class="card-header-title has-text-grey">
          La escuela puede reoganizar los espacios educativos
        </p>
      </header>
      <div class="card-content has-text-centered">
        <p :class="`title has-text-${indicatorsDataSet.schools.color}`">
          {{ indicatorsDataSet.abilityToReorganizeSpacePercentage.text }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./Indicators.component.ts"></script>
