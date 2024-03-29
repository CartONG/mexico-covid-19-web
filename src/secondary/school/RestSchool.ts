import { LocalDate } from '@/domain/date/LocalDate';
import { School } from '@/domain/school/School';

export interface RestSchool {
  id: string;
  localidad: string;
  municipioId: string;
  entidadId: string;
  nombre: string;
  fechaUltimoReporte: string;
  indiceAsistenciaAlumnado: number;
  indiceAsistenciaDocentes: number;
  indiceAsistenciaAdmin: number;
  nivel: string;
  cct: string;
  turno: string;
  hayClases: 1;
  modalidad: string;
  municipio: string;
  cod_localidad: string;
  domicilio: string;
  cod_inmueble: string;
  sostenimiento: string;
  alumnas: number;
  alumnos: number;
  sumaAlumnos: number;
  docentes: number;
  grupos: number;
  director: number;
  subdirector: number;
  atps: number;
  educfis: number;
  admin: number;
  intenden: number;
  otros: number;
  tipoAbasAgua: number;
  contServAgua: number;
  aguaLavamanos: number;
  lavamanos: number;
  jabon: number;
  toallas: number;
  sanitizante: number;
  botesBasura: number;
  tipoDrenaje: number;
  espacios: number;
  comite: number;
  alterna_asis: number;
  inaalumnas: number;
  inaalumnos: number;
  inaalum_causa1: number;
  inaalum_causa2: number;
  inaalum_causa3: number;
  inaalum_causa4: number;
  inaalum_causa5: number;
  inaalum_causaotro: string;
  sumaInaDocentes: number;
  inadoc_causa1: number;
  inadoc_causa2: number;
  inadoc_causa3: number;
  inadoc_causa4: number;
  inadoc_causaotro: string;
  sumaInaAdministrativos: number;
  inaadm_causa1: number;
  inaadm_causa2: number;
  inaadm_causa3: number;
  inaadm_causa4: number;
  inaadm_causaotro: string;
  comentarios: string;
  indiceAlumnasSobreInasistencias: number;
  indiceAlumnosSobreInasistencias: number;
  indiceInasistenciaAlumnas: number;
  indiceInasistenciaAlumnos: number;
  alum_prog: number;
  alimentos: number;
  alimentosdif: number;
  alimentosetc: number;
  alimentosedo: number;
  alimentosotro: number;
  alimentosotro_txt: string;
  bebederos: number;
  wcalumnas: number;
  wcalumnos: number;
  accionvisita: number;
  accionllamada: number;
  accionbeca: number;
  accionninguna: number;
  escuelanuestra: number;
  contservelectrica?: number;
  internet?: number;
}

const genderPercentage = (gender: number, otherGender: number): number => {
  if (gender === -1 || otherGender === -1) {
    return -1;
  }
  const total = gender + otherGender;
  return total === 0 ? 0 : Math.round((gender / total) * 100) / 100;
};

const toValidCount = (count: number) => (isNaN(count) || count < 0 ? 0 : count);

const toRate = (value: number, total: number) => (total === 0 ? 0 : Math.round((toValidCount(value) / total) * 100) / 100);

export const toSchool = (restSchool: RestSchool): School => {
  const totalStudentAbsenceMainReasons =
    toValidCount(restSchool.inaalum_causa1) +
    toValidCount(restSchool.inaalum_causa2) +
    toValidCount(restSchool.inaalum_causa3) +
    toValidCount(restSchool.inaalum_causa4) +
    toValidCount(restSchool.inaalum_causa5);

  const totalTeachersAbsenceMainReasons =
    toValidCount(restSchool.inadoc_causa1) +
    toValidCount(restSchool.inadoc_causa2) +
    toValidCount(restSchool.inadoc_causa3) +
    toValidCount(restSchool.inadoc_causa4);

  const totalAdminAbsenceMainReasons =
    toValidCount(restSchool.inaadm_causa1) +
    toValidCount(restSchool.inaadm_causa2) +
    toValidCount(restSchool.inaadm_causa3) +
    toValidCount(restSchool.inaadm_causa4);

  return {
    id: restSchool.id,
    locality: restSchool.localidad,
    municipalityId: restSchool.municipioId,
    stateId: restSchool.entidadId,
    name: restSchool.nombre,
    lastUpdateDate: LocalDate.of(restSchool.fechaUltimoReporte),
    studentAttendance: restSchool.indiceAsistenciaAlumnado,
    maleStudentAbsencePercentageOverStudentAbsence: restSchool.indiceInasistenciaAlumnos,
    femaleStudentAbsencePercentageOverStudentAbsence: restSchool.indiceInasistenciaAlumnas,
    teacherAttendance: restSchool.indiceAsistenciaDocentes,
    adminAttendance: restSchool.indiceAsistenciaAdmin,
    level: restSchool.nivel,
    workCenterKey: restSchool.cct,
    turn: restSchool.turno,
    givesClasses: restSchool.hayClases,
    modality: restSchool.modalidad,
    municipality: restSchool.municipio,
    localityId: restSchool.cod_localidad,
    address: restSchool.domicilio,
    buildingId: restSchool.cod_inmueble,
    support: restSchool.sostenimiento,
    femaleStudent: restSchool.alumnas,
    maleStudent: restSchool.alumnos,
    maleStudentPercentage: genderPercentage(restSchool.alumnos, restSchool.alumnas),
    femaleStudentPercentage: genderPercentage(restSchool.alumnas, restSchool.alumnos),
    students: restSchool.sumaAlumnos,
    teachers: restSchool.docentes,
    assistants: restSchool.grupos,
    directors: restSchool.director,
    subDirectors: restSchool.subdirector,
    technicalPedagogicalAdvisers: restSchool.atps,
    physicalEducationTeachers: restSchool.educfis,
    admins: restSchool.admin,
    quartermasters: restSchool.intenden,
    others: restSchool.otros,
    waterSupply: restSchool.tipoAbasAgua,
    waterServiceContinuity: restSchool.contServAgua,
    waterForHandWashing: restSchool.aguaLavamanos,
    functionalSinkCount: restSchool.lavamanos,
    soapSufficiency: restSchool.jabon,
    towelSufficiency: restSchool.toallas,
    sanitizerSufficiency: restSchool.sanitizante,
    binSufficiency: restSchool.botesBasura,
    hasSepticSystem: restSchool.tipoDrenaje,
    hasAbilityToReorganizeSpace: restSchool.espacios,
    hasHygieneCommittee: restSchool.comite,
    alternatesAttendance: restSchool.alterna_asis,
    absentFemaleStudents: restSchool.inaalumnas,
    absentMaleStudents: restSchool.inaalumnos,
    studentAbsenceMainReasons: {
      '1': restSchool.inaalum_causa1,
      '2': restSchool.inaalum_causa2,
      '3': restSchool.inaalum_causa3,
      '4': restSchool.inaalum_causa4,
      '5': restSchool.inaalum_causa5,
    },
    studentAbsenceMainReasonsPercentages: {
      '1': toRate(restSchool.inaalum_causa1, totalStudentAbsenceMainReasons),
      '2': toRate(restSchool.inaalum_causa2, totalStudentAbsenceMainReasons),
      '3': toRate(restSchool.inaalum_causa3, totalStudentAbsenceMainReasons),
      '4': toRate(restSchool.inaalum_causa4, totalStudentAbsenceMainReasons),
      '5': toRate(restSchool.inaalum_causa5, totalStudentAbsenceMainReasons),
    },
    studentAbsenceOtherReason: restSchool.inaalum_causaotro,
    absentTeachers: restSchool.sumaInaDocentes,
    teacherAbsenceMainReasons: {
      '1': restSchool.inadoc_causa1,
      '2': restSchool.inadoc_causa2,
      '3': restSchool.inadoc_causa3,
      '4': restSchool.inadoc_causa4,
    },
    teacherAbsenceMainReasonsPercentages: {
      '1': toRate(restSchool.inadoc_causa1, totalTeachersAbsenceMainReasons),
      '2': toRate(restSchool.inadoc_causa2, totalTeachersAbsenceMainReasons),
      '3': toRate(restSchool.inadoc_causa3, totalTeachersAbsenceMainReasons),
      '4': toRate(restSchool.inadoc_causa4, totalTeachersAbsenceMainReasons),
    },
    teacherAbsenceOtherReason: restSchool.inadoc_causaotro,
    absentAdmins: restSchool.sumaInaAdministrativos,
    adminAbsenceMainReasons: {
      '1': restSchool.inaadm_causa1,
      '2': restSchool.inaadm_causa2,
      '3': restSchool.inaadm_causa3,
      '4': restSchool.inaadm_causa4,
    },
    adminAbsenceMainReasonsPercentages: {
      '1': toRate(restSchool.inaadm_causa1, totalAdminAbsenceMainReasons),
      '2': toRate(restSchool.inaadm_causa2, totalAdminAbsenceMainReasons),
      '3': toRate(restSchool.inaadm_causa3, totalAdminAbsenceMainReasons),
      '4': toRate(restSchool.inaadm_causa4, totalAdminAbsenceMainReasons),
    },
    adminAbsenceOtherReason: restSchool.inaadm_causaotro,
    comments: restSchool.comentarios,
    maleStudentAbsenceProportion: restSchool.indiceAlumnosSobreInasistencias,
    femaleStudentAbsenceProportion: restSchool.indiceAlumnasSobreInasistencias,
    expectedStudents: restSchool.alum_prog,
    takenActions: {
      visits: restSchool.accionvisita === 1,
      calls: restSchool.accionllamada === 1,
      scholarship: restSchool.accionbeca === 1,
      none: restSchool.accionninguna === 1,
    },
    drinkers: restSchool.bebederos,
    maleStudentToilets: restSchool.wcalumnos,
    femaleStudentToilets: restSchool.wcalumnas,
    foodSupport: restSchool.alimentos === 1,
    foodSupportType: {
      dif: restSchool.alimentosdif === 1,
      fullTimeProgram: restSchool.alimentosetc === 1,
      state: restSchool.alimentosedo === 1,
      others: restSchool.alimentosotro === 1,
    },
    foodSupportComment: restSchool.alimentosotro_txt,
    theSchoolIsOurs: restSchool.escuelanuestra,
    electricitySource: restSchool.contservelectrica || 0,
    internetAccess: restSchool.internet || 0,
  };
};
