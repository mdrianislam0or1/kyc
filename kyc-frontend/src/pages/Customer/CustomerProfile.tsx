import styled from "styled-components";
import { useGetCustomerQuery } from "../../redux/features/Customer/customerApi";
import NavigationBar from "../../components/layout/NavigationBar";
import Loader from "../../ui/Loader";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const ProfileCard = styled.div`
  background-color: #f9f9f9;
  border-radius: 16px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin-bottom: 30px;
`;

const Label = styled.span`
  font-weight: bold;
  color: #555;
  padding: 10px 10;
`;

const Value = styled.span`
  margin-left: 10px;
  color: #333;
  padding: 10px 10;
`;

const ImageContainer = styled.div`
  text-align: center;
`;

const Image = styled.img`
  max-width: 200px;
  border-radius: 8px;
  margin-top: 20px;
`;

const Title = styled.h2`
  font-size: 28px;
  margin-bottom: 30px;
  text-align: center;
  color: #333;
`;

const CustomerProfile = () => {
  const { data: singleCustomer } = useGetCustomerQuery({});
  console.log(singleCustomer);

  if (!singleCustomer) {
    return <Loader />;
  }

  const {
    username,
    nid,
    email,
    fullName,
    dateOfBirth,
    nationality,
    residentialAddress,
    contactNumber,
    identificationType,
    identificationNumber,
    issueDate,
    expirationDate,
    signature,
    photograph,
    occupation,
    employer,
    tin,
    sourceOfFunds,
    purposeOfAccount,
  } = singleCustomer.data;

  return (
    <>
      <NavigationBar />
      <Container>
        <Title>Customer Profile</Title>
        <ProfileCard>
          <Label>Username:</Label>
          <Value>{username}</Value>
          <br />
          <Label>NID:</Label>
          <Value>{nid}</Value>
          <br />
          <Label>Email:</Label>
          <Value>{email}</Value>
          <br />
          <Label>Full Name:</Label>
          <Value>{fullName}</Value>
          <br />
          <Label>Date of Birth:</Label>
          <Value>{new Date(dateOfBirth).toDateString()}</Value>
          <br />
          <Label>Nationality:</Label>
          <Value>{nationality}</Value>
          <br />
          <Label>Residential Address:</Label>
          <Value>{residentialAddress}</Value>
          <br />
          <Label>Contact Number:</Label>
          <Value>{contactNumber}</Value>
          <br />
          <Label>Identification Type:</Label>
          <Value>{identificationType}</Value>
          <br />
          <Label>Identification Number:</Label>
          <Value>{identificationNumber}</Value>
          <br />
          <Label>Issue Date:</Label>
          <Value>{new Date(issueDate).toDateString()}</Value>
          <br />
          <Label>Expiration Date:</Label>
          <Value>{new Date(expirationDate).toDateString()}</Value>
          <br />
          <Label>Occupation:</Label>
          <Value>{occupation}</Value>
          <br />
          <Label>Employer:</Label>
          <Value>{employer}</Value>
          <br />
          <Label>TIN:</Label>
          <Value>{tin}</Value>
          <br />
          <Label>Source of Funds:</Label>
          <Value>{sourceOfFunds}</Value>
          <br />
          <Label>Purpose of Account:</Label>
          <Value>{purposeOfAccount}</Value>
          <br />
        </ProfileCard>
        <ProfileCard>
          <Title>Signature</Title>
          <ImageContainer>
            <Image src={signature} alt="Signature" />
          </ImageContainer>
        </ProfileCard>
        <ProfileCard>
          <Title>Photograph</Title>
          <ImageContainer>
            <Image src={photograph} alt="Photograph" />
          </ImageContainer>
        </ProfileCard>
      </Container>
    </>
  );
};

export default CustomerProfile;
