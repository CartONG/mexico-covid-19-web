<template>
  <nav class="tabs is-fullwidth">
    <ul>
      <li :class="{ 'is-active': selectedRateType === 'STUDENT_ABSENCE' }">
        <a
          :class="
            selectedRateType === 'STUDENT_ABSENCE' ? `has-border-${summaryDataSet.studentAbsenceRate.percentageColor}` : 'has-border-grey'
          "
          @click.prevent.stop="selectRateType('STUDENT_ABSENCE')"
        >
          <p class="has-text-grey">Alumnos</p>
          <p :class="`is-size-4 has-text-${summaryDataSet.studentAbsenceRate.percentageColor}`">
            {{ summaryDataSet.studentAbsenceRate.percentage }}
          </p>
        </a>
      </li>
      <li :class="{ 'is-active': selectedRateType === 'TEACHER_ABSENCE' }">
        <a
          :class="
            selectedRateType === 'TEACHER_ABSENCE' ? `has-border-${summaryDataSet.teacherAbsenceRate.percentageColor}` : 'has-border-grey'
          "
          @click.prevent.stop="selectRateType('TEACHER_ABSENCE')"
        >
          <p class="has-text-grey">Docentes</p>
          <p :class="`is-size-4 has-text-${summaryDataSet.teacherAbsenceRate.percentageColor}`">
            {{ summaryDataSet.teacherAbsenceRate.percentage }}
          </p>
        </a>
      </li>
      <li :class="{ 'is-active': selectedRateType === 'PERSONAL_ABSENCE' }">
        <a
          :class="
            selectedRateType === 'PERSONAL_ABSENCE' ? `has-border-${summaryDataSet.adminAbsenceRate.percentageColor}` : 'has-border-grey'
          "
          @click.prevent.stop="selectRateType('PERSONAL_ABSENCE')"
        >
          <p class="has-text-grey">Personal</p>
          <p :class="`is-size-4 has-text-${summaryDataSet.adminAbsenceRate.percentageColor}`">
            {{ summaryDataSet.adminAbsenceRate.percentage }}
          </p>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" src="./RateTabs.component.ts"></script>
