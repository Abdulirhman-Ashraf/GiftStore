import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Cart from "../../pages/Cart/Cart";
import { useFireStore } from "../../context/FireStoreContext";
import "./navbarPage.css";
const NavbarPage = () => {
  const { currentUser } = useAuth();
  const { cartItems, role } = useFireStore();

  return (
    <div className="navbarPage">
      <Navbar expand="lg" className=" w-100 ">
        <Container>
          <Navbar.Brand as={Link} to="/" style={{ fontWeight: "bold" }}>
            GiftStore
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/shop">
                Shop
              </Nav.Link>
              <Nav.Link as={Link} to="/profile">
                Profile
              </Nav.Link>
              {role === "admin" && currentUser && (
                <Nav.Link as={Link} to="/dashboard">
                  Dashboard
                </Nav.Link>
              )}

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
                  <Badge
                    bg="danger"
                    pill
                    className=" position-absolute top-0 start-100 translate-middle"
                    style={{ fontSize: "0.55rem" }}
                  >
                    {cartItems.length}
                  </Badge>
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
