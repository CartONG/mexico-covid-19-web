import { stubAxiosInstance, stubAxiosNotFound } from '../../TestUtils';

import { restSchool } from './RestSchool.fixture';
import { restSchoolSummary } from './RestSchoolSummary.fixture';

import { LocalDate } from '@/domain/date/LocalDate';
import { NotFound } from '@/domain/NotFound';
import { School } from '@/domain/school/School';
import { SchoolSummary } from '@/domain/school/SchoolSummary';
import { RestSchoolRepository } from '@/secondary/school/RestSchoolRepository';

describe('RestSchoolRepository', () => {
  it('should raise an error if the list of school cannot be found', next => {
    const axiosInstance = stubAxiosInstance();
    axiosInstance.get.rejects(stubAxiosNotFound('No School found'));
    const restSchoolRepository = new RestSchoolRepository(axiosInstance, 'production');
    restSchoolRepository.list('01001').catch(error => {
      expect(error).toBeInstanceOf(NotFound);
      expect(error.message).toContain('school');
      expect(error.stack).toContain('Caused by');
      expect(error.stack).toContain('No School found');
      next();
    });
  });

  it('should raise an error if a given school cannot be found', next => {
    const axiosInstance = stubAxiosInstance();
    axiosInstance.get.rejects(stubAxiosNotFound('No School found'));
    const restSchoolRepository = new RestSchoolRepository(axiosInstance, 'production');
    restSchoolRepository.find('01').catch(error => {
      expect(error).toBeInstanceOf(NotFound);
      expect(error.message).toContain('school');
      expect(error.stack).toContain('Caused by');
      expect(error.stack).toContain('No School found');
      next();
    });
  });

  it('should return a list of schools summary', async () => {
    const axiosInstance = stubAxiosInstance();
    const restSchools = [restSchoolSummary()];
    axiosInstance.get.resolves({ data: restSchools });
    const restSchoolRepository = new RestSchoolRepository(axiosInstance, 'production');
    const list = await restSchoolRepository.list('01001');
    expect(list).toHaveLength(1);
    expect(axiosInstance.get.getCall(0).args[0]).toBe('escuelas/?cod_entidad=01&cod_mun=001');
    expect(list[0]).toEqual<SchoolSummary>({
      id: '03DDI0003E4',
      name: 'CENTRO DE ATENCIÓN INFANTIL 3 CARMEN VERDUGO PEDRIN',
      turn: 'Discontinuo',
      locality: 'SAN JOSÉ DEL CABO',
      studentAttendance: 0.62,
      teacherAttendance: 1,
      adminAttendance: 1,
      maleStudentAbsence: 0.14,
      femaleStudentAbsence: 0.24,
      coordinates: [-109.696335, 23.054972],
    });
  });

  it('should return a given school', async () => {
    const axiosInstance = stubAxiosInstance();
    axiosInstance.get.resolves({ data: restSchool() });
    const restSchoolRepository = new RestSchoolRepository(axiosInstance, 'production');
    const school = await restSchoolRepository.find('03KJN0025W4');
    expect(axiosInstance.get.getCall(0).args[0]).toBe('escuelas/?idescuela=03KJN0025W4');
    expect(school).toEqual<School>({
      id: '03KJN0025W4',
      locality: 'LA CANDELARIA',
      municipalityId: '008',
      stateId: '03',
      name: 'CURSO COMUNITARIO DE EDUCACION PREESCOLAR',
      lastUpdateDate: LocalDate.of('2020-06-16'),
      studentAttendance: 1,
      maleStudentAbsencePercentageOverStudentAbsence: 0,
      femaleStudentAbsencePercentageOverStudentAbsence: 0,
      teacherAttendance: 1,
      adminAttendance: -1,
      level: 'PREESCOLAR',
      workCenterKey: '03KJN0025W',
      turn: '4',
      givesClasses: 1,
      modality: 'PREESCOLAR COMUNITARIO',
      municipality: 'LOS CABOS',
      localityId: '0063',
      address: 'NINGUNO NINGUNO',
      buildingId: '03INM0636F',
      support: 'PÚBLICO',
      femaleStudent: 1,
      maleStudent: 5,
      maleStudentPercentage: 0.83,
      femaleStudentPercentage: 0.17,
      students: 6,
      teachers: 1,
      assistants: 1,
      directors: 0,
      subDirectors: 0,
      technicalPedagogicalAdvisers: 0,
      physicalEducationTeachers: 0,
      admins: 0,
      quartermasters: 0,
      others: 0,
      waterSupply: 2,
      waterServiceContinuity: 2,
      waterForHandWashing: 1,
      sinkSufficiency: 2,
      soapSufficiency: 1,
      towelSufficiency: 3,
      sanitizerSufficiency: 1,
      binSufficiency: 2,
      hasSepticSystem: 2,
      hasAbilityToReorganizeSpace: 1,
      hasHygieneCommittee: 1,
      alternatesAttendance: 1,
      absentFemaleStudents: 0,
      absentMaleStudents: 0,
      studentAbsenceMainReasons: {
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
      },
      studentAbsenceMainReasonsPercentages: {
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
      },
      studentAbsenceOtherReason: '',
      absentTeachers: 0,
      teacherAbsenceMainReasons: {
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
      },
      teacherAbsenceMainReasonsPercentages: {
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
      },
      teacherAbsenceOtherReason: '',
      absentAdmins: 0,
      adminAbsenceMainReasons: {
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
      },
      adminAbsenceMainReasonsPercentages: {
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
      },
      adminAbsenceOtherReason: '',
      comments: '',
      maleStudentAbsenceProportion: -1,
      femaleStudentAbsenceProportion: -1,
      expectedStudents: 3,
      takenActions: { visits: false, calls: true, scholarship: true, none: false },
      drinkers: 5,
      maleStudentToilets: 2,
      femaleStudentToilets: 2,
      foodSupport: true,
      foodSupportType: { dif: false, fullTimeProgram: true, state: false, others: true },
      foodSupportComment: '',
      theSchoolIsOurs: 1,
    });
  });

  it('should use URLs dedicated to development', async () => {
    const axiosInstance = stubAxiosInstance();
    axiosInstance.get.resolves({ data: [] });
    const restSchoolRepository = new RestSchoolRepository(axiosInstance, 'development');
    await restSchoolRepository.list('01001');
    axiosInstance.get.resolves({ data: restSchool() });
    await restSchoolRepository.find('03KJN0025W4');
    expect(axiosInstance.get.getCall(0).args[0]).toBe('schools.json');
    expect(axiosInstance.get.getCall(1).args[0]).toBe('school.json');
  });
});
