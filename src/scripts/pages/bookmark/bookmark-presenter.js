export default class BookmarkPresenter {
  #view;
  #model;
 
  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async showStoriesListMap() {
    this.#view.showMapLoading();
    try {
      // await this.#view.initialMap();
    } catch (error) {
      console.error('showStoriesListMap: error:', error);
    } finally {
      this.#view.hideMapLoading();
    }
  }
 
  async initialGalleryAndMap() {
    this.#view.showLoading();
 
    try {
      await this.showStoriesListMap();

      const listOfStories = await this.#model.getAllStorys();
 
      const message = 'Berhasil mendapatkan daftar laporan tersimpan.';
      this.#view.populateStoriesList(message, listOfStories);
    } catch (error) {
      console.error('initialGalleryAndMap: error:', error);
      this.#view.populateBookmarkedReportsError(error.message);
    } finally {
      this.#view.hideLoading();
    }
  }
}