import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Movie, SortColumn } from "../types/types";
import { NavLink, Link } from "react-router-dom";

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

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies,
      sortColumn,
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m: Movie) => m.genre._id === selectedGenre._id)
        : allMovies;

    // @ts-ignore
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: moviesCount } = this.state.movies;
    const { pageSize, currentPage, sortColumn, genres: allGenres } = this.state;

    if (moviesCount === 0) {
      return <p>There are no movies in the database</p>;
    }

    const { totalCount, data: movies } = this.getPageData();

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
              <Link className="btn btn-primary" to="/movies/new">
                New Movie
              </Link>
              <p>Showing {totalCount} movies in the databse.</p>
              <MoviesTable
                movies={movies}
                sortColumn={sortColumn}
                onLike={this.handleLike}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
              />
              <Pagination
                itemsCount={totalCount}
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
