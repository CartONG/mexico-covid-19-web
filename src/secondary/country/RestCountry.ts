export interface RestCountry {
  alumnosInasistencia: number;
  docentesInasistencia: number;
  adminInasistencia: number;
  totalEscuelas: number;
  totalAlum: number;
}

export const toCountry = (restCountry: RestCountry) => ({
  studentAbsenceRate: restCountry.alumnosInasistencia,
  teacherAbsenceRate: restCountry.docentesInasistencia,
  adminAbsenceRate: restCountry.adminInasistencia,
  totalSchools: restCountry.totalEscuelas,
  totalStudent: restCountry.totalAlum,
});
