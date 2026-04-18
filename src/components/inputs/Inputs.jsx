import { forwardRef } from "react";
import { Form } from "react-bootstrap";
import './inputs.css'
const Inputs = forwardRef(
  (
    {
      type,
      id,
      placeholder,
      defaultValue,
      noLabel = false,
      onChange,
      maxlength,
      value,
      style,
      isRequired = true,
    },
    ref,
  ) => {

    return (
      <Form.Group className="mb-4 " controlId={id}>
        <Form.Label >{noLabel ? "" : id}</Form.Label>
        <Form.Control
        className="inputs"
          type={type}
          placeholder={` ${placeholder ? placeholder : id}`}
          ref={ref}
          onChange={onChange}
          defaultValue={defaultValue}
          value={value}
          name={id}
          style={style}
          required={isRequired}
          maxLength={maxlength}
        />
      </Form.Group>
    );
  },
);

export default Inputs;
