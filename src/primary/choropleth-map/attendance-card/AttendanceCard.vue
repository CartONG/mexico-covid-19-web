<template>
  <div :class="[{ 'opacity-6': light }, 'card attendance-card no-shadow']" @click="$emit('click')">
    <div class="card-content px-1 py-1">
      <div class="columns is-vcentered is-desktop is-desktop">
        <div class="column is-3 has-text-centered">
          <img :src="attendance.imagePath" :alt="attendance.label" />
        </div>
        <div class="column is-6 is-hidden-mobile">
          <p class="has-text-grey is-size-6">Asistencia {{ attendance.precededByLabel }}</p>
          <p :class="`is-size-3 has-text-${attendance.percentage.color}`">{{ attendance.label }}</p>
        </div>
        <div class="column is-6 has-text-centered is-hidden-tablet">
          <p class="has-text-grey is-size-6">Asistencia {{ attendance.precededByLabel }}</p>
          <p :class="`is-size-3 has-text-${attendance.percentage.color}`">{{ attendance.label }}</p>
        </div>
        <div class="column is-3 has-text-centered">
          <svg
            :id="`${attendance.label}-attendance-chart`"
            width="88"
            height="88"
            viewBox="0 0 88 88"
            perserveAspectRatio="xMinYMid meet"
          ></svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./AttendanceCard.component.ts"></script>
