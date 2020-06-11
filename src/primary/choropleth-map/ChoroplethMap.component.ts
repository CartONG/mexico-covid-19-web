import { Feature, Map, MapBrowserEvent, Overlay } from 'ol';
import { getCenter } from 'ol/extent';
import { TopoJSON } from 'ol/format';
import VectorLayer from 'ol/layer/Vector';
import { Component, Inject, Vue, Watch } from 'vue-property-decorator';

import { Fetcher } from '@/domain/Fetcher';
import { Logger } from '@/domain/Logger';
import { SchoolSummary } from '@/domain/school/SchoolSummary';
import { SelectionSource } from '@/domain/selection/SelectionSource';
import { SelectionType } from '@/domain/selection/SelectionType';
import { AppStore } from '@/primary/app/AppStore';
import { toMunicipalityFeature } from '@/primary/choropleth-map/MunicipalityFeature';
import { mapOptions } from '@/primary/choropleth-map/options/mapOptions';
import { municipalitiesLayerOptions } from '@/primary/choropleth-map/options/municipalitiesLayerOptions';
import { popupOptions } from '@/primary/choropleth-map/options/popupOptions';
import { schoolsLayerOptions } from '@/primary/choropleth-map/options/schoolsLayerOptions';
import { statesLayerOptions } from '@/primary/choropleth-map/options/statesLayerOptions';
import { PopupVue } from '@/primary/choropleth-map/popup';
import { toSchoolFeature } from '@/primary/choropleth-map/SchoolFeature';
import { toStateFeature } from '@/primary/choropleth-map/StateFeature';
import { createSchoolsStyleFunction } from '@/primary/choropleth-map/styles/schools/createSchoolsStyleFunction';
import { ComponentState } from '@/primary/ComponentState';

@Component({
  components: { PopupVue },
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

  @Inject()
  private appStore!: () => AppStore;

  @Inject()
  private fetcher!: () => Fetcher;

  @Inject()
  private logger!: () => Logger;

  @Watch('schoolSummaryList')
  schoolSummaryListWatcher() {
    this.adaptToSchoolDomain(this.schoolSummaryList);
  }

  @Watch('selection')
  selectionWatcher() {
    if (this.selection && this.selection.type === SelectionType.STATE) {
      const feature = this.statesLayer.getSource().getFeatureById(this.selection.stateId);
      this.map.getView().fit(feature.getGeometry().getExtent(), { padding: [20, 20, 20, 20], duration: 1000 });
    }

    if (this.selection && this.selection.type === SelectionType.MUNICIPALITY) {
      const feature = this.municipalitiesLayer.getSource().getFeatureById(this.selection.municipalityId);
      this.map.getView().fit(feature.getGeometry().getExtent(), { padding: [20, 20, 20, 20], duration: 1000 });
    }

    this.closePopup();

    this.adaptToStateDomain();
    this.adaptToMunicipalityDomain();
    this.adaptToSchoolDomain(this.schoolSummaryList);
  }

  get selection() {
    return this.appStore().getSelection();
  }

  get schoolSummaryList() {
    return this.appStore().getSchoolSummaryList();
  }

  created() {
    this.map.addLayer(this.statesLayer);
    this.map.addLayer(this.municipalitiesLayer);
    this.map.addLayer(this.schoolsLayer);
    this.map.addOverlay(this.popup);
    this.map.on('singleclick', this.selectEntity);
    this.map.on('dblclick', () => this.popup.setPosition(undefined));
    this.schoolsLayer.setStyle(createSchoolsStyleFunction());
  }

  mounted() {
    this.map.setTarget('map');
    this.popup.setElement(document.getElementById('popup') || undefined);

    Promise.all([this.fetcher().fetch('states.topojson'), this.fetcher().fetch('municipalities.topojson')])
      .then(results => {
        this.stateGeometries = this.parseTopoJson(results[0]);
        this.municipalityGeometriesByState = this.parseTopoJson(results[1]).reduce(this.municipalityReducer, {});

        this.adaptToStateDomain();
        this.adaptToMunicipalityDomain();

        const sourceExtent = this.statesLayer.getSource().getExtent();
        this.map.getView().fit(sourceExtent, { padding: [20, 20, 20, 20] });
        this.map.getView().setMinZoom(this.map.getView().getZoom());

        this.state = ComponentState.SUCCESS;
      })
      .catch(error => this.error(error));
  }

  private municipalityReducer(accumulator: { [key: string]: Feature[] }, geometry: Feature) {
    const geometries = accumulator[geometry.get('stateId')] ? accumulator[geometry.get('stateId')] : [];
    return { ...accumulator, [geometry.get('stateId')]: [...geometries, geometry] };
  }

  private parseTopoJson(topoJson: any): Feature[] {
    const parser = new TopoJSON();
    const readOptions = { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' };
    return parser.readFeatures(topoJson, readOptions);
  }

  private adaptToStateDomain() {
    const features = this.stateGeometries.map(geometry => toStateFeature(geometry, this.appStore().getStateSummaryById(), this.selection));
    this.statesLayer.getSource().clear();
    this.statesLayer.getSource().addFeatures(features);
  }

  private adaptToMunicipalityDomain() {
    if (!this.selection) {
      this.municipalitiesLayer.getSource().clear();
      return;
    }

    const summaryList = this.appStore().getMunicipalitySummaryList();

    const features = this.municipalityGeometriesByState[this.selection?.stateId].map(geometry =>
      toMunicipalityFeature(
        geometry,
        summaryList.find(summary => summary.id === geometry.getId()),
        this.selection
      )
    );

    this.municipalitiesLayer.getSource().clear();
    this.municipalitiesLayer.getSource().addFeatures(features);
  }

  private adaptToSchoolDomain(schoolSummaries: SchoolSummary[]) {
    const features = schoolSummaries.map(schoolSummary => toSchoolFeature(schoolSummary, this.selection));

    this.schoolsLayer
      .getSource()
      .getSource()
      .clear();

    this.schoolsLayer
      .getSource()
      .getSource()
      .addFeatures(features);
  }

  private error(error: Error): void {
    this.logger().error('Fail to retrieve state or municipality geometries', error);
    this.state = ComponentState.ERROR;
  }

  private selectEntity(event: MapBrowserEvent) {
    this.closePopup();
    const features = this.map.getFeaturesAtPixel(event.pixel, { hitTolerance: 5 });

    if (features.length === 0) {
      this.appStore().select(null);
      return;
    }

    const feature = features[0] as Feature;
    const selection = { source: SelectionSource.MAP };

    if (this.statesLayer.getSource().hasFeature(feature)) {
      this.appStore().select({
        ...selection,
        stateId: feature.getId().toString(),
        municipalityId: '',
        schoolId: '',
        type: SelectionType.STATE,
      });
      return;
    }

    if (this.selection && this.municipalitiesLayer.getSource().hasFeature(feature)) {
      this.appStore().select({
        ...selection,
        stateId: this.selection?.stateId,
        municipalityId: feature.getId().toString(),
        schoolId: '',
        type: SelectionType.MUNICIPALITY,
      });
    }

    if (this.selection && this.schoolsLayer.getSource().hasFeature(feature) && feature.get('features').length > 1) {
      this.schoolItems = feature.get('features').map((feature: Feature) => ({ id: feature.getId().toString(), text: feature.get('name') }));
      const coordinates = getCenter(feature.getGeometry().getExtent());
      this.popup.setPosition(coordinates);
      return;
    }

    if (this.selection && this.schoolsLayer.getSource().hasFeature(feature) && feature.get('features').length === 1) {
      this.appStore().select({
        ...selection,
        stateId: this.selection?.stateId,
        municipalityId: this.selection?.municipalityId,
        schoolId: feature
          .get('features')[0]
          .getId()
          .toString(),
        type: SelectionType.SCHOOL,
      });
    }
  }

  private closePopup() {
    this.popup.setPosition(undefined);
  }

  private pickSchool(schoolItem: { id: string; text: string }) {
    if (this.selection) {
      this.appStore().select({
        source: SelectionSource.MAP,
        stateId: this.selection?.stateId,
        municipalityId: this.selection?.municipalityId,
        schoolId: schoolItem.id,
        type: SelectionType.SCHOOL,
      });
      this.closePopup();
    }
  }

  /*
  private selectEntity(event: SelectEvent) {
    if (event.selected.length === 0) {
      this.appStore().select(null);
      return;
    }

    const feature = event.selected[0];
    const selection = { source: SelectionSource.MAP };

    if (this.statesLayer.getSource().hasFeature(feature)) {
      this.appStore().select({
        ...selection,
        stateId: feature.getId().toString(),
        municipalityId: '',
        schoolId: '',
        type: SelectionType.STATE,
      });
    }

    // const type = this.statesLayer.getSource().hasFeature(feature) ? SelectionType.STATE : SelectionType.MUNICIPALITY;
    // const selection = { type, source: SelectionSource.MAP, entityId: feature.getId().toString() };
    // this.appStore().select(selection);
  }
   */

  /*
  private selectFeature(feature: Feature) {
    const mapBrowserEvent = new MapBrowserEvent(MapBrowserEventType.SINGLECLICK, this.map, new Event('click'));
    const event: SelectEvent = new SelectEvent('select', [feature], this.select.getFeatures().getArray(), mapBrowserEvent);
    this.select.getFeatures().setAt(0, feature);
    this.select.un('select', this.selectEntity);
    this.select.dispatchEvent(event);
    this.select.on('select', this.selectEntity);
  }
   */
}
