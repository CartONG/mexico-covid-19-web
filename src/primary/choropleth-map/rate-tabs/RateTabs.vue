<template>
  <nav class="tabs is-fullwidth">
    <ul>
      <li :class="{ 'is-active': selectedRateType === 'STUDENT_ABSENCE' }">
        <a
          :class="selectedRateType === 'STUDENT_ABSENCE' ? `has-border-${summaryDataSet.studentAttendance.color}` : 'has-border-grey'"
          @click.prevent.stop="selectRateType('STUDENT_ABSENCE')"
        >
          <p class="has-text-grey">Alumnos</p>
          <p :class="`is-size-4 has-text-${summaryDataSet.studentAttendance.color}`">
            {{ summaryDataSet.studentAttendance.text }}
          </p>
        </a>
      </li>
      <li :class="{ 'is-active': selectedRateType === 'TEACHER_ABSENCE' }">
        <a
          :class="selectedRateType === 'TEACHER_ABSENCE' ? `has-border-${summaryDataSet.teacherAttendance.color}` : 'has-border-grey'"
          @click.prevent.stop="selectRateType('TEACHER_ABSENCE')"
        >
          <p class="has-text-grey">Docentes</p>
          <p :class="`is-size-4 has-text-${summaryDataSet.teacherAttendance.color}`">
            {{ summaryDataSet.teacherAttendance.text }}
          </p>
        </a>
      </li>
      <li :class="{ 'is-active': selectedRateType === 'PERSONAL_ABSENCE' }">
        <a
          :class="selectedRateType === 'PERSONAL_ABSENCE' ? `has-border-${summaryDataSet.adminAttendance.color}` : 'has-border-grey'"
          @click.prevent.stop="selectRateType('PERSONAL_ABSENCE')"
        >
          <p class="has-text-grey">Personal</p>
          <p :class="`is-size-4 has-text-${summaryDataSet.adminAttendance.color}`">
            {{ summaryDataSet.adminAttendance.text }}
          </p>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" src="./RateTabs.component.ts"></script>
