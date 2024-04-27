/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "styled-components";

const GetAllCustomerCard = ({ customers }: { customers: any[] }) => {
  return (
    <>
      {customers.map((customer) => (
        <Card key={customer._id} isFavorite={customer.isFavorite}>
          {customer.isFavorite && <FavoriteLabel>Favorite</FavoriteLabel>}
          <CardContent>
            <Avatar src={customer.photograph} alt="Avatar" />
            <SelectWrapper>
              <Select>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </SelectWrapper>
            <Name>{customer.fullName}</Name>
            <ContactInfo>
              <Email>Email: {customer.email}</Email>
              <PhoneNumber>Phone: {customer.contactNumber}</PhoneNumber>
              <Address>Address: {customer.residentialAddress}</Address>
            </ContactInfo>
            <OptionalDiv>
              <Actions>
                <UpdateButton>Update</UpdateButton>
                <DeleteButton>Delete</DeleteButton>
                <FavoriteButton>Favorite</FavoriteButton>
              </Actions>
            </OptionalDiv>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default GetAllCustomerCard;

const Card = styled.div<{ isFavorite: boolean }>`
  width: 300px;
  margin: 20px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-top: ${({ isFavorite }) =>
    isFavorite ? "3px solid #FFD95A" : "none"};

  position: relative;
`;

const CardContent = styled.div`
  padding: 20px;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const ContactInfo = styled.div`
  margin-bottom: 10px;
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Email = styled.div`
  font-size: 14px;
  margin-bottom: 3px;
`;

const PhoneNumber = styled.div`
  font-size: 14px;
  margin-bottom: 3px;
`;

const Address = styled.div`
  font-size: 14px;
`;

const OptionalDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SelectWrapper = styled.div`
  position: relative;
`;

const Select = styled.select`
  background-color: #143f6b;
  color: #fff;
  padding: 4px 6px;
  border: none;
  cursor: pointer;
  font-size: 12px;
`;

const Actions = styled.div`
  display: flex;
  gap: 5px;
`;

const Button = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const UpdateButton = styled(Button)`
  background-color: #a3d8ff;
  color: black;
`;

const DeleteButton = styled(Button)`
  background-color: #ff204e;
  color: #fff;
`;

const FavoriteButton = styled(Button)`
  background-color: #4ccd99;
  color: #fff;
`;

const FavoriteLabel = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: #ffd95a;
  color: #333;
  padding: 4px 6px;
  font-weight: bold;
  border-radius: 0 0 0 5px;
`;
