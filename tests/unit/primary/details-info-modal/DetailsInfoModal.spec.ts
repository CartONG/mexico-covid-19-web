import { createLocalVue, shallowMount } from '@vue/test-utils';
import Buefy from 'buefy';

import { DetailsInfoModalComponent, DetailsInfoModalVue } from '@/primary/details-info-modal';

describe('DetailsInfoModal', () => {
  it('should be a Vue instance', () => {
    const localVue = createLocalVue();
    localVue.use(Buefy);
    const wrapper = shallowMount<DetailsInfoModalComponent>(DetailsInfoModalVue, { localVue });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
