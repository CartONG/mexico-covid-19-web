import { createLocalVue, shallowMount } from '@vue/test-utils';
import Buefy from 'buefy';

import { InfoModalComponent, InfoModalVue } from '@/primary/info-modal';

describe('InfoModal', () => {
  it('should be a Vue instance', () => {
    const localVue = createLocalVue();
    localVue.use(Buefy);
    const wrapper = shallowMount<InfoModalComponent>(InfoModalVue, { localVue });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
