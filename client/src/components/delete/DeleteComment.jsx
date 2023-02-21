import React from "react";

const DeleteComment = (props) => {
  const handleDelete = async (comment_id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/comment/${comment_id}`,
        {
          method: "DELETE",
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      if (!response.ok) {
        return alert("Invalid Action");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={(e) => handleDelete(props.comment.comment_id)}
      className="delete"
    >
      Delete
    </button>
  );
};

export default DeleteComment;