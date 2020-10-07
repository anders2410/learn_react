import React from "react";
import LikeButton from "./common/likeButton";
import { Movie } from "./movies";

interface Props {
  movies: Movie[];
  onDelete: (arg: Movie) => void;
  onLike: (arg: Movie) => void;
  onSort: (arg: string) => void;
}

const MoviesTable = (props: Props) => {
  const { movies, onDelete, onLike, onSort } = props;

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col" onClick={() => onSort("title")}>
            Title
          </th>
          <th scope="col" onClick={() => onSort("genre.name")}>
            Genre
          </th>
          <th scope="col" onClick={() => onSort("numberInStock")}>
            Stock
          </th>
          <th scope="col" onClick={() => onSort("dailyRentalRate")}>
            Rate
          </th>
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
              <LikeButton liked={movie.liked} onClick={() => onLike(movie)} />
            </td>
            <td>
              <button
                onClick={() => onDelete(movie)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MoviesTable;