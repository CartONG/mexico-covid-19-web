<template>
  <div class="choropleth-map has-background-white card">
    <header class="card-header">
      <div class="is-size-3 px-2 has-text-grey">Tasa de asistencia</div>
    </header>
    <div id="map" class="map is-h60"></div>
    <PopupVue id="popup" :items="schoolItems" @pick="pickSchool" @close="closePopup" />
    <div id="recenter-control" class="ol-control">
      <button type="button" title="centrar mapa" @click="fitView(1000)">
        <span class="icon">
          <i class="mdi mdi-arrow-collapse-all"></i>
        </span>
      </button>
    </div>
    <div id="refresh-control" class="ol-control">
      <button type="button" title="regressar a Nacional" @click="resetView(1000)">
        <span class="icon">
          <i class="mdi mdi-refresh"></i>
        </span>
      </button>
    </div>
    <RateTabsVue />
  </div>
</template>

<script lang="ts" src="./ChoroplethMap.component.ts"></script>
