import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils';
import Buefy from 'buefy';

import { makeSchool } from '../School.fixture';

import { SchoolDataSet, toSchoolDataSet } from '@/primary/common/SchoolDataSet';
import { SchoolDetailsComponent, SchoolDetailsVue } from '@/primary/school-details';
import SchoolDetails from '@/primary/school-details/SchoolDetails.component';

let wrapper: Wrapper<SchoolDetailsComponent>;
let component: SchoolDetailsComponent;

const wrap = () => {
  const localVue = createLocalVue();
  localVue.use(Buefy);
  wrapper = shallowMount<SchoolDetailsComponent>(SchoolDetailsVue, {
    localVue,
    propsData: {
      school: makeSchool(),
      printable: false,
    },
  });
  component = wrapper.vm;
};

describe('SchoolDetails', () => {
  it('should be a Vue instance', () => {
    wrap();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('should set school data set', () => {
    wrap();
    expect(component.schoolDataSet).toEqual<SchoolDataSet>(toSchoolDataSet(makeSchool()));
  });
});
