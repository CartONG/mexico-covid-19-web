<template>
  <div class="has-background-white card">
    <header class="card-header">
      <p class="card-header-title has-text-primary">Información detallada</p>
    </header>
    <div class="card-content">
      <h3 class="is-size-4 title has-text-weight-normal">Condiciones sanitarias elementales en las escuelas</h3>
      <h4 class="is-size-5 has-text-weight-bold">Abastecimiento de agua</h4>
      <div class="content">
        <p>{{ schoolDataSet.waterSupply }}</p>
      </div>
      <h4 class="is-size-5 has-text-weight-bold">Frecuencia del abastecimiento de agua</h4>
      <div class="content">
        <p>{{ schoolDataSet.waterServiceContinuity }}</p>
      </div>
      <h4 class="is-size-5 has-text-weight-bold">Disponibilidad de agua para el lavado frecuente de manos</h4>
      <div class="content">
        <p>{{ schoolDataSet.waterForHandWashing }}</p>
      </div>
      <h4 class="is-size-5 has-text-weight-bold">Disponibilidad de lavamanos</h4>
      <div class="content">
        <p>{{ schoolDataSet.sinkSufficiency }}</p>
      </div>
      <h4 class="is-size-5 has-text-weight-bold">Disponibilidad de jabón para el lavado de manos</h4>
      <div class="content">
        <p>{{ schoolDataSet.soapSufficiency }}</p>
      </div>
      <h4 class="is-size-5 has-text-weight-bold">Disponibilidad de toallas para el secado de manos (papel o tela)</h4>
      <div class="content">
        <p>{{ schoolDataSet.towelSufficiency }}</p>
      </div>
      <h4 class="is-size-5 has-text-weight-bold">Disponibilidad de toallas para el secado de manos (papel o tela)</h4>
      <div class="content">
        <p>{{ schoolDataSet.towelSufficiency }}</p>
      </div>
      <h4 class="is-size-5 has-text-weight-bold">Disponibilidad de alcohol en gel al 70%</h4>
      <div class="content">
        <p>{{ schoolDataSet.sanitizerSufficiency }}</p>
      </div>
      <h4 class="is-size-5 has-text-weight-bold">Disponibilidad de botes de basura</h4>
      <div class="content">
        <p>{{ schoolDataSet.binSufficiency }}</p>
      </div>
      <h4 class="is-size-5 has-text-weight-bold">Existencia de drenaje</h4>
      <div class="content">
        <p>{{ schoolDataSet.hasSepticSystem }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./SchoolDetails.component.ts"></script>
