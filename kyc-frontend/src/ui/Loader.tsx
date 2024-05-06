import React from "react";
import styled, { keyframes } from "styled-components";

// Animation keyframes
const bounceAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
`;

// New animation keyframes for color change
const colorChangeAnimation = keyframes`
  0% { background-color: #ff4d4d; }
  25% { background-color: #ffad4d; }
  50% { background-color: #ffea4d; }
  75% { background-color: #4dff4d; }
  100% { background-color: #4dffff; }
`;

// Styled components
const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Make the container full height of the viewport */
  background-color: #f0f0f0; /* Light gray background */
`;

const LoaderWrapper = styled.div`
  width: 100px; /* Adjust the width as needed */
  height: 100px; /* Adjust the height as needed */
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const LoaderDot = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 0 5px;
  animation: ${bounceAnimation} 0.5s ease-in-out infinite alternate,
    ${colorChangeAnimation} 3s linear infinite; /* Apply color change animation */
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

const Loader = () => {
  return (
    <LoaderContainer>
      <LoaderWrapper>
        <LoaderDot style={{ backgroundColor: "#ff4d4d" }} />
        <LoaderDot style={{ backgroundColor: "#ffad4d" }} />
        <LoaderDot style={{ backgroundColor: "#ffea4d" }} />
      </LoaderWrapper>
    </LoaderContainer>
  );
};

export default Loader;
