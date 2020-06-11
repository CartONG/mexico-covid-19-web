<template>
  <div>
    <div id="map" class="map is-h50 has-light-border"></div>
    <PopupVue id="popup" :items="schoolItems" @pick="pickSchool" @close="closePopup" />
  </div>
</template>

<script lang="ts" src="./ChoroplethMap.component.ts"></script>
