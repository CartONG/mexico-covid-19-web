<template>
  <div class="has-background-white card">
    <header class="card-header">
      <h2 class="card-header-title has-text-primary">Historial de escuelas con clases presenciales</h2>
    </header>
    <div class="card-content">
      <div id="historic-chart"></div>
      <b-field v-if="historyItems.length > 0 && !printable">
        <b-slider
          v-model="interval"
          :min="0"
          :max="historyItems.length - 1"
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
