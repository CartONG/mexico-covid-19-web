import { createLocalVue, shallowMount } from '@vue/test-utils';
import Buefy from 'buefy';

import { HistoricInfoModalComponent, HistoricInfoModalVue } from '@/primary/historic-info-modal';

describe('HistoricInfoModal', () => {
  it('should be a Vue instance', () => {
    const localVue = createLocalVue();
    localVue.use(Buefy);
    const wrapper = shallowMount<HistoricInfoModalComponent>(HistoricInfoModalVue, { localVue });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
