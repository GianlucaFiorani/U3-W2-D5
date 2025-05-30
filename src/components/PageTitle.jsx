import { Form } from "react-bootstrap";

function PageTitle(props) {
  return (
    <div className="title mt-4">
      <div className="d-flex justify-content-between">
        <div className="d-flex align-items-center gap-5">
          <Form
            className="d-flex"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <Form.Control
              type="text"
              placeholder={`Search city`}
              className="me-2"
              onChange={(e) => {
                e.target.value ? props.search(e.target.value) : props.search(".");
              }}
            />
          </Form>
        </div>
      </div>
    </div>
  );
}
export default PageTitle;
