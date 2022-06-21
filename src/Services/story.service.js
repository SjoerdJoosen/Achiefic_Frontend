import axios from "axios";


const Story_API_BASE_URL = "http://localhost:8080/api";

class StoryDataService {
  getAllStories() {
    return axios.get(Story_API_BASE_URL + "/stories");
  }

  getStoryById(id) {
    return axios.get(Story_API_BASE_URL + "/stories/" + id);
  }

  addStory(data) {
    return axios.post(Story_API_BASE_URL + "/story/" + data);
  }

  updateStory(id, data) {
    return axios.update(Story_API_BASE_URL + "/story/" + id, data);
  }

  deleteStory(id) {
    return axios.delete(Story_API_BASE_URL + "/story/" + id);
  }

  findByTitle(title) {
    return axios.get(Story_API_BASE_URL + "/stories?title" + title);
  }
}

export default new StoryDataService();