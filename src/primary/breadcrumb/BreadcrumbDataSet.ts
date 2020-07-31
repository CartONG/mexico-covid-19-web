import { NavigationParams } from '@/primary/navigation/NavigationParams';

export interface BreadcrumbItemDataSet {
  id: string;
  name: string;
  active: string;
  visible: boolean;
}

export interface BreadcrumbDataSet {
  country: BreadcrumbItemDataSet;
  state: BreadcrumbItemDataSet;
  municipality: BreadcrumbItemDataSet;
  school: BreadcrumbItemDataSet;
}

export const toBreadcrumbDataSet = (navigation: NavigationParams[]) => ({
  country: {
    id: 'country',
    name: 'MÉXICO',
    active: navigation.length === 0,
    visible: true,
  },
  state: {
    id: navigation[0] ? navigation[0].id : 'state',
    name: navigation[0] ? navigation[0].name : 'name',
    active: navigation.length === 1,
    visible: navigation[0] !== undefined,
  },
  municipality: {
    id: navigation[1] ? navigation[1].id : 'state',
    name: navigation[1] ? navigation[1].name : 'name',
    active: navigation.length === 2,
    visible: navigation[1] !== undefined,
  },
  school: {
    id: navigation[2] ? navigation[2].id : 'state',
    name: navigation[2] ? navigation[2].name : 'name',
    active: true,
    visible: navigation[2] !== undefined,
  },
});
