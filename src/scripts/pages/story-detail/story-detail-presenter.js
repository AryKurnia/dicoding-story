export default class StoryDetailPresenter {
  #storyId;
  #model;
  #view;

  constructor(storyId, { model, view }) {
    this.#storyId = storyId;
    this.#model = model;
    this.#view = view;
  }

  async getStoryDetail() {
    this.#view.showLoading();
    try {
      const response = await this.#model.getStoryById(this.#storyId);

      if (!response.ok) {
        console.error('getStoryDetail: response:', response);
        return;
      }

      console.log(response.story);      

      this.#view.populateStoryDetail(response.message, response.story);
    } catch (error) {
      console.error('getStoryDetail: error:', error);
    } finally {
      this.#view.hideLoading();
    }
  }

async showStoryDetailMap() {
    this.#view.showMapLoading();
    
    try {
      console.log('adakah');
      await this.#view.initialMap();
    } catch (error) {
      console.error('showStoryDetailMap: error:', error);
    } finally {
      this.#view.hideMapLoading();
    }
  }
}