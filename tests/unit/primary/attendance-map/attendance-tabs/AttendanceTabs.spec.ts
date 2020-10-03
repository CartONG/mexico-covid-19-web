import { shallowMount, Wrapper } from '@vue/test-utils';

import { stubAttendanceTypeBus } from '../../../TestUtils';
import { makeSchoolSummary } from '../../SchoolSummary.fixture';

import { AttendanceType } from '@/domain/AttendanceType';
import { AttendanceTabsComponent, AttendanceTabsVue } from '@/primary/attendance-map/attendance-tabs';
import { SummaryDataSet, toSummaryDataSet } from '@/primary/common/SummaryDataSet';

let wrapper: Wrapper<AttendanceTabsComponent>;
let component: AttendanceTabsComponent;

const wrap = (attendanceTypeBus = stubAttendanceTypeBus()) => {
  wrapper = shallowMount<AttendanceTabsComponent>(AttendanceTabsVue, {
    propsData: {
      summary: makeSchoolSummary(),
      inline: false,
      printable: false,
      attendanceType: AttendanceType.STUDENT,
    },
    provide: {
      attendanceTypeBus: () => attendanceTypeBus,
    },
  });
  component = wrapper.vm;
};

describe('AttendanceTabs', () => {
  it('should be a Vue instance', () => {
    wrap();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('should set summary data set', () => {
    wrap();
    expect(component.summaryDataSet).toEqual<SummaryDataSet>(toSummaryDataSet(makeSchoolSummary()));
  });

  it('should select attendance type', () => {
    const attendanceTypeBus = stubAttendanceTypeBus();
    wrap(attendanceTypeBus);
    component.selectAttendanceType(AttendanceType.TEACHER);
    expect(attendanceTypeBus.switchAttendanceType.getCall(0).args[0]).toBe(AttendanceType.TEACHER);
  });
});
