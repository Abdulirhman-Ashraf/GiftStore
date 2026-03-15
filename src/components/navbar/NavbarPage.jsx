import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Cart from "../../pages/Cart/Cart";
import "./navbarPage.css";
import { useFireStore } from "../../context/FireStoreContext";
const NavbarPage = () => {
  const { currentUser } = useAuth();
  const { cartItems, role } = useFireStore();

  return (
    <div className="navbarPage">
      <Navbar expand="lg" className="bg-body-tertiary w-100 ">
        <Container>
          <Navbar.Brand as={Link} to="/" style={{fontWeight:"bold"}}>
            Hello Store{" "}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/profile">
                Profile
              </Nav.Link>
              {role === "admin" && currentUser ? (
                <Nav.Link as={Link} to="/dashboard">
                  Dashboard
                </Nav.Link>
              ) : (
                ""
              )}
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/shop">
                Shop
              </Nav.Link>

              {!currentUser && (
                <>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                </>
              )}
            </Nav>
            {currentUser && (
              <>
                <div className="d-flex align-items-center cartBox">
                  <span className="displayedProductCount">
                    {cartItems.length}
                  </span>
                  <Cart />
                </div>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarPage;
