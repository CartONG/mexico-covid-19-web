import { shallowMount, Wrapper } from '@vue/test-utils';

import { stubNavigationBus } from '../../TestUtils';

import { BreadcrumbComponent, BreadcrumbVue } from '@/primary/breadcrumb';
import { BreadcrumbDataSet, toBreadcrumbDataSet } from '@/primary/breadcrumb/BreadcrumbDataSet';

let wrapper: Wrapper<BreadcrumbComponent>;
let component: BreadcrumbComponent;

const wrap = (navigationBus = stubNavigationBus()) => {
  wrapper = shallowMount<BreadcrumbComponent>(BreadcrumbVue, {
    propsData: {
      navigation: [],
      printable: false,
    },
    provide: {
      navigationBus: () => navigationBus,
    },
  });
  component = wrapper.vm;
};

describe('Breadcrumb', () => {
  it('should be a Vue instance', () => {
    wrap();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('should set navigation data set', () => {
    wrap();
    expect(component.breadcrumbDataSet).toEqual(toBreadcrumbDataSet([]));
  });

  it('should go back to country', () => {
    const navigationBus = stubNavigationBus();
    wrap(navigationBus);
    component.backToCountry();
    expect(navigationBus.backToCountry.calledOnce).toBeTruthy();
  });

  it('should go back to state', () => {
    const navigationBus = stubNavigationBus();
    wrap(navigationBus);
    component.backToState({ id: '0', name: 'test' });
    expect(navigationBus.backToState.getCall(0).args[0]).toEqual({ id: '0', name: 'test' });
  });

  it('should go back to municipality', () => {
    const navigationBus = stubNavigationBus();
    wrap(navigationBus);
    component.backToMunicipality({ id: '0', name: 'test' });
    expect(navigationBus.backToMunicipality.getCall(0).args[0]).toEqual({ id: '0', name: 'test' });
  });
});
