import styled from "styled-components";

const Success = ({ message }: { message: string }) => {
  return <StyledSuccess>{message}</StyledSuccess>;
};

export default Success;

const StyledSuccess = styled.div`
  padding: 1rem;
  background-color: #ccffcc;
  color: #008000;
  border: 2px solid #008000;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  width: fit-content;
  margin: 0 auto;
`;
