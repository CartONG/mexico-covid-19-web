<template>
  <div class="has-background-white card">
    <header class="card-header">
      <p class="card-header-title has-text-primary">Historial de escuelas con clases presenciales</p>
    </header>
    <div class="card-content">
      <svg id="historic-chart" viewBox="0 0 1200 400" perserveAspectRatio="xMinYMid meet"></svg>
      <b-field v-if="currentHistoryItems.length > 0" class="no-print">
        <b-slider
          v-model="interval"
          :min="0"
          :max="currentHistoryItems.length - 1"
          :step="1"
          :custom-formatter="tooltipLabel"
          ticks
          rounded
        ></b-slider>
      </b-field>
    </div>
  </div>
</template>

<script lang="ts" src="./Historic.component.ts"></script>
