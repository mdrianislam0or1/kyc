import { Link } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineUser, AiOutlineBank, AiOutlineBuild } from "react-icons/ai";
import NavigationBar from "./layout/NavigationBar";

const Home = () => {
  return (
    <>
      <NavigationBar />
      <Container>
        <Card color="#FF6B6B">
          <CardLink to="/customer-registration">
            <CardContent>
              <IconWrapper>
                <AiOutlineUser size={40} />
              </IconWrapper>
              <CardTitle>KYC Customer Registration</CardTitle>
            </CardContent>
          </CardLink>
        </Card>
        <Card color="#6BFF8B">
          <CardLink to="/financial-institution-registration">
            <CardContent>
              <IconWrapper>
                <AiOutlineBuild size={40} />
              </IconWrapper>
              <CardTitle>Financial Institution Registration</CardTitle>
            </CardContent>
          </CardLink>
        </Card>
        <Card color="#6B8BFF">
          <CardLink to="/bank-registration">
            <CardContent>
              <IconWrapper>
                <AiOutlineBank size={40} />
              </IconWrapper>
              <CardTitle>Bank Registration</CardTitle>
            </CardContent>
          </CardLink>
        </Card>
      </Container>
    </>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Card = styled.div`
  width: 300px;
  height: 200px;
  background-color: ${(props) =>
    props.color || "#f9f9f9"}; /* Light gray background */
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin: 0 20px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px); /* Lift up on hover */
  }
`;

const CardContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  color: #333333;
  text-align: center;
`;

const CardLink = styled(Link)`
  text-decoration: none;
  color: #333333;
`;

const IconWrapper = styled.div`
  margin-bottom: 10px;
`;
