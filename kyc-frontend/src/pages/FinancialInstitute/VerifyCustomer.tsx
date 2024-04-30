import React, { useState } from "react";
import { useVerifyOTPMutation } from "../../redux/features/FNInstitute/instituteApi";
import NavigationBar from "../../components/layout/NavigationBar";
import styled from "styled-components";

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Error = styled.div`
  color: red;
  margin-top: 10px;
`;

const VerifyCustomer = () => {
  const [instituteId, setInstituteId] = useState("");
  const [userNIDs, setUserNIDs] = useState<string[]>([]);
  const [otp, setOTP] = useState("");
  const [verifyOTP, { isLoading, isError }] = useVerifyOTPMutation();

  const handleVerifyOTP = async () => {
    try {
      const response = await verifyOTP({
        instituteId,
        userNIDs,
        otp,
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

  const handleOTPChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOTP(event.target.value);
  };

  return (
    <>
      <NavigationBar />
      <Container>
        <Form>
          <label htmlFor="instituteId">Institute ID:</label>
          <Input
            type="text"
            id="instituteId"
            value={instituteId}
            onChange={handleInstituteIdChange}
          />
          <label htmlFor="userNIDs">User NIDs (comma-separated):</label>
          <Input
            type="text"
            id="userNIDs"
            value={userNIDs.join(",")}
            onChange={handleUserNIDsChange}
          />
          <label htmlFor="otp">OTP:</label>
          <Input type="text" id="otp" value={otp} onChange={handleOTPChange} />
          <Button onClick={handleVerifyOTP} disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify OTP"}
          </Button>
          {isError && <Error>Error verifying OTP</Error>}
        </Form>
      </Container>
    </>
  );
};

export default VerifyCustomer;
