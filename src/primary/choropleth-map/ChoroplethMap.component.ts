import { Feature, Map, MapBrowserEvent, Overlay } from 'ol';
import Control from 'ol/control/Control';
import { getCenter } from 'ol/extent';
import VectorLayer from 'ol/layer/Vector';
import { Component, Inject, Vue, Watch } from 'vue-property-decorator';

import { Fetcher } from '@/domain/Fetcher';
import { Logger } from '@/domain/Logger';
import { SchoolSummary } from '@/domain/school/SchoolSummary';
import { SelectionSource } from '@/domain/selection/SelectionSource';
import { AppStore } from '@/primary/app/AppStore';
import {
  addLayerSingleClickEvent,
  fitFeature,
  parseTopoJson,
  setClusterLayerFeature,
  setLayerFeature,
} from '@/primary/choropleth-map/mapUtil';
import { toMunicipalityFeature } from '@/primary/choropleth-map/MunicipalityFeature';
import { mapOptions } from '@/primary/choropleth-map/options/mapOptions';
import { municipalitiesLayerOptions } from '@/primary/choropleth-map/options/municipalitiesLayerOptions';
import { popupOptions } from '@/primary/choropleth-map/options/popupOptions';
import { schoolsLayerOptions } from '@/primary/choropleth-map/options/schoolsLayerOptions';
import { statesLayerOptions } from '@/primary/choropleth-map/options/statesLayerOptions';
import { PopupVue } from '@/primary/choropleth-map/popup';
import { RateTabsVue } from '@/primary/choropleth-map/rate-tabs';
import { toSchoolFeature } from '@/primary/choropleth-map/SchoolFeature';
import { toStateFeature } from '@/primary/choropleth-map/StateFeature';
import { createSchoolsStyleFunction } from '@/primary/choropleth-map/styles/schools/createSchoolsStyleFunction';
import { ComponentState } from '@/primary/ComponentState';
import { RateTypes } from '@/primary/RateTypes';

@Component({
  components: { PopupVue, RateTabsVue },
})
export default class ChoroplethMap extends Vue {
  state: ComponentState = ComponentState.PENDING;
  map = new Map(mapOptions);
  schoolsLayer = new VectorLayer(schoolsLayerOptions) as any;
  municipalityGeometriesByState: { [key: string]: Feature[] } = {};
  municipalitiesLayer = new VectorLayer(municipalitiesLayerOptions);
  stateGeometries: Feature[] = [];
  statesLayer = new VectorLayer(statesLayerOptions);
  popup = new Overlay(popupOptions);
  schoolItems: { id: string; text: string }[] = [];
  extent: [number, number, number, number] = [0, 0, 0, 0];

  @Inject()
  private appStore!: () => AppStore;

  @Inject()
  private fetcher!: () => Fetcher;

  @Inject()
  private logger!: () => Logger;

  get schoolSummaryList() {
    return this.appStore().getSchoolSummaryList();
  }

  get stateSelection() {
    return this.appStore().getStateSelection();
  }

  get municipalitySelection() {
    return this.appStore().getMunicipalitySelection();
  }

  get schoolSelection() {
    return this.appStore().getSchoolSelection();
  }

  get selectedRateType() {
    return this.appStore().getSelectedRateType();
  }

  @Watch('schoolSummaryList')
  schoolSummaryListWatcher() {
    this.adaptToSchoolDomain('', this.schoolSummaryList);
  }

  @Watch('stateSelection')
  stateSelectionWatcher() {
    this.closePopup();
    fitFeature(this.map, this.statesLayer, this.stateSelection.stateId);

    if (this.stateSelection.stateId === '') {
      this.fitView(1000);
    }
  }

  @Watch('stateSelection.stateId')
  stateIdWatcher(stateId: string) {
    this.adaptToStateDomain(stateId);
    this.adaptToMunicipalityDomain(stateId, '');
  }

  @Watch('municipalitySelection')
  municipalitySelectionWatcher() {
    this.closePopup();
    fitFeature(this.map, this.municipalitiesLayer, this.municipalitySelection.municipalityId);
  }

  @Watch('municipalitySelection.municipalityId')
  municipalityIdWatcher(municipalityId: string) {
    this.adaptToMunicipalityDomain(this.stateSelection.stateId, municipalityId);
  }

  @Watch('schoolSelection.schoolId')
  schoolSelectionWatcher(schoolId: string) {
    this.closePopup();
    this.adaptToSchoolDomain(schoolId, this.schoolSummaryList);
  }

  @Watch('selectedRateType')
  selectedRateTypeWatcher() {
    this.schoolsLayer.setStyle(createSchoolsStyleFunction(this.selectedRateType));
    this.adaptToStateDomain(this.stateSelection.stateId);
    this.adaptToMunicipalityDomain(this.stateSelection.stateId, this.municipalitySelection.municipalityId);
  }

  created() {
    this.map.addLayer(this.statesLayer);
    this.map.addLayer(this.municipalitiesLayer);
    this.map.addLayer(this.schoolsLayer);
    this.map.addOverlay(this.popup);
    this.map.on('singleclick', this.selectEntity);
    this.map.on('dblclick', () => this.closePopup());
    this.schoolsLayer.setStyle(createSchoolsStyleFunction(RateTypes.STUDENT));
    this.statesLayer.on('singleclick', event => this.selectState(event as MapBrowserEvent));
    this.municipalitiesLayer.on('singleclick', event => this.selectMunicipality(event as MapBrowserEvent));
    this.schoolsLayer.on('singleclick', (event: MapBrowserEvent) => this.selectSchool(event as MapBrowserEvent));
    addLayerSingleClickEvent(this.map);
  }

  mounted() {
    const recenterControl = new Control({ element: document.getElementById('recenter-control') || undefined });
    const refreshControl = new Control({ element: document.getElementById('refresh-control') || undefined });

    this.map.addControl(recenterControl);
    this.map.addControl(refreshControl);

    this.map.setTarget('map');
    this.popup.setElement(document.getElementById('popup') || undefined);

    Promise.all([this.fetcher().fetch('states.topojson'), this.fetcher().fetch('municipalities.topojson')])
      .then(results => {
        this.stateGeometries = parseTopoJson(results[0]);
        this.municipalityGeometriesByState = parseTopoJson(results[1]).reduce(this.municipalityReducer, {});

        this.adaptToStateDomain('');
        this.adaptToMunicipalityDomain('', '');

        this.extent = this.statesLayer.getSource().getExtent();
        this.fitView();
        this.map.getView().setMinZoom(this.map.getView().getZoom());

        this.state = ComponentState.SUCCESS;
      })
      .catch(error => this.error(error));
  }

  private municipalityReducer(accumulator: { [key: string]: Feature[] }, geometry: Feature) {
    const geometries = accumulator[geometry.get('stateId')] ? accumulator[geometry.get('stateId')] : [];
    return { ...accumulator, [geometry.get('stateId')]: [...geometries, geometry] };
  }

  private adaptToStateDomain(selectedStateId: string) {
    const features = this.stateGeometries.map(geometry =>
      toStateFeature(geometry, this.appStore().getStateSummaryById(), selectedStateId, this.selectedRateType)
    );
    setLayerFeature(this.statesLayer, features);
  }

  private adaptToMunicipalityDomain(selectedStateId: string, selectedMunicipalityId: string) {
    const summaryList = this.appStore().getMunicipalitySummaryList();
    const features = (this.municipalityGeometriesByState[selectedStateId] || []).map(geometry =>
      toMunicipalityFeature(
        geometry,
        summaryList.find(summary => summary.id === geometry.getId()),
        selectedMunicipalityId,
        this.selectedRateType
      )
    );
    setLayerFeature(this.municipalitiesLayer, features);
  }

  private adaptToSchoolDomain(selectedSchoolId: string, schoolSummaries: SchoolSummary[]) {
    const features = schoolSummaries.map(schoolSummary => toSchoolFeature(schoolSummary, selectedSchoolId));
    setClusterLayerFeature(this.schoolsLayer, features);
  }

  private error(error: Error): void {
    this.logger().error('Fail to retrieve state or municipality geometries', error);
    this.state = ComponentState.ERROR;
  }

  private selectState(event: MapBrowserEvent) {
    const feature = this.map.getFeaturesAtPixel(event.pixel, { hitTolerance: 5 })[0];
    this.appStore().selectState(feature.getId().toString(), SelectionSource.MAP);
  }

  private selectMunicipality(event: MapBrowserEvent) {
    const feature = this.map.getFeaturesAtPixel(event.pixel, { hitTolerance: 5 })[0];
    this.appStore().selectMunicipality(feature.getId().toString(), SelectionSource.MAP);
  }

  private selectSchool(event: MapBrowserEvent) {
    const feature = this.map.getFeaturesAtPixel(event.pixel, { hitTolerance: 5 })[0];
    if (feature.get('features').length > 1) {
      this.schoolItems = feature.get('features').map((feature: Feature) => ({ id: feature.getId().toString(), text: feature.get('name') }));
      const coordinates = getCenter(feature.getGeometry().getExtent());
      this.popup.setPosition(coordinates);
    } else {
      this.appStore().selectSchool(feature.get('features')[0].getId(), SelectionSource.MAP);
    }
  }

  private selectEntity(event: MapBrowserEvent) {
    this.closePopup();
    const features = this.map.getFeaturesAtPixel(event.pixel, { hitTolerance: 5 });
    if (features.length === 0) {
      this.appStore().selectCountry(SelectionSource.MAP);
      return;
    }
  }

  private closePopup() {
    this.popup.setPosition(undefined);
  }

  private pickSchool(schoolItem: { id: string; text: string }) {
    this.appStore().selectSchool(schoolItem.id, SelectionSource.MAP);
  }

  private fitView(duration: number = 0) {
    this.map.getView().fit(this.extent, { padding: [20, 20, 20, 20], duration });
  }

  private resetView() {
    this.appStore().selectCountry(SelectionSource.MAP);
    this.fitView(1000);
  }
}
