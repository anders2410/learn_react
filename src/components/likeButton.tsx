import React, { Component } from "react";

interface Props {
  liked: boolean;
  onClick: () => void;
}

const LikeButton = (props: Props) => {
  const { liked, onClick } = props;

  if (liked) {
    return (
      <i
        onClick={onClick}
        style={{ cursor: "pointer" }}
        className="fa fa-heart"
        aria-hidden="true"
      />
    );
  } else {
    return (
      <i
        onClick={onClick}
        style={{ cursor: "pointer" }}
        className="fa fa-heart-o"
        aria-hidden="true"
      />
    );
  }
};

export default LikeButton;
