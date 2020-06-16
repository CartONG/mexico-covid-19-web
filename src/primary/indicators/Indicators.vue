<template>
  <div>
    <div class="indicator-card card mb">
      <header class="card-header">
        <p class="card-header-title has-text-grey">
          {{ indicatorsDataSet.school.label }}
        </p>
      </header>
      <div class="card-content has-text-centered">
        <p :class="`title has-text-${indicatorsDataSet.school.color}`">
          {{ indicatorsDataSet.school.text }}
        </p>
      </div>
    </div>
    <div class="indicator-card card mb">
      <header class="card-header">
        <p class="card-header-title has-text-grey">
          {{ indicatorsDataSet.sinkSufficiency.label }}
        </p>
      </header>
      <div class="card-content has-text-centered">
        <p :class="`title has-text-${indicatorsDataSet.school.color}`">
          {{ indicatorsDataSet.sinkSufficiency.text }}
        </p>
      </div>
    </div>
    <div class="indicator-card card mb">
      <header class="card-header">
        <p class="card-header-title has-text-grey">
          {{ indicatorsDataSet.soapSufficiency.label }}
        </p>
      </header>
      <div class="card-content has-text-centered">
        <p :class="`title has-text-${indicatorsDataSet.school.color}`">
          {{ indicatorsDataSet.soapSufficiency.text }}
        </p>
      </div>
    </div>
    <div class="indicator-card card">
      <header class="card-header">
        <p class="card-header-title has-text-grey">
          {{ indicatorsDataSet.abilityToReorganizeSpace.label }}
        </p>
      </header>
      <div class="card-content has-text-centered">
        <p :class="`title has-text-${indicatorsDataSet.school.color}`">
          {{ indicatorsDataSet.abilityToReorganizeSpace.text }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./Indicators.component.ts"></script>
