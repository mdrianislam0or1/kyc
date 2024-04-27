/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useInstituteRegisterMutation } from "../../redux/features/auth/authApi";
import styled from "styled-components";
import NavigationBar from "../../components/layout/NavigationBar";

const FinancialInstituteRegister = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "ABC Bank",
    registrationNumber: "1234567890",
    email: "info@abcbank.com",
    password: "password123",
    role: "bank",
    fullName: "ABC Bank Limited",
    address: "123 Main St, City",
    contactNumber: "123-456-7890",
    website: "https://www.abcbank.com",
    financialLicense: "License123",
  });

  const [register] = useInstituteRegisterMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const toastId = toast.loading("Registering");
    try {
      const res = await register(formData).unwrap();
      toast.success("Registered successfully", { id: toastId, duration: 2000 });
      console.log(res);
      navigate(`/login`);
    } catch (error) {
      toast.error("Error registering");
    }
    setLoading(false);
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
          <FormGrid>
            <FormGroup>
              <Label htmlFor="name">Name:</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </FormGroup>

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
              <Label htmlFor="email">Email:</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
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

            <FormGroup>
              <Label htmlFor="fullName">Full Name:</Label>
              <Input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="address">Address:</Label>
              <Input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="contactNumber">Contact Number:</Label>
              <Input
                type="text"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="website">Website:</Label>
              <Input
                type="text"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="financialLicense">Financial License:</Label>
              <Input
                type="text"
                id="financialLicense"
                name="financialLicense"
                value={formData.financialLicense}
                onChange={handleChange}
              />
            </FormGroup>
          </FormGrid>

          <Button type="submit">Register</Button>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </Form>
      </FormContainer>
    </>
  );
};

export default FinancialInstituteRegister;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  width: 100%;
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
