import { shallowMount, Wrapper } from '@vue/test-utils';

import { stubAttendanceWebmapping, stubDelayer, stubNavigationBus } from '../../TestUtils';
import { makeSchool } from '../School.fixture';
import { makeSchoolSummary } from '../SchoolSummary.fixture';

import { AttendanceType } from '@/domain/AttendanceType';
import { AttendanceMapComponent, AttendanceMapVue } from '@/primary/attendance-map';
import { AttendanceWebmapping } from '@/primary/attendance-webmapping/AttendanceWebmapping';

let wrapper: Wrapper<AttendanceMapComponent>;
let component: AttendanceMapComponent;

const wrap = (attendanceWebmapping: AttendanceWebmapping = stubAttendanceWebmapping(), navigationBus = stubNavigationBus()) => {
  wrapper = shallowMount<AttendanceMapComponent>(AttendanceMapVue, {
    propsData: {
      school: makeSchool(),
      schoolsSummaries: [],
      summary: makeSchoolSummary(),
      inline: false,
      printable: false,
      attendanceType: AttendanceType.STUDENT,
      mapExtent: null,
    },
    provide: {
      navigationBus: () => navigationBus,
      attendanceWebmapping: () => attendanceWebmapping,
      updateMapViewportDelayer: () => stubDelayer(),
    },
  });
  component = wrapper.vm;
};

describe('AttendanceMap', () => {
  it('should be a Vue instance', () => {
    wrap();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('should register to events', () => {
    const attendanceWebmapping = stubAttendanceWebmapping();
    const navigationBus = stubNavigationBus();
    wrap(attendanceWebmapping, navigationBus);
    expect(attendanceWebmapping.onSelectState.calledOnce).toBeTruthy();
    expect(attendanceWebmapping.onSelectMunicipality.calledOnce).toBeTruthy();
    expect(attendanceWebmapping.onSelectSchool.calledOnce).toBeTruthy();
    expect(attendanceWebmapping.onSelectSchoolCluster.calledOnce).toBeTruthy();
    expect(navigationBus.onBackToCountry.calledOnce).toBeTruthy();
    expect(navigationBus.onGoToState.calledOnce).toBeTruthy();
    expect(navigationBus.onBackToState.calledOnce).toBeTruthy();
    expect(navigationBus.onGoToMunicipality.calledOnce).toBeTruthy();
    expect(navigationBus.onBackToMunicipality.calledOnce).toBeTruthy();
    expect(navigationBus.onGoToSchool.calledOnce).toBeTruthy();
  });

  it('should setup web map', async () => {
    const attendanceWebmapping = stubAttendanceWebmapping();
    await wrap(attendanceWebmapping);
    expect(attendanceWebmapping.addControls.calledOnce).toBeTruthy();
    expect(attendanceWebmapping.setMapTarget.calledOnce).toBeTruthy();
    expect(attendanceWebmapping.setPopupElement.calledOnce).toBeTruthy();
    expect(attendanceWebmapping.switchAttendanceType.calledOnce).toBeTruthy();
    expect(attendanceWebmapping.adjust.calledOnce).toBeTruthy();
  });

  it('should clean before destroy', async () => {
    const attendanceWebmapping = stubAttendanceWebmapping();
    await wrap(attendanceWebmapping);
    await wrapper.destroy();
    expect(wrapper.emitted().destroy.length).toBe(1);
    expect(attendanceWebmapping.removeControls.calledOnce).toBeTruthy();
    expect(attendanceWebmapping.setMapTarget.calledTwice).toBeTruthy();
  });

  it('should go back to country', async () => {
    const attendanceWebmapping = stubAttendanceWebmapping();
    const navigationBus = stubNavigationBus();
    wrap(attendanceWebmapping, navigationBus);
    await component.goBackToCountry();
    expect(attendanceWebmapping.fitToCountry.calledOnce).toBeTruthy();
    expect(navigationBus.backToCountry.calledOnce).toBeTruthy();
  });

  it('should navigate to school', () => {
    const navigationBus = stubNavigationBus();
    wrap(undefined, navigationBus);
    component.pickSchool({ id: '0', name: 'test' });
    expect(navigationBus.goToSchool.getCall(0).args[0]).toEqual({ id: '0', name: 'test' });
  });

  it('should watch school summaries', async () => {
    const attendanceWebmapping = stubAttendanceWebmapping();
    await wrap(attendanceWebmapping);
    await wrapper.setProps({ schoolsSummaries: [makeSchoolSummary()] });
    expect(attendanceWebmapping.setSchoolsFeatures.getCall(0).args[0]).toEqual([makeSchoolSummary()]);
  });

  it('should watch attendanceType', async () => {
    const attendanceWebmapping = stubAttendanceWebmapping();
    await wrap(attendanceWebmapping);
    await wrapper.setProps({ attendanceType: AttendanceType.TEACHER });
    expect(attendanceWebmapping.switchAttendanceType.getCall(1).args[0]).toBe(AttendanceType.TEACHER);
  });

  it('should watch mapExtent', async () => {
    const attendanceWebmapping = stubAttendanceWebmapping();
    await wrap(attendanceWebmapping);
    await wrapper.setProps({ mapExtent: [1, 1, 1, 1] });
    expect(attendanceWebmapping.adjust.getCall(1).args[0]).toEqual([1, 1, 1, 1]);
  });
});
