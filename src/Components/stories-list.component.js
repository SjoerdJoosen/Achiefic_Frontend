import React, { Component } from "react";
import StoryDataService from "../services/story.service";
import { Link } from "react-router-dom";

export default class StoryList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveStories = this.retrieveStories.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveStory = this.setActiveStory.bind(this);
    this.removeAllstories = this.removeAllstories.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      stories: [],
      currentstory: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveStories();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveStories() {
    StoryDataService.getAll()
      .then(response => {
        this.setState({
          stories: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveStories();
    this.setState({
      currentstory: null,
      currentIndex: -1
    });
  }

  setActiveStory(story, index) {
    this.setState({
      currentstory: story,
      currentIndex: index
    });
  }

  removeAllstories() {
    StoryDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentstory: null,
      currentIndex: -1
    });

    StoryDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          stories: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, stories, currentstory, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Stories List</h4>

          <ul className="list-group">
            {stories &&
              stories.map((story, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActivestory(story, index)}
                  key={index}
                >
                  {story.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllstories}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentstory ? (
            <div>
              <h4>story</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentstory.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentstory.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentstory.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/stories/" + currentstory.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a story...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
