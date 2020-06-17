<template>
  <div class="rate-list has-background-white card">
    <header class="card-header">
      <p class="card-header-title has-text-primary">Porcentaje de {{ selectedRateTypeLabel }} ausentes por {{ levelLabel }}</p>
    </header>
    <div class="card-content px-0 py-0">
      <div v-if="sortedDataSets.length === 0" class="has-text-grey px-2 py-2">
        No se han encontrado resultados
      </div>
      <table class="table is-fullwidth has-no-background">
        <tbody>
          <tr
            v-for="rateDataSet in sortedDataSets"
            :key="rateDataSet.id"
            :class="[
              {
                'has-text-weight-bold': rateDataSet.id === `${selectedSchoolId}${selectedRateType}`,
                'has-background-light': rateDataSet.id === `${selectedSchoolId}${selectedRateType}`,
              },
            ]"
          >
            <td>{{ rateDataSet.name }}</td>
            <td :class="`w80 has-text-${rateDataSet.color}`">{{ rateDataSet.percentage }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" src="./RateList.component.ts"></script>
