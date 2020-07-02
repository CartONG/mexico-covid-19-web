<template>
  <nav class="tabs is-fullwidth">
    <ul>
      <li :class="{ 'is-active': selectedRateType === 'STUDENT_ABSENCE' }">
        <a
          :class="selectedRateType === 'STUDENT_ABSENCE' ? `has-border-${summaryDataSet.studentAbsenceRate.color}` : 'has-border-grey'"
          @click.prevent.stop="selectRateType('STUDENT_ABSENCE')"
        >
          <p class="has-text-grey">Alumnos</p>
          <p :class="`is-size-4 has-text-${summaryDataSet.studentAbsenceRate.color}`">
            {{ summaryDataSet.studentAbsenceRate.text }}
          </p>
        </a>
      </li>
      <li :class="{ 'is-active': selectedRateType === 'TEACHER_ABSENCE' }">
        <a
          :class="selectedRateType === 'TEACHER_ABSENCE' ? `has-border-${summaryDataSet.teacherAbsenceRate.color}` : 'has-border-grey'"
          @click.prevent.stop="selectRateType('TEACHER_ABSENCE')"
        >
          <p class="has-text-grey">Docentes</p>
          <p :class="`is-size-4 has-text-${summaryDataSet.teacherAbsenceRate.color}`">
            {{ summaryDataSet.teacherAbsenceRate.text }}
          </p>
        </a>
      </li>
      <li :class="{ 'is-active': selectedRateType === 'PERSONAL_ABSENCE' }">
        <a
          :class="selectedRateType === 'PERSONAL_ABSENCE' ? `has-border-${summaryDataSet.adminAbsenceRate.color}` : 'has-border-grey'"
          @click.prevent.stop="selectRateType('PERSONAL_ABSENCE')"
        >
          <p class="has-text-grey">Personal</p>
          <p :class="`is-size-4 has-text-${summaryDataSet.adminAbsenceRate.color}`">
            {{ summaryDataSet.adminAbsenceRate.text }}
          </p>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" src="./RateTabs.component.ts"></script>
