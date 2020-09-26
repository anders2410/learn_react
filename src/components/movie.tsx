import React, { Component } from "react";
import {getMovies} from "../services/fakeMovieService";

export default class Movie extends Component {
  state = {
    movies: getMovies(),
  };

  handleDelete = () => {};

  render() {
    return (
      <div>
        <ul>{this.state.movies.map(value => <li>{value.title}</li>)}</ul>
      </div>
    );
  }
}