import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import LikeButton from "./likeButton";

export default class Movies extends Component {
  state = {
    movies: getMovies(),
  };

  handleDelete = (movie: any) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie: any) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = {...movies[index]};
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  render() {
    const { length: moviesCount } = this.state.movies;

    if (moviesCount === 0) {
      return <p>There are no movies in the database</p>;
    }

    return (
      <div className="container">
        <p>Showing {moviesCount} movies in the databse.</p>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie) => (
              <tr key={movie._id}>
                <th>{movie.title}</th>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <LikeButton
                    liked={movie.liked}
                    onClick={() => this.handleLike(movie)}
                  />
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(movie)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
