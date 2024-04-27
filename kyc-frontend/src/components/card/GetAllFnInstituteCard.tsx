/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "styled-components";

const GetAllFnInstituteCard = ({ institute }: { institute: any }) => {
  return (
    <Card>
      <CardContent>
        <CardTitle>{institute.name}</CardTitle>
        <FieldContainer>
          <FieldLabel>Registration Number:</FieldLabel>
          <FieldValue>{institute.registrationNumber}</FieldValue>
        </FieldContainer>
        <FieldContainer>
          <FieldLabel>Email:</FieldLabel>
          <FieldValue>{institute.email}</FieldValue>
        </FieldContainer>
        <FieldContainer>
          <FieldLabel>Role:</FieldLabel>
          <FieldValue>{institute.role}</FieldValue>
        </FieldContainer>
      </CardContent>
    </Card>
  );
};

export default GetAllFnInstituteCard;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const CardContent = styled.div`
  padding: 20px;
`;

const CardTitle = styled.h2`
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
`;

const FieldContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const FieldLabel = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

const FieldValue = styled.span`
  color: #666;
`;
