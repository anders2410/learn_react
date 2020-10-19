import React, { Component } from "react";
import LikeButton from "./common/likeButton";
import Table from "./common/table";
import { Link } from "react-router-dom";
import { Column, Movie, SortColumn } from "../types/types";

interface Props {
  movies: Movie[];
  sortColumn: SortColumn;
  onDelete: (arg: Movie) => void;
  onLike: (arg: Movie) => void;
  onSort: (arg: SortColumn) => void;
}

export default class MoviesTable extends Component<Props> {
  columns: Column[] = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      path: "",
      key: "1",
      content: (movie) => (
        <LikeButton
          liked={movie.liked}
          onClick={() => this.props.onLike(movie)}
        />
      ),
    },
    {
      path: "",
      key: "2",
      content: (movie) => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { movies, sortColumn, onSort } = this.props;

    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}
