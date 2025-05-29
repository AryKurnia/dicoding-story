export default class StoryDetailPresenter {
  #storyId;
  #model;
  #view;
  #dbModel;

  constructor(storyId, { model, view, dbModel }) {
    this.#storyId = storyId;
    this.#model = model;
    this.#view = view;
    this.#dbModel = dbModel;
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
      // this.#view.renderSaveButton();
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

  async saveStory() {
    try {
      const response = await this.#model.getStoryById(this.#storyId);
      console.log(response.story);
      await this.#dbModel.putStory(response.story);
      this.#view.saveToBookmarkSuccessfully('Success to save to bookmark');
    } catch (error) {
      console.error('saveStory: error:', error);
      this.#view.saveToBookmarkFailed(error.message);
    }
  }

  async removeStory() {
    try {
      await this.#dbModel.removeStory(this.#storyId);
      this.#view.removeFromBookmarkSuccessfully('Success to remove from bookmark');
    } catch (error) {
      console.error('removeStory: error:', error);
      this.#view.removeFromBookmarkFailed(error.message);
    }
  }

  showSaveButton() {
    if (this.#isStorySaved()) {
      this.#view.renderRemoveButton();
      return;
    }
    this.#view.renderSaveButton();
  }

  async showSaveButton() {
    if (await this.#isStorySaved()) {
      this.#view.renderRemoveButton();
      return;
    }
    this.#view.renderSaveButton();
  }
  async #isStorySaved() {
    return !!(await this.#dbModel.getStoryById(this.#storyId));
  }
}
