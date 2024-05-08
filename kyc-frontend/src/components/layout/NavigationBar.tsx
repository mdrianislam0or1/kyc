import React, { useState } from "react";
import { styled } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { device } from "../../styles/breakPoints";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { useAppSelector } from "../../redux/hooks";
import { logout, selectCurrentUser } from "../../redux/features/auth/authSlice";
import { Button } from "antd";
import {
  resetInstituteData,
  selectInstitute,
} from "../../redux/features/FNInstitute/instituteSlice";
import { useDispatch, useSelector } from "react-redux";

interface NavElementsProps {
  showNavbar: boolean;
}

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const NavStyle = styled.nav`
  height: 60px;
  background-color: #2c3e50;
  position: relative;
`;

const MenuIcon = styled.div`
  display: none;
  color: white;
  @media ${device.md} {
    display: block;
    cursor: pointer;
  }
`;

const NavElements = styled.div<NavElementsProps>`
  @media ${device.md} {
    position: absolute;
    right: 0;
    top: 60px;
    background-color: #2c3e50;
    height: calc(100vh - 60px);
    transition: all 0.3s ease-in;
    overflow: hidden;
    width: ${({ showNavbar }) => (showNavbar ? "270px" : "0")};
    z-index: 2;
    ul {
      display: flex;
      flex-direction: column;
      li {
        margin-right: unset;
        margin-top: 22px;
      }
    }
  }
  ul {
    display: flex;
    justify-content: space-between;
    list-style-type: none;
  }
  ul li:not(:last-child) {
    margin-right: 60px;
    @media ${device.md} {
      margin-right: 30px;
    }
  }
  ul a {
    font-size: 16px;
    font-weight: 400;
    color: white;
    text-decoration: none;
  }
  ul a.active {
    color: white;
    font-weight: 500;
    position: relative;
  }
  ul a.active::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #574c4c;
  }
`;
const LOGO = styled.div`
  color: white;
`;

const Navbar: React.FC = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  const navigate = useNavigate();

  const instituteData = useSelector(selectInstitute);
  console.log("instituteData", instituteData);

  const dispatch = useDispatch();
  const user = useAppSelector(selectCurrentUser);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetInstituteData());
    navigate("/");
    localStorage.removeItem("token");
    window.location.reload();
  };
  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  console.log("user", user);
  return (
    <NavStyle>
      <Container>
        <LOGO>
          <AiOutlineMenu />
        </LOGO>
        <MenuIcon onClick={handleShowNavbar}>
          <AiOutlineMenuUnfold />
        </MenuIcon>
        <NavElements
          showNavbar={showNavbar}
          className={showNavbar ? "active" : undefined}
        >
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/customer-login">Login</Link>
            </li>
            <li>
              <Link to="/institute-login">FN-Login</Link>
            </li>

            {instituteData?.role === "manager" && (
              <>
                <li>
                  <Link to="/manager/institute-profile">Institue Details</Link>
                </li>

                <li>
                  <Link to="/add-users-request"> Add Customer</Link>
                </li>
              </>
            )}
            {instituteData?.role === "superAdmin" && (
              <>
                <li>
                  <Link to="/all-institute">Financial Institute</Link>
                </li>
              </>
            )}

            <li>
              <Button onClick={handleLogout} type="primary" danger>
                Logout
              </Button>
            </li>
          </ul>
        </NavElements>
      </Container>
    </NavStyle>
  );
};

export default Navbar;
