import React from "react";

interface Props {
  liked: boolean;
  onClick: () => void;
}

/*
* Returns a like button component.
* Props: liked (is the movie already liked),
*        onClick (callBack function to handle a like)
* */
const LikeButton = ({ liked, onClick }: Props) => {
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
