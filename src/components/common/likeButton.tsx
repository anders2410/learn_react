import React from "react";

interface Props {
  liked: boolean;
  onClick: () => void;
}

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
