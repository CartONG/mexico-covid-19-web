import { shallowMount, Wrapper } from '@vue/test-utils';

import { makeAdministrativeDivision } from '../AdministrativeDivision.fixture';

import {
  AdministrativeDivisionIndicatorsComponent,
  AdministrativeDivisionIndicatorsVue,
} from '@/primary/administrative-division-indicators';
import { AdministrativeDivisionDataSet, toAdministrativeDivisionDataset } from '@/primary/common/AdministrativeDivisionDataSet';

let wrapper: Wrapper<AdministrativeDivisionIndicatorsComponent>;
let component: AdministrativeDivisionIndicatorsComponent;

const wrap = () => {
  wrapper = shallowMount<AdministrativeDivisionIndicatorsComponent>(AdministrativeDivisionIndicatorsVue, {
    propsData: {
      administrativeDivision: makeAdministrativeDivision(),
    },
  });
  component = wrapper.vm;
};

describe('AdministrativeDivisionIndicators', () => {
  it('should be a Vue instance', () => {
    wrap();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('should set administrative division data set', () => {
    const dataSet = toAdministrativeDivisionDataset(makeAdministrativeDivision());
    wrap();
    expect(component.administrativeDivisionDataSet).toEqual<AdministrativeDivisionDataSet>(dataSet);
  });
});
