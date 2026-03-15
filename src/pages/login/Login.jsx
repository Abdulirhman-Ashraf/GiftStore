import { Alert, Form } from "react-bootstrap";
import Buttons from "../../components/Buttons";
import Inputs from "../../components/inputs/Inputs";
import { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  // handle Submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="login">
      <Form className="w-50 m-auto pt-5" onSubmit={handleSubmit}>
        <Alert variant="info" style={{fontWeight:"bold"}}>For Admin Dashboard <br /> Email : admin@example.com & password : 123456</Alert>
        {/* email */}
        <Inputs type={"email"} id={"Email"} ref={emailRef} />

        {/* password */}

        <Inputs id={"Password"} type={"password"} ref={passwordRef} />
        {error && <Alert variant="danger">{error}</Alert>}
        <Buttons variant="primary" value="LogIn" loading={loading} />
        <div>Need an account ? <Link to={'/signup'}>Signup</Link></div>
        <div>Forgot Your Password ? <Link to={'/forget-password'}>Reset Password</Link></div>
      </Form>
    </div>
  );
};

export default Login;
