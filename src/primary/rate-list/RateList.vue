<template>
  <div v-if="level !== 'school'" class="rate-list has-background-white card">
    <header class="card-header">
      <p class="card-header-title has-text-primary">Porcentaje de {{ selectedRateTypeLabel }} ausentes por {{ levelLabel }}</p>
    </header>
    <div class="card-content px-0 py-0">
      <div v-if="sortedDataSets.length === 0" class="has-text-grey px-2 py-2">
        No se han encontrado resultados
      </div>
      <table class="table is-fullwidth">
        <tbody>
          <tr v-for="rateDataSet in sortedDataSets" :key="rateDataSet.id">
            <td>{{ rateDataSet.name }}</td>
            <td :class="`w80 has-text-${rateDataSet.color}`">{{ rateDataSet.percentage }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" src="./RateList.component.ts"></script>
