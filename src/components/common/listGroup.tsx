import React from "react";
import { Genre } from "../movies";

interface Props {
  items: any;
  textProperty: string;
  valueProperty: string;
  selectedGenre: Genre;
  onItemSelect(genre: Genre): void;
}

const ListGroup = (props: Props) => {
  const {
    items,
    textProperty,
    valueProperty,
    selectedGenre,
    onItemSelect,
  } = props;

  function getClassName(genre: Genre) {
    if (selectedGenre.name === genre.name) {
      return "list-group-item list-group-item-action active";
    } else {
      return "list-group-item list-group-item-action";
    }
  }

  return (
    <div className="list-group">
      {items.map((genre: any) => (
        <button
          key={genre[valueProperty]}
          onClick={() => onItemSelect(genre)}
          type="button"
          className={getClassName(genre)}
        >
          {genre[textProperty]}
        </button>
      ))}
    </div>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
