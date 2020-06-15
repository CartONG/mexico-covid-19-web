<template>
  <nav class="tabs is-fullwidth">
    <ul>
      <li
        v-for="rateTabsDataSet in rateTabsDataSets"
        :key="rateTabsDataSet.text"
        :class="{ 'is-active': rateTabsDataSet.rateType === selectedRateType }"
      >
        <a
          :class="rateTabsDataSet.rateType === selectedRateType ? `has-border-${rateTabsDataSet.percentageColor}` : 'has-border-grey'"
          @click.prevent.stop="selectRateType(rateTabsDataSet.rateType)"
        >
          <p class="has-text-grey">{{ rateTabsDataSet.text }}</p>
          <p :class="`is-size-4 has-text-${rateTabsDataSet.percentageColor}`">{{ rateTabsDataSet.percentage }}</p>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" src="./RateTabs.component.ts"></script>
