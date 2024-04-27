import styled, { keyframes } from "styled-components";

const Loader = () => {
  return <StyledLoader />;
};

export default Loader;

const breatheAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const StyledLoader = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  position: relative;
  border: 3px solid #ffffff;
  border-radius: 50%;
  animation: ${breatheAnimation} 1.5s ease-in-out infinite;
  background: transparent;
  z-index: 1000; /* Ensure it's above other content */
  &::before,
  &::after {
    content: "";
    position: absolute;
    border: 3px solid #ffffff;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: ${breatheAnimation} 1.5s ease-in-out infinite;
    background: transparent;
  }
  &::before {
    top: -55px;
  }
  &::after {
    top: 55px;
  }
`;
