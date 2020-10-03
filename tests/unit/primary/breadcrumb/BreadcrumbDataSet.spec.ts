import { BreadcrumbDataSet, toBreadcrumbDataSet } from '@/primary/breadcrumb/BreadcrumbDataSet';

describe('BreadCrumbDataSet', () => {
  it('should have country active', () => {
    expect(toBreadcrumbDataSet([])).toEqual<BreadcrumbDataSet>({
      country: {
        id: 'country',
        name: 'MÉXICO',
        active: true,
        visible: true,
      },
      state: {
        id: 'state',
        name: 'name',
        active: false,
        visible: false,
      },
      municipality: {
        id: 'state',
        name: 'name',
        active: false,
        visible: false,
      },
      school: {
        id: 'state',
        name: 'name',
        active: true,
        visible: false,
      },
    });
  });

  it('should have state active', () => {
    expect(toBreadcrumbDataSet([{ id: '0', name: 'test 0' }])).toEqual<BreadcrumbDataSet>({
      country: {
        id: 'country',
        name: 'MÉXICO',
        active: false,
        visible: true,
      },
      state: {
        id: '0',
        name: 'test 0',
        active: true,
        visible: true,
      },
      municipality: {
        id: 'state',
        name: 'name',
        active: false,
        visible: false,
      },
      school: {
        id: 'state',
        name: 'name',
        active: true,
        visible: false,
      },
    });
  });

  it('should have municipality active', () => {
    const navigation = [
      { id: '0', name: 'test 0' },
      { id: '1', name: 'test 1' },
    ];
    expect(toBreadcrumbDataSet(navigation)).toEqual<BreadcrumbDataSet>({
      country: {
        id: 'country',
        name: 'MÉXICO',
        active: false,
        visible: true,
      },
      state: {
        id: '0',
        name: 'test 0',
        active: false,
        visible: true,
      },
      municipality: {
        id: '1',
        name: 'test 1',
        active: true,
        visible: true,
      },
      school: {
        id: 'state',
        name: 'name',
        active: true,
        visible: false,
      },
    });
  });

  it('should have school active', () => {
    const navigation = [
      { id: '0', name: 'test 0' },
      { id: '1', name: 'test 1' },
      { id: '2', name: 'test 2' },
    ];
    expect(toBreadcrumbDataSet(navigation)).toEqual<BreadcrumbDataSet>({
      country: {
        id: 'country',
        name: 'MÉXICO',
        active: false,
        visible: true,
      },
      state: {
        id: '0',
        name: 'test 0',
        active: false,
        visible: true,
      },
      municipality: {
        id: '1',
        name: 'test 1',
        active: false,
        visible: true,
      },
      school: {
        id: '2',
        name: 'test 2',
        active: true,
        visible: true,
      },
    });
  });
});
