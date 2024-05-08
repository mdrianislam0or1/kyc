/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "styled-components";
import { useGetAllAddedUserQuery } from "../../redux/features/FNInstitute/instituteApi";
import NavigationBar from "../../components/layout/NavigationBar";

const FinancialInProfile = () => {
  const { data: userAddedToInstitute } = useGetAllAddedUserQuery({});

  console.log(userAddedToInstitute?.data);

  return (
    <>
      <NavigationBar />
      <Container>
        <h2>Financial Institute Profile</h2>
        {userAddedToInstitute?.data.map((user: any) => (
          <UserCard key={user._id}>
            <UserInfo>
              <p>
                <strong>Full Name:</strong> {user.fullName}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Occupation:</strong> {user.occupation}
              </p>
              {/* Add more user information fields as needed */}
            </UserInfo>
            <UserImage src={user.photograph} alt="User Photograph" />
          </UserCard>
        ))}
      </Container>
    </>
  );
};

export default FinancialInProfile;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const UserCard = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const UserImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-left: 20px;
`;
