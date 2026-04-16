import React, { useRef, useState } from "react";
import Inputs from "../../components/inputs/Inputs";
import Buttons from "../../components/Buttons";
import { Alert, Container, Form } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const emailRef = useRef();
  const navigate = useNavigate();
  const { ResetPassword } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await ResetPassword(emailRef.current.value);
      setMessage("Check Your Inbox");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      setError(err?.message || "Something is wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="forgetPasswod ">
      <Container>
        <Form className=" m-auto pt-5" onSubmit={handleSubmit}>
          {/* email */}
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Inputs type={"email"} id={"Email"} ref={emailRef} />

          <Buttons value={"Reset Password"} loading={loading} />

          <div>
            Need an account ? <Link to={"/signup"}>Signup</Link>
          </div>
          <div>
            Already have an account? <Link to={"/login"}>Login</Link>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default ForgetPassword;
