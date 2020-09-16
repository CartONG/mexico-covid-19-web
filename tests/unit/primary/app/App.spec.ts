import { shallowMount } from '@vue/test-utils';

import { AppComponent, AppVue } from '@/primary/app';

describe('Appp.vue', () => {
  it('Should be a Vue instance', () => {
    const wrapper = shallowMount<AppComponent>(AppVue);
    expect(wrapper.exists()).toBeTruthy();
  });
});
