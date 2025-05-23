import { useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { BorderWidth, GridFill } from "react-bootstrap-icons";
import { Form } from "react-bootstrap";

function PageTitle(props) {
  const [radioValue, setRadioValue] = useState("1");

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
              placeholder={`Search ${props.show ? "Tv-Show" : "Movie"}`}
              className="me-2"
              onChange={(e) => {
                props.search(e.target.value);
              }}
            />
          </Form>
        </div>
      </div>
    </div>
  );
}
export default PageTitle;
