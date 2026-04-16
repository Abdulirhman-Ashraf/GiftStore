import { forwardRef } from "react";
import { Form } from "react-bootstrap";

const Inputs = forwardRef(
  ({ type, id, defaultValue, noLabel, onChange ,style,isRequired=true}, ref) => {
    return (
      <Form.Group className="mb-4" controlId={id}>
        <Form.Label>{noLabel ? "" : id}</Form.Label>
        <Form.Control
          type={type}
          placeholder={` ${id}`}
          ref={ref}
          onChange={onChange}
          defaultValue={defaultValue}
          style={style}
          required={isRequired}
        />
      </Form.Group>
    );
  },
);

export default Inputs;
