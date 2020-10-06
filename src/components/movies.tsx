import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import LikeButton from "./common/likeButton";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";

// How to define types in TypeScript.
// This is the type of a movie.
interface Movie {
  _id: string;
  title: string;
  genre: { _id: string; name: string };
  numberInStock: number;
  dailyRentalRate: number;
  publishDate: string;
  liked: boolean;
}

export interface Genre {
  _id: string;
  name: string;
}

interface State {
  movies: Movie[];
  genres: Genre[];
  currentPage: number;
  pageSize: number;
  selectedGenre: Genre;
}

export default class Movies extends Component {
  state: State = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    selectedGenre: { _id: "", name: "All Genres" },
  };

  // This is where you would get backend calls/API calls
  // to get information into your project.
  componentDidMount() {
    const genres = [{ name: "All Genres"}, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = (movie: Movie) => {
    const movies: Movie[] = this.state.movies.filter(
      (m: Movie) => m._id !== movie._id
    );
    this.setState({ movies });
  };

  handleLike = (movie: Movie) => {
    const movies: Movie[] = [...this.state.movies];
    const index: number = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page: any) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre: Genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  render() {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies,
      genres: allGenres,
    } = this.state;
    const { length: moviesCount } = allMovies;

    if (moviesCount === 0) {
      return <p>There are no movies in the database</p>;
    }

    const filtered = selectedGenre && selectedGenre._id ? allMovies.filter((m: Movie) => m.genre._id === selectedGenre._id) : allMovies;
    const movies = paginate(filtered, currentPage, pageSize);

    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-3">
              <ListGroup
                items={allGenres}
                selectedGenre={this.state.selectedGenre}
                onItemSelect={this.handleGenreSelect}
              />
            </div>

            <div className="col-6">
              <p>Showing {filtered.length} movies in the databse.</p>
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
                  {movies.map((movie: Movie) => (
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
              <Pagination
                itemsCount={filtered.length}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
