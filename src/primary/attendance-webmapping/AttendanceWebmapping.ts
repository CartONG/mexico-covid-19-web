import { Feature, Map, MapBrowserEvent, Overlay } from 'ol';
import Control from 'ol/control/Control';
import BaseEvent from 'ol/events/Event';
import { getCenter } from 'ol/extent';
import { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import { transform } from 'ol/proj';

import { AdministrativeDivisionSummary } from '@/domain/administrative-division/AdministrativeDivisionSummary';
import { AttendanceType } from '@/domain/AttendanceType';
import { SchoolSummary } from '@/domain/school/SchoolSummary';
import { municipalityStyler } from '@/primary/attendance-webmapping/styles/municipalities/MunicipalityStyle';
import { schoolStyler } from '@/primary/attendance-webmapping/styles/schools/SchoolStyler';
import { statesStyler } from '@/primary/attendance-webmapping/styles/states/StateStyle';
import {
  fitFeature,
  makeEvent,
  setClusterLayerFeature,
  addLayerSingleClickEvent,
  parseTopoJson,
  setLayerFeature,
} from '@/primary/WebmappingUtils';

const SINGLE_CLICK = 'singleclick';
const DOUBLE_CLICK = 'dblclick';
const SELECT_SCHOOL_CLUSTER = 'selectschoolcluster';
const SELECT_SCHOOL = 'selectschool';

export class AttendanceWebmapping {
  private initialized = false;
  private controls: Control[] = [];
  private municipalityFeaturesByState: { [key: string]: Feature[] } = {};
  private stateId = '';
  private municipalityId = '';
  private schoolId = '';
  private attendanceType = AttendanceType.STUDENT;

  constructor(
    private map: Map,
    private statesLayer: VectorLayer,
    private municipalitiesLayer: VectorLayer,
    private schoolsLayer: any,
    private popup: Overlay,
    private animationDuration = 1000
  ) {
    this.map.addLayer(this.statesLayer);
    this.map.addLayer(this.municipalitiesLayer);
    this.map.addLayer(this.schoolsLayer);
    this.map.addOverlay(this.popup);
    this.map.on('DOUBLE_CLICK', this.closePopup);
    this.schoolsLayer.on(SINGLE_CLICK, (event: MapBrowserEvent) => this.handlePopup(event));
    addLayerSingleClickEvent(this.map);
  }

  private mapAdministrativeDivisionProperties(features: Feature[], summaries: AdministrativeDivisionSummary[]) {
    const fallbackSummary: AdministrativeDivisionSummary = {
      id: '',
      name: '-',
      stateId: '',
      studentAttendance: -1,
      teacherAttendance: -1,
      adminAttendance: -1,
    };

    features.forEach(feature => {
      const summary = summaries.find(summary => summary.id === feature.getId()) || { ...fallbackSummary, id: feature.getId() };
      feature.set('name', summary.name);
      feature.set('studentAttendance', summary.studentAttendance);
      feature.set('teacherAttendance', summary.teacherAttendance);
      feature.set('adminAttendance', summary.adminAttendance);
    });
  }

  private toSchoolFeature(domainSchoolSummary: SchoolSummary): Feature {
    const featureOptions = {
      geometry: new Point(transform(domainSchoolSummary.coordinates, 'EPSG:4326', 'EPSG:3857')),
      name: domainSchoolSummary.name,
      turn: domainSchoolSummary.turn,
      maleStudentAttendance: domainSchoolSummary.studentAttendance,
      teacherAttendance: domainSchoolSummary.teacherAttendance,
      adminAttendance: domainSchoolSummary.adminAttendance,
    };
    const feature = new Feature(featureOptions);
    feature.setId(domainSchoolSummary.id);
    return feature;
  }

  private municipalityReducer(accumulator: { [key: string]: Feature[] }, geometry: Feature) {
    const geometries = accumulator[geometry.get('stateId')] ? accumulator[geometry.get('stateId')] : [];
    return { ...accumulator, [geometry.get('stateId')]: [...geometries, geometry] };
  }

  private handlePopup(event: MapBrowserEvent) {
    const feature = this.map.getFeaturesAtPixel(event.pixel, { hitTolerance: 5 })[0];
    if (feature.get('features').length > 1) {
      const features = feature.get('features');
      this.schoolsLayer.dispatchEvent(makeEvent(SELECT_SCHOOL_CLUSTER, { features }));
      const coordinates = getCenter(feature.getGeometry().getExtent());
      this.popup.setPosition(coordinates);
    } else {
      this.schoolsLayer.dispatchEvent(makeEvent(SELECT_SCHOOL, { feature: feature.get('features')[0] }));
    }
  }

  private updateSchoolsLayer(attendanceType: AttendanceType, schoolId: string, schoolSummaries?: SchoolSummary[]) {
    if (schoolSummaries) {
      this.setSchoolsFeatures(schoolSummaries);
    }
    this.schoolId = schoolId;
    this.schoolsLayer.setStyle(schoolStyler(this.attendanceType, schoolId));
  }

  private updateMunicipalitiesLayer(attendanceType: AttendanceType, municipalityId: string, stateId: string, updateFeatures = true) {
    if (updateFeatures) {
      setLayerFeature(this.municipalitiesLayer, this.municipalityFeaturesByState[stateId] || []);
    }
    this.municipalityId = municipalityId;
    this.municipalitiesLayer.setStyle(municipalityStyler(attendanceType, municipalityId));
  }

  private updateStatesLayer(attendanceType: AttendanceType, stateId: string) {
    this.stateId = stateId;
    this.statesLayer.setStyle(statesStyler(attendanceType, stateId));
  }

  private byId(objects: { id: string }[]) {
    return objects.reduce((accumulator, object) => ({ ...accumulator, [object.id]: object }), {});
  }

  public setMapTarget(target: string | undefined) {
    this.map.setTarget(target);
  }

  public onSelectState(callable: (selectEvent: { id: string; name: string }) => void) {
    this.statesLayer.on(SINGLE_CLICK, (clickEvent: BaseEvent) => {
      const feature = this.map.getFeaturesAtPixel((clickEvent as MapBrowserEvent).pixel, { hitTolerance: 5 })[0];
      callable({ id: feature.getId().toString(), name: feature.get('name') });
    });
  }

  public onSelectMunicipality(callable: (selectEvent: { id: string; name: string }) => void) {
    this.municipalitiesLayer.on(SINGLE_CLICK, (clickEvent: BaseEvent) => {
      const feature = this.map.getFeaturesAtPixel((clickEvent as MapBrowserEvent).pixel, { hitTolerance: 5 })[0];
      callable({ id: feature.getId().toString(), name: feature.get('name') });
    });
  }

  public onSelectSchoolCluster(callable: (selectEvent: { id: string; name: string }[]) => void) {
    this.schoolsLayer.on(SELECT_SCHOOL_CLUSTER, (selectEvent: any) => {
      const schools = selectEvent.features.map((feature: Feature) => ({
        id: feature.getId().toString(),
        name: `${feature.get('name')} - ${feature.get('turn')}`,
      }));
      callable(schools);
    });
  }

  public onSelectSchool(callable: (selectEvent: { id: string; name: string }) => void) {
    this.schoolsLayer.on(SELECT_SCHOOL, (selectEvent: any) => {
      const feature = selectEvent.feature as Feature;
      callable({ id: feature.getId().toString(), name: feature.get('name') });
    });
  }

  public setPopupElement(element?: HTMLElement) {
    this.popup.setElement(element);
  }

  public addControls() {
    const recenterControlElement = document.getElementById('recenter-control') || undefined;
    const refreshControlElement = document.getElementById('refresh-control') || undefined;
    const recenterControl = new Control({ element: recenterControlElement });
    const refreshControl = new Control({ element: refreshControlElement });
    this.controls = [recenterControl, refreshControl];
    this.map.addControl(recenterControl);
    this.map.addControl(refreshControl);
  }

  public removeControls() {
    this.map.removeControl(this.controls[0]);
    this.map.removeControl(this.controls[1]);
    this.controls = [];
  }

  public setStatesFeatures(geometries: any, stateSummaries: AdministrativeDivisionSummary[]) {
    if (!this.initialized) {
      const features = parseTopoJson(geometries);
      this.mapAdministrativeDivisionProperties(features, stateSummaries);
      setLayerFeature(this.statesLayer, features);
    }
  }

  public setMunicipalitiesFeatures(geometries: any, municipalitySummaries: AdministrativeDivisionSummary[]) {
    if (!this.initialized) {
      const features = parseTopoJson(geometries);
      this.mapAdministrativeDivisionProperties(features, municipalitySummaries);
      this.municipalityFeaturesByState = features.reduce(this.municipalityReducer, {});
    }
  }

  public setSchoolsFeatures(schoolSummaries: SchoolSummary[]) {
    const features = schoolSummaries.map(summary => this.toSchoolFeature(summary));
    setClusterLayerFeature(this.schoolsLayer, features);
  }

  public fitToCountry(extentOnly: boolean) {
    if (!extentOnly) {
      this.updateStatesLayer(this.attendanceType, '');
      this.updateMunicipalitiesLayer(this.attendanceType, '', '');
      this.updateSchoolsLayer(this.attendanceType, '', []);
    }
    this.closePopup();
    this.map.getView().fit(this.statesLayer.getSource().getExtent(), { padding: [20, 20, 20, 20], duration: this.animationDuration });
  }

  public fitToState(stateId: string) {
    this.closePopup();
    this.updateStatesLayer(this.attendanceType, stateId);
    this.updateMunicipalitiesLayer(this.attendanceType, '', stateId);
    this.updateSchoolsLayer(this.attendanceType, '', []);
    fitFeature(this.map, this.statesLayer, stateId);
  }

  public fitToMunicipality(municipalityId: string) {
    this.closePopup();
    this.updateMunicipalitiesLayer(this.attendanceType, municipalityId, this.stateId, false);
    this.updateSchoolsLayer(this.attendanceType, '');
    fitFeature(this.map, this.municipalitiesLayer, municipalityId);
  }

  public fitToSchool(schoolId: string) {
    this.closePopup();
    this.updateSchoolsLayer(this.attendanceType, schoolId);
  }

  public updateMapSize() {
    this.map.updateSize();
    this.map.renderSync();
  }

  public setMinZoomToCurrentZoom() {
    this.map.getView().setMinZoom(this.map.getView().getZoom());
  }

  public closePopup() {
    this.popup.setPosition(undefined);
  }

  public switchAttendanceType(attendanceType: AttendanceType) {
    this.attendanceType = attendanceType;
    this.statesLayer.setStyle(statesStyler(attendanceType, this.stateId));
    this.municipalitiesLayer.setStyle(municipalityStyler(attendanceType, this.municipalityId));
    this.schoolsLayer.setStyle(schoolStyler(attendanceType, this.schoolId));
  }

  public adjust(extent: [number, number, number, number] | null, forceRender = false, callback = () => {}) {
    if (!this.initialized) {
      this.fitToCountry(true);
      this.initialized = true;
    }

    this.map.updateSize();

    if (extent) {
      this.map.getView().fit(extent, { callback });
    }
  }

  public getExtent() {
    return this.map.getView().calculateExtent(this.map.getSize());
  }
}
