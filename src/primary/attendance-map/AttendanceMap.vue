<template>
  <div class="choropleth-map card">
    <header class="card-header">
      <h2 class="card-header-title">Tasa de asistencia</h2>
    </header>
    <div class="card-content px-0 py-0 is-full-height is-flex-grow-1">
      <div class="is-full-height is-direction-column-reverse">
        <AttendanceTabsVue class="my-0" :summary="summary" :attendanceType="attendanceType" :inline="inline" :printable="printable" />
        <div id="map" class="map has-background-white is-flex-grow-1"></div>
      </div>
      <PopupVue id="popup" :items="schoolItems" @pick="pickSchool" @close="attendanceWebmapping().closePopup()" />
      <div id="recenter-control" class="ol-control">
        <button type="button" title="centrar mapa" @click="attendanceWebmapping().fitToCountry(true)">
          <span class="icon"><i class="mdi mdi-arrow-collapse-all"></i></span>
        </button>
      </div>
      <div id="refresh-control" class="ol-control">
        <button type="button" title="regressar a Nacional" @click="goBackToCountry()">
          <span class="icon"><i class="mdi mdi-refresh"></i></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./AttendanceMap.component.ts"></script>
