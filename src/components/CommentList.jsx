import { useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import SingleComment from "./SingleComment";
import { TrashFill } from "react-bootstrap-icons";

const CommentList = (props) => {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ListGroup>
      {props.comments.map((comment) => (
        <ListGroup.Item key={`comLis-${comment._id}`} className="d-flex align-items-center p-4">
          <SingleComment id={`sCom-${comment._id}`} comment={comment} />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};
export default CommentList;
