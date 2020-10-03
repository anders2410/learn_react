import React from 'react';

const ListGroup = () => {
  return (
    <div className="list-group" id="list-tab" role="tablist">
      <button
        type="button"
        className="list-group-item list-group-item-action active"
      >
        All Genres
      </button>
      <button
        type="button"
        className="list-group-item list-group-item-action"
      >
        Action
      </button>
      <button
        type="button"
        className="list-group-item list-group-item-action"
      >
        Comedy
      </button>
      <button
        type="button"
        className="list-group-item list-group-item-action"
      >
        Thriller
      </button>
    </div>
  );
};

export default ListGroup;