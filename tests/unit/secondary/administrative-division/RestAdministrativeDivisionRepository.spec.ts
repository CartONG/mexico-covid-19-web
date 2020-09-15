import { stubAxiosInstance, stubAxiosNotFound } from '../../TestUtils';

import { restAdministrativeDivision } from './RestAdministrativeDivision.fixture';
import { restAdministrativeDivisionSummary } from './RestAdministrativeDivisionSummary.fixture';

import { AdministrativeDivision } from '@/domain/administrative-division/AdministrativeDivision';
import { AdministrativeDivisionSummary } from '@/domain/administrative-division/AdministrativeDivisionSummary';
import { AdministrativeDivisionTypes } from '@/domain/administrative-division/AdministrativeDivisionTypes';
import { LocalDate } from '@/domain/date/LocalDate';
import { NotFound } from '@/domain/NotFound';
import { RestAdministrativeDivisionRepository } from '@/secondary/administrative-division/RestAdministrativeDivisionRepository';

describe('RestAdministrativeDivision', () => {
  it('should raise an error if the list of administrative division cannot be found', next => {
    const axiosInstance = stubAxiosInstance();
    axiosInstance.get.rejects(stubAxiosNotFound('No AdministrativeDivision found'));
    const restAdministrativeDivisionRepository = new RestAdministrativeDivisionRepository(axiosInstance, 'production');
    restAdministrativeDivisionRepository.list(AdministrativeDivisionTypes.COUNTRY).catch(error => {
      expect(error).toBeInstanceOf(NotFound);
      expect(error.message).toContain('administrative division');
      expect(error.stack).toContain('Caused by');
      expect(error.stack).toContain('No AdministrativeDivision found');
      next();
    });
  });

  it('should raise an error if a given administrative division cannot be found', next => {
    const axiosInstance = stubAxiosInstance();
    axiosInstance.get.rejects(stubAxiosNotFound('No AdministrativeDivision found'));
    const restAdministrativeDivisionRepository = new RestAdministrativeDivisionRepository(axiosInstance, 'production');
    restAdministrativeDivisionRepository.find(AdministrativeDivisionTypes.STATE, '01').catch(error => {
      expect(error).toBeInstanceOf(NotFound);
      expect(error.message).toContain('administrative division');
      expect(error.stack).toContain('Caused by');
      expect(error.stack).toContain('No AdministrativeDivision found');
      next();
    });
  });

  it('should return a list of administrative divisions', async () => {
    const axiosInstance = stubAxiosInstance();
    const restSummaries = [
      restAdministrativeDivisionSummary(),
      restAdministrativeDivisionSummary({ id: '02', entidadId: '', nombre: 'BAJA CALIFORNIA' }),
    ];
    axiosInstance.get.resolves({ data: restSummaries });
    const restAdministrativeDivisionRepository = new RestAdministrativeDivisionRepository(axiosInstance, 'production');
    const list = await restAdministrativeDivisionRepository.list(AdministrativeDivisionTypes.STATE);
    const [first, second] = list;
    expect(list).toHaveLength(2);
    expect(axiosInstance.get.getCall(0).args[0]).toBe('entidades');
    expect(first).toEqual<AdministrativeDivisionSummary>({
      id: '01',
      name: 'AGUASCALIENTES',
      stateId: '',
      studentAttendance: 0.68,
      teacherAttendance: 0.95,
      adminAttendance: 0.97,
    });
    expect(second).toEqual<AdministrativeDivisionSummary>({
      id: '02',
      name: 'BAJA CALIFORNIA',
      stateId: '',
      studentAttendance: 0.68,
      teacherAttendance: 0.95,
      adminAttendance: 0.97,
    });
  });

  it('should return a given administrative division', async () => {
    const axiosInstance = stubAxiosInstance();
    const restState = restAdministrativeDivision();
    axiosInstance.get.resolves({ data: restState });
    const restAdministrativeDivisionRepository = new RestAdministrativeDivisionRepository(axiosInstance, 'production');
    const administrativeDivision = await restAdministrativeDivisionRepository.find(AdministrativeDivisionTypes.STATE, '03');
    expect(axiosInstance.get.getCall(0).args[0]).toBe('entidades?cod_entidad=03');
    expect(administrativeDivision).toEqual<AdministrativeDivision>({
      id: '03',
      name: 'BAJA CALIFORNIA SUR',
      lastUpdateDate: LocalDate.of('2020-06-16'),
      type: AdministrativeDivisionTypes.STATE,
      stateId: '',
      support: { private: 0.3, public: 0.7 },
      studentAttendance: 0.74,
      teacherAttendance: 0.97,
      adminAttendance: 0.98,
      maleStudentAbsencePercentageOverStudentAbsence: 0.12,
      femaleStudentAbsencePercentageOverStudentAbsence: 0.14,
      schools: 759,
      students: 101837,
      femaleStudents: 50196,
      maleStudents: 51641,
      maleStudentPercentage: 0.51,
      femaleStudentPercentage: 0.49,
      teachers: 4058,
      assistants: 4060,
      directors: 590,
      subDirectors: 291,
      technicalPedagogicalAdvisers: 0,
      physicalEducationTeachers: 539,
      admins: 2192,
      quartermasters: 1022,
      others: 0,
      schoolGivingClasses: { '1': 607, '2': 30, '3': 21, '4': 29, '5': 25, '6': 17, '7': 30 },
      schoolGivingClassesPercentages: { '1': 0.8, '2': 0.04, '3': 0.03, '4': 0.04, '5': 0.03, '6': 0.02, '7': 0.04 },
      schoolWaterSupply: { '1': 196, '2': 185, '3': 188, '4': 190 },
      schoolWaterSupplyPercentages: { '1': 0.26, '2': 0.24, '3': 0.25, '4': 0.25 },
      schoolWaterServiceContinuity: { '1': 202, '2': 191, '3': 176, '4': 190 },
      schoolWaterServiceContinuityPercentages: { '1': 0.27, '2': 0.25, '3': 0.23, '4': 0.25 },
      schoolWithWaterForHandWashing: { '1': 301, '2': 458 },
      schoolWithWaterForHandWashingPercentages: { '1': 0.4, '2': 0.6 },
      schoolSinkSufficiency: { '1': 282, '2': 249, '3': 228 },
      schoolSinkSufficiencyPercentages: { '1': 0.37, '2': 0.33, '3': 0.3 },
      schoolSoapSufficiency: { '1': 249, '2': 248, '3': 262 },
      schoolSoapSufficiencyPercentages: { '1': 0.33, '2': 0.33, '3': 0.35 },
      schoolTowelSufficiency: { '1': 256, '2': 244, '3': 259 },
      schoolTowelSufficiencyPercentages: { '1': 0.34, '2': 0.32, '3': 0.34 },
      schoolSanitizerSufficiency: { '1': 254, '2': 251, '3': 254 },
      schoolSanitizerSufficiencyPercentages: { '1': 0.33, '2': 0.33, '3': 0.33 },
      schoolBinSufficiency: { '1': 270, '2': 249, '3': 240 },
      schoolBinSufficiencyPercentages: { '1': 0.36, '2': 0.33, '3': 0.32 },
      schoolWithSepticSystem: { '1': 372, '2': 387 },
      schoolWithSepticSystemPercentages: { '1': 0.49, '2': 0.51 },
      schoolWithAbilityToReorganizeSpace: { '1': 359, '2': 400 },
      schoolWithAbilityToReorganizeSpacePercentages: { '1': 0.47, '2': 0.53 },
      hygieneCommittee: { '1': 298, '2': 461 },
      hygieneCommitteePercentages: { '1': 0.39, '2': 0.61 },
      alternatesAttendance: { '1': 263, '2': 496 },
      alternatesAttendancePercentages: { '1': 0.35, '2': 0.65 },
      absentFemaleStudents: 9747,
      absentMaleStudents: 8233,
      studentAbsenceMainReasons: { '1': 379, '2': 5733, '3': 1551, '4': 6957, '5': 3360 },
      studentAbsenceMainReasonsPercentages: { '1': 0.02, '2': 0.32, '3': 0.09, '4': 0.39, '5': 0.19 },
      absentTeachers: 171,
      teacherAbsenceMainReasons: { '1': 0, '2': 171, '3': 0, '4': 0 },
      teacherAbsenceMainReasonsPercentages: { '1': 0, '2': 1, '3': 0, '4': 0 },
      absentAdmins: 83,
      adminAbsenceMainReasons: { '1': 0, '2': 83, '3': 0, '4': 0 },
      adminAbsenceMainReasonsPercentages: { '1': 0, '2': 1, '3': 0, '4': 0 },
      takenActions: { visits: 314, calls: 301, scholarship: 299, none: 299 },
      takenActionsPercentages: { visits: 0.41, calls: 0.4, scholarship: 0.39, none: 0.39 },
      drinkers: 1024,
      maleStudentToilets: 2268,
      femaleStudentToilets: 2281,
      foodSupport: { '1': 336, '2': 423 },
      foodSupportPercentages: { '1': 0.44, '2': 0.56 },
      foodSupportType: { dif: 172, fullTimeProgram: 160, state: 177, others: 168 },
      foodSupportTypePercentages: { dif: 0.23, fullTimeProgram: 0.21, state: 0.23, others: 0.22 },
      theSchoolIsOurs: { '1': 319, '2': 440 },
      theSchoolIsOursPercentages: { '1': 0.42, '2': 0.58 },
    });
  });

  it('should use URLs dedicated to development', async () => {
    const axiosInstance = stubAxiosInstance();
    axiosInstance.get.resolves({ data: [] });
    const restAdminRepository = new RestAdministrativeDivisionRepository(axiosInstance, 'development');
    await restAdminRepository.list(AdministrativeDivisionTypes.COUNTRY);
    await restAdminRepository.list(AdministrativeDivisionTypes.STATE);
    await restAdminRepository.list(AdministrativeDivisionTypes.MUNICIPALITY);
    axiosInstance.get.resolves({ data: restAdministrativeDivision() });
    await restAdminRepository.find(AdministrativeDivisionTypes.COUNTRY, '');
    await restAdminRepository.find(AdministrativeDivisionTypes.STATE, '01');
    await restAdminRepository.find(AdministrativeDivisionTypes.MUNICIPALITY, '01001');
    expect(axiosInstance.get.getCall(0).args[0]).toBe('country.json');
    expect(axiosInstance.get.getCall(1).args[0]).toBe('states.json');
    expect(axiosInstance.get.getCall(2).args[0]).toBe('municipalities.json');
    expect(axiosInstance.get.getCall(3).args[0]).toBe('country.json');
    expect(axiosInstance.get.getCall(4).args[0]).toBe('state.json');
    expect(axiosInstance.get.getCall(5).args[0]).toBe('municipality.json');
  });

  it('should use URLs dedicated to production', async () => {
    const axiosInstance = stubAxiosInstance();
    axiosInstance.get.resolves({ data: [] });
    const restAdminRepository = new RestAdministrativeDivisionRepository(axiosInstance, 'production');
    await restAdminRepository.list(AdministrativeDivisionTypes.COUNTRY);
    await restAdminRepository.list(AdministrativeDivisionTypes.STATE);
    await restAdminRepository.list(AdministrativeDivisionTypes.MUNICIPALITY);
    axiosInstance.get.resolves({ data: restAdministrativeDivision() });
    await restAdminRepository.find(AdministrativeDivisionTypes.COUNTRY, '');
    await restAdminRepository.find(AdministrativeDivisionTypes.STATE, '01');
    await restAdminRepository.find(AdministrativeDivisionTypes.MUNICIPALITY, '01001');
    expect(axiosInstance.get.getCall(0).args[0]).toBe('pais');
    expect(axiosInstance.get.getCall(1).args[0]).toBe('entidades');
    expect(axiosInstance.get.getCall(2).args[0]).toBe('municipios');
    expect(axiosInstance.get.getCall(3).args[0]).toBe('pais');
    expect(axiosInstance.get.getCall(4).args[0]).toBe('entidades?cod_entidad=01');
    expect(axiosInstance.get.getCall(5).args[0]).toBe('municipios/?cod_entidad=01&cod_mun=001');
  });
});
