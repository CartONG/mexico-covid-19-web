<template>
  <div>
    <div id="map" class="map is-h50 has-light-border"></div>
    <PopupVue id="popup" :items="schoolItems" @pick="pickSchool" @close="closePopup" />
    <div id="recenter-control" class="ol-control">
      <button type="button" title="centrar mapa" @click="fitView(1000)">
        <span class="icon">
          <i class="mdi mdi-arrow-collapse-all"></i>
        </span>
      </button>
    </div>
    <div id="refresh-control" class="ol-control">
      <button type="button" title="regressar a Nacional" @click="refreshView(1000)">
        <span class="icon">
          <i class="mdi mdi-refresh"></i>
        </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" src="./ChoroplethMap.component.ts"></script>
