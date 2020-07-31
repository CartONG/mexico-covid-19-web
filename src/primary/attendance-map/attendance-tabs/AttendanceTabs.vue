<template>
  <nav class="tabs attendance-tabs is-fullwidth">
    <ul>
      <li :class="{ 'is-active': attendanceType === 'STUDENT' }">
        <a @click.prevent.stop="selectAttendanceType('STUDENT')">
          <AttendanceCardVue
            :attendance="summaryDataSet.studentAttendance"
            :light="attendanceType !== 'STUDENT'"
            :inline="inline"
            :printable="printable"
          />
        </a>
      </li>
      <li :class="{ 'is-active': attendanceType === 'TEACHER' }">
        <a @click.prevent.stop="selectAttendanceType('TEACHER')">
          <AttendanceCardVue
            :attendance="summaryDataSet.teacherAttendance"
            :light="attendanceType !== 'TEACHER'"
            :inline="inline"
            :printable="printable"
          />
        </a>
      </li>
      <li :class="{ 'is-active': attendanceType === 'PERSONAL' }">
        <a @click.prevent.stop="selectAttendanceType('PERSONAL')">
          <AttendanceCardVue
            :attendance="summaryDataSet.adminAttendance"
            :light="attendanceType !== 'PERSONAL'"
            :inline="inline"
            :printable="printable"
          />
        </a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" src="./AttendanceTabs.component.ts"></script>
