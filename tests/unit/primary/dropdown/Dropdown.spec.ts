import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils';
import Buefy from 'buefy';

import { stubNavigationBus } from '../../TestUtils';
import { makeSchoolSummary } from '../SchoolSummary.fixture';

import { AdministrativeLevels } from '@/domain/AdministrativeLevels';
import { Summary } from '@/domain/Summary';
import { DropdownComponent, DropdownVue } from '@/primary/dropdown';
import { NavigationBus } from '@/primary/navigation/NavigationBus';

let wrapper: Wrapper<DropdownComponent>;
let component: DropdownComponent;

interface WrapOptions {
  navigationBus: NavigationBus;
  items: Summary[];
  administrativeLevel: AdministrativeLevels;
}

const wrap = (override: Partial<WrapOptions> = {}) => {
  const options = {
    navigationBus: stubNavigationBus(),
    items: [],
    administrativeLevel: AdministrativeLevels.COUNTRY,
    ...override,
  };
  const localVue = createLocalVue();
  localVue.use(Buefy);
  wrapper = shallowMount<DropdownComponent>(DropdownVue, {
    localVue,
    propsData: {
      items: options.items,
      administrativeLevel: options.administrativeLevel,
    },
    provide: {
      navigationBus: () => options.navigationBus,
    },
  });
  component = wrapper.vm;
};

describe('Dropdown', () => {
  it('should be a Vue instance', () => {
    wrap();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('should sort items', () => {
    const items = [
      makeSchoolSummary({ id: '0', name: 'b' }),
      makeSchoolSummary({ id: '1', name: 'c' }),
      makeSchoolSummary({ id: '2', name: 'a' }),
    ];
    wrap({ items });
    const [item1, item2, item3] = component.sortedItems;
    expect(item1.name).toBe('a');
    expect(item2.name).toBe('b');
    expect(item3.name).toBe('c');
  });

  it('should filter items', () => {
    const items = [
      makeSchoolSummary({ id: '0', name: 'ba' }),
      makeSchoolSummary({ id: '1', name: 'ce' }),
      makeSchoolSummary({ id: '2', name: 'ar' }),
      makeSchoolSummary({ id: '3', name: 'ee' }),
    ];
    wrap({ items });
    component.text = 'a';
    const [item1, item2] = component.filteredItems;
    expect(item1.name).toBe('ar');
    expect(item2.name).toBe('ba');
  });

  it('should navigate to state', () => {
    const navigationBus = stubNavigationBus();
    wrap({ navigationBus });
    component.selectItem(makeSchoolSummary({ id: '0', name: 'test' }));
    expect(navigationBus.goToState.calledOnce).toBeTruthy();
    expect(navigationBus.goToState.getCall(0).args[0]).toEqual({ id: '0', name: 'test' });
  });

  it('should navigate to municipality', () => {
    const navigationBus = stubNavigationBus();
    wrap({ navigationBus, administrativeLevel: AdministrativeLevels.STATE });
    component.selectItem(makeSchoolSummary({ id: '0', name: 'test' }));
    expect(navigationBus.goToMunicipality.calledOnce).toBeTruthy();
    expect(navigationBus.goToMunicipality.getCall(0).args[0]).toEqual({ id: '0', name: 'test' });
  });

  it('should navigate to school #1', () => {
    const navigationBus = stubNavigationBus();
    wrap({ navigationBus, administrativeLevel: AdministrativeLevels.MUNICIPALITY });
    component.selectItem(makeSchoolSummary({ id: '0', name: 'test' }));
    expect(navigationBus.goToSchool.calledOnce).toBeTruthy();
    expect(navigationBus.goToSchool.getCall(0).args[0]).toEqual({ id: '0', name: 'test' });
  });

  it('should navigate to school #2', () => {
    const navigationBus = stubNavigationBus();
    wrap({ navigationBus, administrativeLevel: AdministrativeLevels.SCHOOL });
    component.selectItem(makeSchoolSummary({ id: '0', name: 'test' }));
    expect(navigationBus.goToSchool.calledOnce).toBeTruthy();
    expect(navigationBus.goToSchool.getCall(0).args[0]).toEqual({ id: '0', name: 'test' });
  });

  it('should not navigate', () => {
    const navigationBus = stubNavigationBus();
    wrap({ navigationBus, administrativeLevel: AdministrativeLevels.SCHOOL });
    component.selectItem(null);
    expect(navigationBus.goToSchool.called).toBeFalsy();
    expect(navigationBus.goToMunicipality.called).toBeFalsy();
    expect(navigationBus.goToState.called).toBeFalsy();
  });
});
