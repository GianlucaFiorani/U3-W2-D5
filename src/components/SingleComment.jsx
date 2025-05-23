const SingleComment = (props) => {
  const star = () => {
    let s = "";
    for (let i = 0; i < parseInt(props.comment.rate); i++) {
      s += "★";
    }
    return s;
  };

  return (
    <div>
      <span className="fw-semibold">{props.comment.author}</span>
      <p className="text-netflix fs-5">{star()}</p>
      <p className="fs-4">{props.comment.comment}</p>
    </div>
  );
};
export default SingleComment;
