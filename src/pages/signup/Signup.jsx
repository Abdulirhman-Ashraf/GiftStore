import { Alert, Container, Form } from "react-bootstrap";
import Inputs from "../../components/inputs/Inputs";
import Buttons from "../../components/Buttons";
import { useAuth } from "../../context/AuthContext";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();
  // confirm password

  // handle Submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (confirmPasswordRef.current.value === passwordRef.current.value) {
        setLoading(true);
        await signup(
          emailRef.current.value,
          passwordRef.current.value,
          nameRef.current.value,
        );
        navigate("/");
      } else {
        setError("Passwords don't match");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="signup">
      <Container>
        <Form className=" m-auto pt-5" onSubmit={handleSubmit}>
          {/* email */}
          <Inputs type={"text"} id={"Name"} ref={nameRef} />

          <Inputs type={"email"} id={"Email"} ref={emailRef} />

          {/* password */}

          <Inputs id={"Password"} type={"password"} ref={passwordRef} />
          {/*Confirm password */}

          <Inputs
            id={"Confirm Password"}
            type={"password"}
            ref={confirmPasswordRef}
          />

          {error && <Alert variant="danger"> {error}</Alert>}
          <Buttons variant="primary" value="Sign up" loading={loading} />
          <div>
            Already Have an account ? <Link to={"/login"}>Login</Link>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default Signup;
