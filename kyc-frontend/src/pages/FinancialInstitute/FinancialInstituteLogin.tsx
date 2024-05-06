/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useInstituteLoginMutation } from "../../redux/features/auth/authApi";
import styled from "styled-components";
import NavigationBar from "../../components/layout/NavigationBar";

const FinancialInstituteLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    registrationNumber: "1234567890",
    password: "password123",
  });

  const [login] = useInstituteLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const toastId = toast.loading("Logging in");
    try {
      const res = await login(formData).unwrap();
      toast.success("Logged in successfully", { id: toastId, duration: 2000 });
      console.log(res);
      // Redirect to dashboard or any other page after successful login
      navigate(`/institute/${res.institute._id}`);
    } catch (error) {
      toast.error("Error logging in");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <NavigationBar />
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="registrationNumber">Registration Number:</Label>
            <Input
              type="text"
              id="registrationNumber"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Password:</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </FormGroup>

          <Button type="submit">Login</Button>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </Form>
      </FormContainer>
    </>
  );
};

export default FinancialInstituteLogin;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form``;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #00224d;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
