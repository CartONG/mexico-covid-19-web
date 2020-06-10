import { shallowMount, Wrapper } from '@vue/test-utils';

import { AppComponent, AppVue } from '@/primary/app';

let wrapper: Wrapper<AppComponent>;
let component: AppComponent;

const wrap = () => {
  wrapper = shallowMount<AppComponent>(AppVue);
  component = wrapper.vm;
};

describe('App', () => {
  it('should be a Vue instance', () => {
    wrap();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
