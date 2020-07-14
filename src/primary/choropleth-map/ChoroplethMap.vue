<template>
  <div class="choropleth-map card is-full-height is-direction-column">
    <header class="card-header">
      <h2 class="card-header-title">Tasa de asistencia</h2>
    </header>
    <div class="card-content px-0 py-0 is-full-height is-flex-grow-1">
      <div class="is-full-height is-direction-column-reverse">
        <RateTabsVue class="my-0" />
        <div id="map" class="map has-background-white is-flex-grow-1"></div>
      </div>
      <PopupVue id="popup" :items="schoolItems" @pick="pickSchool" @close="closePopup" />
      <div id="recenter-control" class="ol-control">
        <button type="button" title="centrar mapa" @click="fitView(1000)">
          <span class="icon"><i class="mdi mdi-arrow-collapse-all"></i></span>
        </button>
      </div>
      <div id="refresh-control" class="ol-control">
        <button type="button" title="regressar a Nacional" @click="resetView(1000)">
          <span class="icon"><i class="mdi mdi-refresh"></i></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./ChoroplethMap.component.ts"></script>
