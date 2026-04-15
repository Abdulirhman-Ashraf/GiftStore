import { Button, Spinner } from "react-bootstrap";

const Buttons = ({ variant, value, loading,active, disabled, onClick, style }) => {
  return (
    <Button
      variant={variant}
      type="submit"
      disabled={loading || disabled}
      onClick={onClick}
      style={style}
      active={active}
    >
      {loading ? (
        <Spinner style={{ width: "15px", height: "15px" }}></Spinner>
      ) : (
        value
      )}
    </Button>
  );
};

export default Buttons;
