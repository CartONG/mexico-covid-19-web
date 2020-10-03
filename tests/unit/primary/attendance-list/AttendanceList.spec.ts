import { shallowMount, Wrapper } from '@vue/test-utils';

import { NavigationBusStub, stubNavigationBus } from '../../TestUtils';

import { AdministrativeLevels } from '@/domain/AdministrativeLevels';
import { AttendanceType } from '@/domain/AttendanceType';
import { Summary } from '@/domain/Summary';
import { AttendanceListComponent, AttendanceListVue } from '@/primary/attendance-list';
import { AttendanceListDataSet, toAttendanceListDataSet } from '@/primary/attendance-list/AttendanceListDataSet';
import { NavigationParams } from '@/primary/navigation/NavigationParams';

let wrapper: Wrapper<AttendanceListComponent>;
let component: AttendanceListComponent;

interface WrapperOptions {
  navigationBus: NavigationBusStub;
  summaries: Summary[];
  attendanceType: AttendanceType;
  navigation: NavigationParams[];
  administrativeLevel: AdministrativeLevels;
}

const wrap = (override: Partial<WrapperOptions> = {}) => {
  const options = {
    navigationBus: stubNavigationBus(),
    summaries: [],
    attendanceType: AttendanceType.STUDENT,
    navigation: [],
    administrativeLevel: AdministrativeLevels.COUNTRY,
    ...override,
  };
  wrapper = shallowMount<AttendanceListComponent>(AttendanceListVue, {
    propsData: {
      summaries: options.summaries,
      attendanceType: options.attendanceType,
      navigation: options.navigation,
      administrativeLevel: options.administrativeLevel,
    },
    provide: {
      navigationBus: () => options.navigationBus,
    },
  });
  component = wrapper.vm;
};

describe('AttendanceList', () => {
  it('should be a Vue instance', () => {
    wrap();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('should set attendance list data set', () => {
    wrap();
    expect(component.attendanceListDataSet).toEqual<AttendanceListDataSet>(
      toAttendanceListDataSet(AdministrativeLevels.COUNTRY, AttendanceType.STUDENT, [])
    );
  });

  it('should set attendance list school id', () => {
    wrap();
    expect(component.schoolId).toBe('');
    const navigation: NavigationParams[] = [
      { id: '0', name: 'test' },
      { id: '0', name: 'test' },
      { id: '0', name: 'test' },
    ];
    wrapper.setProps({ navigation });
    expect(component.schoolId).toBe('0');
  });

  it('should navigate', () => {
    const navigationBusStub = stubNavigationBus();
    wrap({ navigationBus: navigationBusStub });
    component.goTo('0', 'test');
    expect(navigationBusStub.goToState.getCall(0).args[0]).toEqual({ id: '0', name: 'test' });
    wrapper.setProps({ administrativeLevel: AdministrativeLevels.STATE });
    component.goTo('0', 'test');
    expect(navigationBusStub.goToMunicipality.getCall(0).args[0]).toEqual({ id: '0', name: 'test' });
    wrapper.setProps({ administrativeLevel: AdministrativeLevels.MUNICIPALITY });
    component.goTo('0', 'test');
    expect(navigationBusStub.goToSchool.getCall(0).args[0]).toEqual({ id: '0', name: 'test' });
    wrapper.setProps({ administrativeLevel: AdministrativeLevels.SCHOOL });
    component.goTo('0', 'test');
    expect(navigationBusStub.goToSchool.getCall(1).args[0]).toEqual({ id: '0', name: 'test' });
  });

  it('should emit sort event', () => {
    wrap();
    component.sort('field', 'order');
    expect(wrapper.emitted().sort[0]).toEqual([['field', 'order']]);
  });
});
