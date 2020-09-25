import sinon from 'sinon';

import { Feature, Map, Overlay, View } from 'ol';
import VectorLayer from 'ol/layer/Vector';
import { Cluster } from 'ol/source';

import { AdministrativeDivisionSummary } from '@/domain/administrative-division/AdministrativeDivisionSummary';
import { AttendanceType } from '@/domain/AttendanceType';
import { SchoolSummary } from '@/domain/school/SchoolSummary';
import { AttendanceWebmapping } from '@/primary/attendance-webmapping/AttendanceWebmapping';
import { municipalityStyler } from '@/primary/attendance-webmapping/styles/municipalities/MunicipalityStyle';
import { schoolStyler } from '@/primary/attendance-webmapping/styles/schools/SchoolStyler';
import { statesStyler } from '@/primary/attendance-webmapping/styles/states/StateStyle';
import { ANIMATION_DURATION, MAP_EXTENT } from '@/primary/constants';
import { createClusterLayer, createMap, createPopup, createVectorLayer, makeEvent } from '@/primary/WebmappingUtils';
import { Point } from 'ol/geom';

const setupAttendanceWebmapping = () => {
  map = createMap(MAP_EXTENT);
  statesLayer = createVectorLayer(statesStyler(AttendanceType.STUDENT, ''));
  municipalitiesLayer = createVectorLayer(municipalityStyler(AttendanceType.STUDENT, ''));
  schoolsLayer = createClusterLayer(schoolStyler(AttendanceType.STUDENT, ''));
  popup = createPopup();
  attendanceWebmapping = new AttendanceWebmapping(map, statesLayer, municipalitiesLayer, schoolsLayer, popup, ANIMATION_DURATION);
};

const topology = (ids: [string, string] = ['0', '1']) => ({
  type: 'Topology',
  objects: {
    'two-squares': {
      type: 'GeometryCollection',
      geometries: [
        { type: 'Polygon', arcs: [[0, 1]], properties: { stateId: '0' }, id: ids[0] },
        { type: 'Polygon', arcs: [[0, 1]], properties: { stateId: '0' }, id: ids[1] },
      ],
    },
  },
  arcs: [
    [
      [1, 2],
      [0, -2],
    ],
    [
      [1, 0],
      [-1, 0],
      [0, 2],
      [1, 0],
    ],
  ],
});

const makeFeature = (id: string, properties: any = {}) => {
  const feature = new Feature();
  feature.setId(id);
  feature.setProperties(properties);
  return feature;
};

const makeAdministrativeSummary = (override: Partial<AdministrativeDivisionSummary> = {}): AdministrativeDivisionSummary => ({
  id: '',
  name: '-',
  stateId: '',
  studentAttendance: -1,
  teacherAttendance: -1,
  adminAttendance: -1,
  ...override,
});

const makeSchoolSummary = (override: Partial<SchoolSummary> = {}): SchoolSummary => ({
  id: '-',
  name: '-',
  turn: '-',
  locality: '-',
  studentAttendance: -1,
  teacherAttendance: -1,
  adminAttendance: -1,
  maleStudentAbsence: -1,
  femaleStudentAbsence: -1,
  coordinates: [0, 0],
  ...override,
});

let map: Map;
let statesLayer: VectorLayer;
let municipalitiesLayer: VectorLayer;
let schoolsLayer: VectorLayer;
let popup: Overlay;
let attendanceWebmapping: AttendanceWebmapping;

describe('AttendanceWebmapping', () => {
  beforeEach(() => {
    setupAttendanceWebmapping();
  });

  it('should set target', () => {
    const setTargetStub = sinon.stub(map, 'setTarget');
    attendanceWebmapping.setMapTarget('target');
    expect(setTargetStub.getCall(0).args[0]).toBe('target');
  });

  it('should register to state layer click event', () => {
    const callbackStub = sinon.stub();
    const feature = makeFeature('0', { name: 'test state' });
    sinon.stub(map, 'getFeaturesAtPixel').returns([feature]);
    attendanceWebmapping.onSelectState(callbackStub);
    statesLayer.dispatchEvent('singleclick');
    expect(callbackStub.calledOnce).toBeTruthy();
    expect(callbackStub.getCall(0).args[0]).toEqual({ id: '0', name: 'test state' });
  });

  it('should register to municipality layer click event', () => {
    const callbackStub = sinon.stub();
    const feature = makeFeature('0', { name: 'test mun' });
    sinon.stub(map, 'getFeaturesAtPixel').returns([feature]);
    attendanceWebmapping.onSelectMunicipality(callbackStub);
    municipalitiesLayer.dispatchEvent('singleclick');
    expect(callbackStub.calledOnce).toBeTruthy();
    expect(callbackStub.getCall(0).args[0]).toEqual({ id: '0', name: 'test mun' });
  });

  it('should register to school layer select event', () => {
    const callbackStub = sinon.stub();
    const feature = makeFeature('0', { name: 'test school' });
    attendanceWebmapping.onSelectSchool(callbackStub);
    schoolsLayer.dispatchEvent(makeEvent('selectschool', { feature }));
    expect(callbackStub.calledOnce).toBeTruthy();
    expect(callbackStub.getCall(0).args[0]).toEqual({ id: '0', name: 'test school' });
  });

  it('should register to school cluster click event', () => {
    const callbackStub = sinon.stub();
    const feature1 = makeFeature('0', { name: 'test school 1', turn: 'turn 1' });
    const feature2 = makeFeature('1', { name: 'test school 2', turn: 'turn 2' });
    attendanceWebmapping.onSelectSchoolCluster(callbackStub);
    schoolsLayer.dispatchEvent(makeEvent('selectschoolcluster', { features: [feature1, feature2] }));
    expect(callbackStub.calledOnce).toBeTruthy();
    expect(callbackStub.getCall(0).args[0]).toEqual([
      { id: '0', name: 'test school 1 - turn 1' },
      { id: '1', name: 'test school 2 - turn 2' },
    ]);
  });

  it('should set popup element', () => {
    const element = document.createElement('DIV');
    element.id = 'test';
    attendanceWebmapping.setPopupElement(element);
    expect(popup.getElement().id).toBe('test');
  });

  it('should add and remove control', () => {
    const recenterControlElement = document.createElement('DIV');
    recenterControlElement.id = 'recenter-control';
    const refreshControlElement = document.createElement('DIV');
    refreshControlElement.id = 'refresh-control';
    document.body.appendChild(recenterControlElement);
    document.body.appendChild(refreshControlElement);
    const initialControlNumber = map.getControls().getLength();
    attendanceWebmapping.addControls();
    expect(map.getControls().getLength()).toBe(initialControlNumber + 2);
    attendanceWebmapping.removeControls();
    expect(map.getControls().getLength()).toBe(initialControlNumber);
    attendanceWebmapping.addControls();
    expect(map.getControls().getLength()).toBe(initialControlNumber);
  });

  it('should set state features', () => {
    const summaries = [makeAdministrativeSummary({ id: '0', name: 'test 0' }), makeAdministrativeSummary({ id: '1', name: 'test 1' })];
    attendanceWebmapping.setStatesFeatures(topology(), summaries);
    const [feature1, feature2] = statesLayer.getSource().getFeatures();
    expect(statesLayer.getSource().getFeatures().length).toBe(2);
    expect(feature1.getId()).toBe('0');
    expect(feature1.get('name')).toBe('test 0');
    expect(feature2.getId()).toBe('1');
    expect(feature2.get('name')).toBe('test 1');
  });

  it('should set municipality features', () => {
    const stateSummaries = [makeAdministrativeSummary({ id: '0', name: 'test 0' }), makeAdministrativeSummary({ id: '1', name: 'test 1' })];
    const munSummaries = [
      makeAdministrativeSummary({ id: '10', name: 'test 10', stateId: '0' }),
      makeAdministrativeSummary({ id: '11', name: 'test 11', stateId: '0' }),
    ];
    attendanceWebmapping.setStatesFeatures(topology(), stateSummaries);
    attendanceWebmapping.setMunicipalitiesFeatures(topology(['10', '11']), munSummaries);
    attendanceWebmapping.fitToState('0');
    const feature = municipalitiesLayer.getSource().getFeatures()[0];
    expect(municipalitiesLayer.getSource().getFeatures().length).toBe(2);
    expect(feature.getId()).toBe('10');
    expect(feature.get('name')).toBe('test 10');
  });

  it('should set shcool features', () => {
    const summaries = [
      { id: '0', name: 'school 0' },
      { id: '1', name: 'school 1' },
    ].map(makeSchoolSummary);
    attendanceWebmapping.setSchoolsFeatures(summaries);
    const features = (schoolsLayer.getSource() as Cluster).getSource().getFeatures();
    expect(features.length).toBe(2);
    expect(features[0].getId()).toBe('0');
    expect(features[0].get('name')).toBe('school 0');
    expect(features[1].getId()).toBe('1');
    expect(features[1].get('name')).toBe('school 1');
  });

  it('should fit', () => {
    const summaries = [makeAdministrativeSummary({ id: '0', name: 'test 0' }), makeAdministrativeSummary({ id: '1', name: 'test 1' })];
    attendanceWebmapping.setStatesFeatures(topology(), summaries);
    const extent = statesLayer.getSource().getExtent();
    const getViewStub = sinon.stub(map, 'getView');
    const view = new View();
    const fitStub = sinon.stub(view, 'fit');
    getViewStub.returns(view);
    const closePopupStub = sinon.stub(attendanceWebmapping, 'closePopup');
    attendanceWebmapping.fitToCountry(false);
    attendanceWebmapping.fitToState('0');
    attendanceWebmapping.fitToMunicipality('');
    attendanceWebmapping.fitToSchool('');
    expect(closePopupStub.getCalls().length).toBe(4);
    expect(fitStub.getCalls().length).toBe(2);
    expect(fitStub.getCall(0).args[0]).toEqual(extent);
  });

  it('should update map size', () => {
    const updateSizeStub = sinon.stub(map, 'updateSize');
    const renderSyncStub = sinon.stub(map, 'renderSync');
    attendanceWebmapping.updateMapSize();
    expect(updateSizeStub.calledOnce).toBeTruthy();
    expect(renderSyncStub.calledOnce).toBeTruthy();
  });

  it('should set minimum zoom to current zoom', () => {
    const getViewStub = sinon.stub(map, 'getView');
    const view = new View();
    const setMinZoomStub = sinon.stub(view, 'setMinZoom');
    getViewStub.returns(view);
    attendanceWebmapping.setMinZoomToCurrentZoom();
    expect(setMinZoomStub.calledOnce).toBeTruthy();
  });

  it('should close popup', () => {
    const setPositionStub = sinon.stub(popup, 'setPosition');
    attendanceWebmapping.closePopup();
    expect(setPositionStub.calledOnce).toBeTruthy();
    expect(setPositionStub.getCall(0).args[0]).toBe(undefined);
  });

  it('should switch attendance type', () => {
    const setStyleStateStub = sinon.stub(statesLayer, 'setStyle');
    const setStyleMunicipalityStub = sinon.stub(municipalitiesLayer, 'setStyle');
    const setStyleSchoolStub = sinon.stub(schoolsLayer, 'setStyle');
    attendanceWebmapping.switchAttendanceType(AttendanceType.STUDENT);
    expect(setStyleStateStub.calledOnce).toBeTruthy();
    expect(setStyleMunicipalityStub.calledOnce).toBeTruthy();
    expect(setStyleSchoolStub.calledOnce).toBeTruthy();
  });

  it('should adjust map', () => {
    const callbackStub = sinon.stub();
    const getViewStub = sinon.stub(map, 'getView');
    const view = new View();
    const fitStub = sinon.stub(view, 'fit');
    getViewStub.returns(view);
    attendanceWebmapping.adjust([0, 0, 0, 0], false, callbackStub);
    attendanceWebmapping.adjust([0, 0, 0, 0]);
    attendanceWebmapping.adjust(null);
    expect(fitStub.getCall(1).args[1]!.callback).toEqual(callbackStub);
    expect(fitStub.getCalls().length).toBe(3);
  });

  it('should get map extent', () => {
    const getViewStub = sinon.stub(map, 'getView');
    const view = new View();
    const calculateExtentStub = sinon.stub(view, 'calculateExtent');
    getViewStub.returns(view);
    attendanceWebmapping.getExtent();
    expect(calculateExtentStub.calledOnce).toBeTruthy();
  });

  it('should handle popup', () => {
    const feature = new Feature();
    feature.setGeometry(new Point([0, 0]));
    feature.set('features', ['a', 'b']);
    sinon.stub(map, 'getFeaturesAtPixel').returns([feature]);
    const schoolClusterStub = sinon.stub();
    const schoolStub = sinon.stub();
    schoolsLayer.on('selectschoolcluster', schoolClusterStub);
    schoolsLayer.on('selectschool', schoolStub);
    schoolsLayer.dispatchEvent('singleclick');
    feature.set('features', ['a']);
    schoolsLayer.dispatchEvent('singleclick');
    expect(schoolClusterStub.calledOnce).toBeTruthy();
    expect(schoolStub.calledOnce).toBeTruthy();
  });
});
