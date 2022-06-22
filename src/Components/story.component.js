import React, { Component } from "react";
import StoryDataService from "../Services/story.service";

export default class Story extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getStory = this.getStory.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateStory = this.updateStory.bind(this);
    this.deleteStory = this.deleteStory.bind(this);

    this.state = {
      currentStory: {
        id: null,
        title: "",
        author: "",
        genre: "",
        description: "",
        actualStory: "", 
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getStory(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentStory: {
          ...prevState.currentStory,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentStory: {
        ...prevState.currentStory,
        description: description
      }
    }));
  }

  getStory(id) {
    StoryDataService.getStoryById(id)
      .then(response => {
        this.setState({
          currentStory: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentStory.id,
      title: this.state.currentStory.title,
      description: this.state.currentStory.description,
      published: status
    };

    StoryDataService.updateStory(this.state.currentStory.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentStory: {
            ...prevState.currentStory,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateStory() {
    StoryDataService.updateStory(
      this.state.currentStory.id,
      this.state.currentStory
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Story was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteStory() {    
    StoryDataService.deleteStory(this.state.currentStory.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/Stories')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentStory } = this.state;

    return (
      <div>
        {currentStory ? (
          <div className="edit-form">
            <h4>Story</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentStory.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentStory.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentStory.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentStory.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteStory}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateStory}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Story...</p>
          </div>
        )}
      </div>
    );
  }
}
