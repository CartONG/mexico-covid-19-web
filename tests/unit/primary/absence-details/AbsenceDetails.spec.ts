import sinon from 'sinon';

import { shallowMount, Wrapper } from '@vue/test-utils';

import { makeAdministrativeDivision } from '../AdministrativeDivision.fixture';
import { makeSchool } from '../School.fixture';

import { AdministrativeDivision } from '@/domain/administrative-division/AdministrativeDivision';
import { AttendanceType } from '@/domain/AttendanceType';
import { School } from '@/domain/school/School';
import { AbsenceDetailsComponent, AbsenceDetailsVue } from '@/primary/absence-details';
import { AbsenceDetailsDataSet, toAbsenceDetailsDataSet } from '@/primary/absence-details/AbsenceDetailsDataSet';
import * as pieChart from '@/primary/absence-details/PieChart';

let wrapper: Wrapper<AbsenceDetailsComponent>;
let component: AbsenceDetailsComponent;
const makeChartSpy = sinon.spy(pieChart, 'makeChart');
const updateChartSpy = sinon.spy(pieChart, 'updateChart');

interface WrapOptions {
  administrativeDivision: AdministrativeDivision | null;
  school: School | null;
  administrativeDivisionLevel: boolean;
  attendanceType: AttendanceType;
}

const wrap = (override: Partial<WrapOptions> = {}) => {
  const options = {
    administrativeDivision: makeAdministrativeDivision(),
    school: makeSchool(),
    administrativeDivisionLevel: true,
    attendanceType: AttendanceType.STUDENT,
    ...override,
  };

  wrapper = shallowMount<AbsenceDetailsComponent>(AbsenceDetailsVue, {
    propsData: {
      administrativeDivision: options.administrativeDivision,
      school: options.school,
      administrativeDivisionLevel: options.administrativeDivisionLevel,
      attendanceType: options.attendanceType,
    },
  });
  component = wrapper.vm;
};

const expectChartSetup = (dataSet: AbsenceDetailsDataSet) => {
  expect(component.absenceDetailsDataSet).toEqual<AbsenceDetailsDataSet>(dataSet);
  expect(makeChartSpy.getCall(0).args).toEqual(['absence-details-chart', 75, { top: 0, right: 0, bottom: 0, left: 0 }]);
  expect(updateChartSpy.getCall(0).args).toEqual(['absence-details-chart', 75, dataSet.chart.data, dataSet.chart.colors]);
};

describe('AbsenceDetails', () => {
  beforeEach(() => {
    makeChartSpy.resetHistory();
    updateChartSpy.resetHistory();
  });

  it('should be a Vue instance', () => {
    wrap();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('should setup chart for administrative division', async () => {
    const dataSet = toAbsenceDetailsDataSet(makeAdministrativeDivision(), AttendanceType.STUDENT);
    await wrap();
    expectChartSetup(dataSet);
  });

  it('should setup chart for school', async () => {
    const dataSet = toAbsenceDetailsDataSet(makeSchool(), AttendanceType.PERSONAL);
    await wrap({ administrativeDivisionLevel: false, attendanceType: AttendanceType.PERSONAL });
    expectChartSetup(dataSet);
  });

  it('should setup default chart', async () => {
    const dataSet = toAbsenceDetailsDataSet(null, AttendanceType.TEACHER);
    await wrap({ administrativeDivision: null, attendanceType: AttendanceType.TEACHER });
    expectChartSetup(dataSet);
  });

  it('should emit change event', () => {
    wrap();
    component.change(AttendanceType.TEACHER);
    expect(wrapper.emitted().change[0]).toEqual([AttendanceType.TEACHER]);
  });

  it('should update chart', async () => {
    const dataSet = toAbsenceDetailsDataSet(makeSchool(), AttendanceType.STUDENT);
    await wrap();
    await wrapper.setProps({ administrativeDivisionLevel: false });
    expect(updateChartSpy.getCall(1).args).toEqual(['absence-details-chart', 75, dataSet.chart.data, dataSet.chart.colors]);
  });
});
