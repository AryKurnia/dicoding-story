import {
  generateLoaderAbsoluteTemplate,
  generateStoryDetailTemplate,
} from '../../templates';
import * as DicodingStoryAPI from '../../data/api';
import Map from '../../utils/map';
import { parseActivePathname } from '../../routes/url-parser';
import StoryDetailPresenter from './story-detail-presenter';

export default class StoryDetailPage {
  #presenter;
  #map = null;

  async render() {
    return `
      <section class="story-detail-container">
        <div id="story-detail"></div>
        <div id="story-detail-loading-container"></div>
      </section>
    `
  }

  async afterRender() {
    this.#presenter = new StoryDetailPresenter(parseActivePathname().id, {
      model: DicodingStoryAPI,
      view: this,
    });

    await this.#presenter.getStoryDetail();
  }

  async populateStoryDetail(message, story) {
    const html = `
      ${generateStoryDetailTemplate(story)}
    `;
    
    document.getElementById('story-detail').innerHTML = `
      ${html}
    `;

    const mapContainer = document.getElementById('story-detail-map-location');
    // console.log(mapContainer);
    
    // Map
    await this.#presenter.showStoryDetailMap();
    if (this.#map) {
      const reportCoordinate = [story.lat, story.lon];
      const markerOptions = { alt: story.name };
      const popupOptions = { content: story.name };      
      this.#map.changeCamera(reportCoordinate);     
      this.#map.addMarker(reportCoordinate, markerOptions, popupOptions);
    }
  }

  async initialMap() {
    // TODO: map initialization
    this.#map = await Map.build('#story-detail-map-location', {
      zoom: 15,
    });
  }

  showMapLoading() {
    document.getElementById('map-loading-container').innerHTML = generateLoaderAbsoluteTemplate();
  }

  hideMapLoading() {
    document.getElementById('map-loading-container').innerHTML = '';
  }

  showLoading() {
    document.getElementById('story-detail-loading-container').innerHTML =
      generateLoaderAbsoluteTemplate();
  }

  hideLoading() {
    document.getElementById('story-detail-loading-container').innerHTML = '';
  }    
}