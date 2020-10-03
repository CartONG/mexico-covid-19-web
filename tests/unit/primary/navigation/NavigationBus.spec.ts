import sinon from 'sinon';

import { Vue } from 'vue-property-decorator';

import { NavigationBus } from '@/primary/navigation/NavigationBus';

describe('NavigationBus', () => {
  it('should register to back to country', () => {
    const navigationBus = new NavigationBus(new Vue());
    const listener = sinon.stub();
    navigationBus.onBackToCountry(listener);
    navigationBus.backToCountry();
    expect(listener.calledOnce).toBeTruthy();
  });

  it('should register to back to state', () => {
    const navigationBus = new NavigationBus(new Vue());
    const listener = sinon.stub();
    navigationBus.onBackToState(listener);
    navigationBus.backToState({ id: 'state ID', name: 'state name' });
    expect(listener.calledOnce).toBeTruthy();
    expect(listener.getCall(0).args[0]).toEqual({ id: 'state ID', name: 'state name' });
  });

  it('should register to back to country', () => {
    const navigationBus = new NavigationBus(new Vue());
    const listener = sinon.stub();
    navigationBus.onBackToMunicipality(listener);
    navigationBus.backToMunicipality({ id: 'mun ID', name: 'mun name' });
    expect(listener.calledOnce).toBeTruthy();
    expect(listener.getCall(0).args[0]).toEqual({ id: 'mun ID', name: 'mun name' });
  });

  it('should register to go to state', () => {
    const navigationBus = new NavigationBus(new Vue());
    const listener = sinon.stub();
    navigationBus.onGoToState(listener);
    navigationBus.goToState({ id: 'state ID', name: 'state name' });
    expect(listener.calledOnce).toBeTruthy();
    expect(listener.getCall(0).args[0]).toEqual({ id: 'state ID', name: 'state name' });
  });

  it('should register to go to municipality', () => {
    const navigationBus = new NavigationBus(new Vue());
    const listener = sinon.stub();
    navigationBus.onGoToMunicipality(listener);
    navigationBus.goToMunicipality({ id: 'mun ID', name: 'mun name' });
    expect(listener.calledOnce).toBeTruthy();
    expect(listener.getCall(0).args[0]).toEqual({ id: 'mun ID', name: 'mun name' });
  });

  it('should register to go to school', () => {
    const navigationBus = new NavigationBus(new Vue());
    const listener = sinon.stub();
    navigationBus.onGoToSchool(listener);
    navigationBus.goToSchool({ id: 'school ID', name: 'school name' });
    expect(listener.calledOnce).toBeTruthy();
    expect(listener.getCall(0).args[0]).toEqual({ id: 'school ID', name: 'school name' });
  });

  it('should destroy Vue instance', () => {
    const vue = new Vue();
    const destroySpy = sinon.spy(vue, '$destroy');
    const navigationBus = new NavigationBus(vue);
    navigationBus.destroy();
    expect(destroySpy.calledOnce).toBeTruthy();
  });
});
