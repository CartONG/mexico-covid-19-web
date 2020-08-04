<template>
  <div class="card attendance-card no-shadow" @click="$emit('click')">
    <div class="card-content px-1 py-1">
      <div v-if="inline" class="columns is-vcentered is-desktop">
        <div class="column is-3 has-text-centered">
          <img :src="attendance.imagePath" :alt="attendance.label" />
        </div>
        <div class="column is-5">
          <p class="has-text-grey is-size-6">Asistencia {{ attendance.precededByLabel }}</p>
          <p :class="`is-size-3 has-text-${attendance.percentage.color}`">{{ attendance.label }}</p>
        </div>
        <div class="column is-4 has-text-centered">
          <div :id="`${attendance.label}-attendance-chart`"></div>
        </div>
      </div>
      <div v-else>
        <div class="columns">
          <div class="column is-12">
            <img :src="attendance.imagePath" :alt="attendance.label" />
            <p class="has-text-grey is-size-6">Asistencia {{ attendance.precededByLabel }}</p>
            <p :class="`is-size-3 has-text-${attendance.percentage.color}`">{{ attendance.label }}</p>
            <div :id="`${attendance.label}-attendance-chart`"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./AttendanceCard.component.ts"></script>
