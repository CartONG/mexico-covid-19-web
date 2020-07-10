<template>
  <nav class="tabs attendance-tabs is-fullwidth">
    <ul>
      <li :class="{ 'is-active': selectedRateType === 'STUDENT' }">
        <a @click.prevent.stop="selectRateType('STUDENT')">
          <AttendanceCardVue :attendance="summaryDataSet.studentAttendance" :light="selectedRateType !== 'STUDENT'" />
        </a>
      </li>
      <li :class="{ 'is-active': selectedRateType === 'TEACHER' }">
        <a @click.prevent.stop="selectRateType('TEACHER')">
          <AttendanceCardVue :attendance="summaryDataSet.teacherAttendance" :light="selectedRateType !== 'TEACHER'" />
        </a>
      </li>
      <li :class="{ 'is-active': selectedRateType === 'PERSONAL' }">
        <a @click.prevent.stop="selectRateType('PERSONAL')">
          <AttendanceCardVue :attendance="summaryDataSet.adminAttendance" :light="selectedRateType !== 'PERSONAL'" />
        </a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" src="./RateTabs.component.ts"></script>
