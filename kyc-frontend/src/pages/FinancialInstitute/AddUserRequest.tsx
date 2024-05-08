import React, { useState } from "react";

import { Link } from "react-router-dom";
import NavigationBar from "../../components/layout/NavigationBar";
import styled from "styled-components";
import { useAddUsersToInstituteMutation } from "../../redux/features/AddUserInstitute/AddUserApi";
import { useSelector } from "react-redux";
import { selectInstitute } from "../../redux/features/FNInstitute/instituteSlice";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const InputField = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    margin-bottom: 5px;
  }

  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  margin-top: 10px;
`;

const SuccessMessage = styled.div`
  color: #28a745;
  margin-top: 10px;
`;

const AddUserRequest = () => {
  const instituteData = useSelector(selectInstitute);
  console.log("instituteData", instituteData);
  const [instituteId, setInstituteId] = useState(instituteData?._id || "");
  const [userNIDs, setUserNIDs] = useState<string[]>([]);
  const [addUsersRequest, { isLoading, isError, isSuccess }] =
    useAddUsersToInstituteMutation();

  const handleAddUsers = async () => {
    try {
      const response = await addUsersRequest({
        instituteId,
        userNIDs,
      });

      console.log("Response:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInstituteIdChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInstituteId(event.target.value);
  };

  const handleUserNIDsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const ids = event.target.value.split(",").map((id) => id.trim());
    setUserNIDs(ids);
  };

  return (
    <>
      <NavigationBar />
      <Wrapper>
        <FormContainer>
          <InputField>
            <label htmlFor="instituteId">Institute ID:</label>
            <input
              type="text"
              id="instituteId"
              value={instituteId}
              onChange={handleInstituteIdChange}
            />
          </InputField>
          <InputField>
            <label htmlFor="userNIDs">User NIDs (comma-separated):</label>
            <input
              type="text"
              id="userNIDs"
              value={userNIDs.join(",")}
              onChange={handleUserNIDsChange}
            />
          </InputField>
          <Button onClick={handleAddUsers} disabled={isLoading}>
            Add Users
          </Button>
          {isError && <ErrorMessage>Error adding users</ErrorMessage>}
          {isSuccess && (
            <SuccessMessage>Users added successfully</SuccessMessage>
          )}
          {isLoading && <div>Loading...</div>}
        </FormContainer>
        <Link to="/verify-otp">Verify and Add Customer to the FN</Link>
      </Wrapper>
    </>
  );
};

export default AddUserRequest;
