import { shallowMount, Wrapper } from '@vue/test-utils';

import { PopupComponent, PopupVue } from '@/primary/attendance-map/popup';

let wrapper: Wrapper<PopupComponent>;
let component: PopupComponent;

const wrap = () => {
  wrapper = shallowMount<PopupComponent>(PopupVue, {
    propsData: {
      items: [{ id: '0', name: 'test' }],
    },
  });
  component = wrapper.vm;
};

describe('Popup', () => {
  it('should be a Vue instance', () => {
    wrap();
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it('should close popup', () => {
    wrap();
    component.close();
    expect(wrapper.emitted().close.length).toBe(1);
  });
});
