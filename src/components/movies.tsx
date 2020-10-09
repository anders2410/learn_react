import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable, { SortColumn } from "./moviesTable";
import _ from "lodash";

// How to define types in TypeScript.
// This is the type of a movie.
export interface Movie {
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
  sortColumn: { path: string; order: string };
}

export default class Movies extends Component {
  state: State = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    selectedGenre: { _id: "", name: "All Genres" },
    sortColumn: { order: "", path: "" },
  };

  // This is where you would get backend calls/API calls
  // to get information into your project.
  componentDidMount() {
    const genres = [{ name: "All Genres" }, ...getGenres()];
    this.setState({ _id: "", movies: getMovies(), genres });
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

  handleSort = (sortColumn: SortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies,
      genres: allGenres,
      sortColumn,
    } = this.state;
    const { length: moviesCount } = allMovies;

    if (moviesCount === 0) {
      return <p>There are no movies in the database</p>;
    }

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m: Movie) => m.genre._id === selectedGenre._id)
        : allMovies;

    // @ts-ignore
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

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

            <div className="col-8">
              <p>Showing {filtered.length} movies in the databse.</p>
              <MoviesTable
                movies={movies}
                sortColumn={sortColumn}
                onLike={this.handleLike}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
              />
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
