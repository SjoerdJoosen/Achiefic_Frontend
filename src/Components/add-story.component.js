import React, { Component } from "react";
import StoryDataService from "../services/story.service";

export default class AddStory extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeGenre = this.onChangeGenre.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeActualStory = this.onChangeActualStory.bind(this);
    this.saveStory = this.saveStory.bind(this);
    this.newStory = this.newStory.bind(this);

    this.state = {
      id: null,
      title: "",
      author: "",
      genre: "",
      description: "",
      actualStory: "", 
      published: false,

      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeAuthor(e) {
    this.setState({
      author: e.target.value
    });
  }

  onChangeGenre(e) {
    this.setState({
      genre: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeActualStory(e) {
    this.setState({
      actualStory: e.target.value
    });
  }


  saveStory() {
    var data = {
      title: this.state.title,
      description: this.state.description
    };

    StoryDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          author: response.data.author,
          genre: response.data.genre,
          description: response.data.description,
          actualStory: response.data.actualStory,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newStory() {
    this.setState({
      id: null,
      title: "",
      author: "",
      genre: "",
      description: "",
      actualStory: "", 
      published: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newStory}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Author">Author</label>
              <input
                type="text"
                className="form-control"
                id="author"
                required
                value={this.state.author}
                onChange={this.onChangeAuthor}
                name="author"
              />
            </div>

            <div className="form-group">
              <label htmlFor="genre">Genre</label>
              <input
                type="text"
                className="form-control"
                id="genre"
                required
                value={this.state.genre}
                onChange={this.onChangeGenre}
                name="genre"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="actualStory">Story</label>
              <input
                type="text"
                className="form-control"
                id="actualStory"
                required
                value={this.state.actualStory}
                onChange={this.onChangeActualStory}
                name="actualStory"
              />
            </div>

            <button onClick={this.saveStory} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
