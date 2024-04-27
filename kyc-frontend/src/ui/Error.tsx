import styled from "styled-components";

const Error = ({ message }: { message: string }) => {
  return <StyledError>{message}</StyledError>;
};

export default Error;

const StyledError = styled.div`
  padding: 1rem;
  background-color: #ffcccc;
  color: #ff0000;
  border: 2px solid #ff0000;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  width: fit-content;
  margin: 0 auto;
`;
