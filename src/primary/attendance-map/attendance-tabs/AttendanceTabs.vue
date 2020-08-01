<template>
  <nav class="tabs shadowless no-border attendance-tabs is-fullwidth">
    <ul>
      <li :class="{ 'is-active': attendanceType === 'STUDENT' }">
        <a @click.prevent.stop="selectAttendanceType('STUDENT')">
          <AttendanceCardVue :attendance="summaryDataSet.studentAttendance" :inline="inline" :printable="printable" />
        </a>
      </li>
      <li :class="{ 'is-active': attendanceType === 'TEACHER' }">
        <a @click.prevent.stop="selectAttendanceType('TEACHER')">
          <AttendanceCardVue :attendance="summaryDataSet.teacherAttendance" :inline="inline" :printable="printable" />
        </a>
      </li>
      <li :class="{ 'is-active': attendanceType === 'PERSONAL' }">
        <a @click.prevent.stop="selectAttendanceType('PERSONAL')">
          <AttendanceCardVue :attendance="summaryDataSet.adminAttendance" :inline="inline" :printable="printable" />
        </a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" src="./AttendanceTabs.component.ts"></script>
