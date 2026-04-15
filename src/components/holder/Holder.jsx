import { Col, Row } from "react-bootstrap";

const Holder = ({ label, value, imageUrl }) => {
  return (
    <>
      <Row className="my-3 align-items-center">
        <Col className="text-muted" md={3}>
          {label}
        </Col>
        {!imageUrl && (
          <Col className="text-end" md={9}>
            {value}
          </Col>
        )}
        {imageUrl && (
          <Col className="text-end" md={9}>
            <img src={imageUrl} alt="" style={{ width: "100px" }} />
          </Col>
        )}
      </Row>
    </>
  );
};

export default Holder;
