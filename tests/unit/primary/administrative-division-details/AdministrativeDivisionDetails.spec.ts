import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils';
import Buefy from 'buefy';

import { makeAdministrativeDivision } from '../AdministrativeDivision.fixture';

import { AdministrativeDivisionDetailsComponent, AdministrativeDivisionDetailsVue } from '@/primary/administrative-division-details';
import { AdministrativeDivisionDataSet, toAdministrativeDivisionDataset } from '@/primary/common/AdministrativeDivisionDataSet';

let wrapper: Wrapper<AdministrativeDivisionDetailsComponent>;
let component: AdministrativeDivisionDetailsComponent;

const wrap = () => {
  const localVue = createLocalVue();
  localVue.use(Buefy);
  wrapper = shallowMount<AdministrativeDivisionDetailsComponent>(AdministrativeDivisionDetailsVue, {
    localVue,
    propsData: {
      administrativeDivision: makeAdministrativeDivision(),
      printable: false,
    },
  });
  component = wrapper.vm;
};

describe('AdministrativeDivisionDetails', () => {
  it('should be a Vue instance', () => {
    wrap();
    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.vm.administrativeDivisionDataSet).toEqual<AdministrativeDivisionDataSet>(
      toAdministrativeDivisionDataset(makeAdministrativeDivision())
    );
  });

  it('should set administrative division data set', () => {
    wrap();
    expect(wrapper.vm.administrativeDivisionDataSet).toEqual<AdministrativeDivisionDataSet>(
      toAdministrativeDivisionDataset(makeAdministrativeDivision())
    );
  });
});
