import { showFormattedDate } from './utils';

export function generateLoaderTemplate() {
  return `
    <div class="loader"></div>
  `;
}

export function generateLoaderAbsoluteTemplate() {
  return `
    <div class="loader loader-absolute"></div>
  `;
}

export function generateStoriesListEmptyTemplate() {
  return `
    <div id="stories-list-empty" class="stories-list__empty">
      <h2>Tidak ada story yang tersedia</h2>
      <p>Saat ini, tidak ada story kerusakan fasilitas umum yang dapat ditampilkan.</p>
    </div>
  `;
}

export function generateStoriesListErrorTemplate(message) {
  return `
    <div id="stories-list-error" class="stories-list__error">
      <h2>Terjadi kesalahan pengambilan daftar story</h2>
      <p>${message ? message : 'Gunakan jaringan lain atau laporkan error ini.'}</p>
    </div>
  `;
}

export function generateStorieItemTemplate({
  id,
  name,
  description,
  photoUrl,
  createdAt,
  coordinate,
}) {
  return `
    <div tabindex="0" class="storie-item card" data-storieid="${id}">
        <img class="card-image" src="${photoUrl}" alt="${name}" srcset="">
        <div class="storie-item-content">
            <h2 class="title">${name}</h2>
            <p class="description">${description}</p>
            <p class="date card-date">${showFormattedDate(createdAt, 'id-ID')}</p>
            <a class="btn storie-item__read-more" href="#/stories/${id}">
                Selengkapnya <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    </div>    
  `;
}

export function generateStoryDetailTemplate({
  id,
  name,
  description,
  photoUrl,
  createdAt,
  lat,
  lon,
}) {
  return `
    <div class="story-detail" data-storieid="${id}">
      <div class="story-detail__image-container">
          <img id="photo-url" src="${photoUrl}" alt="${name}" srcset="" class="story-detail__image">
      </div>
      <div class="story-detail__info">
          <h2 id="story-name" class="story-detail__title">${name}</h2>
          <p id="story-description" class="story-detail__description">${description}</p>
      </div>
        <p id="story-date" class="story-detail__date">${showFormattedDate(createdAt, 'id-ID')}</p>
        <div id="save-actions-container"></div>
      <div id="story-detail-map-location" class="story-detail__map-location">
          <p>Latitude: ${lat}, Longitude: ${lon}</p>
          <div id="map-loading-container"></div>
      </div>
    </div>
  `;
}

export function generateSubscribeButtonTemplate() {
  return `
    <button id="subscribe-button" class="btn subscribe-button">
      Subscribe <i class="fas fa-bell"></i>
    </button>
  `;
}

export function generateUnsubscribeButtonTemplate() {
  return `
    <button id="unsubscribe-button" class="btn unsubscribe-button">
      Unsubscribe <i class="fas fa-bell-slash"></i>
    </button>
  `;
}

export function generateSaveStoryButtonTemplate() {
  return `
    <button id="story-detail-save" class="btn save-story-button">
      Simpan Story <i class="fas fa-save"></i>
    </button>
  `;
}

export function generateRemoveStoryButtonTemplate() {
  return `
    <button id="story-detail-remuve" class="btn remuve-story-button">
      Remuve <i class="fas fa-remuve"></i>
    </button>
  `;
}