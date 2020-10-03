import { shallowMount, Wrapper } from '@vue/test-utils';

import { makeSchool } from '../School.fixture';

import { SchoolDataSet, toSchoolDataSet } from '@/primary/common/SchoolDataSet';
import { SchoolIndicatorsComponent, SchoolIndicatorsVue } from '@/primary/school-indicators';

let wrapper: Wrapper<SchoolIndicatorsComponent>;
let component: SchoolIndicatorsComponent;

const wrap = () => {
  wrapper = shallowMount<SchoolIndicatorsComponent>(SchoolIndicatorsVue, {
    propsData: {
      school: makeSchool(),
      inline: true,
    },
  });
  component = wrapper.vm;
};

describe('SchoolIndicators', () => {
  it('should be a Vue instance', () => {
    wrap();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('should be a school data set', () => {
    const dataSet = toSchoolDataSet(makeSchool());
    wrap();
    expect(component.schoolDataSet).toEqual<SchoolDataSet>(dataSet);
  });
});
