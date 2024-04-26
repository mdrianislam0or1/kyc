/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAppDispatch } from "../../redux/hooks";
import { useRegisterMutation } from "../../redux/features/auth/authApi";
import styled from "styled-components";
import NavigationBar from "../../components/layout/NavigationBar";

const CustomerRegistration = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "testuser11",
    nid: "11111",
    email: "test11@example.com",
    password: "password123",
    role: "user",
    fullName: "John Doe",
    dateOfBirth: "1990-05-15",
    nationality: "US",
    residentialAddress: "123 Main St, Anytown",
    contactNumber: "123-456-7890",
    identificationType: "Driver's License",
    identificationNumber: "DL123456789",
    issueDate: "2022-01-01",
    expirationDate: "2025-01-01",
    signature: "https://example.com/signature.jpg",
    photograph: "https://example.com/photo.jpg",
    occupation: "Software Developer",
    employer: "XYZ Corp",
    tin: "123456789",
    sourceOfFunds: "Employment",
    purposeOfAccount: "Savings",
  });

  const [register] = useRegisterMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const toastId = toast.loading("Registering");
    try {
      const res = await register(formData).unwrap();
      toast.success("Registered successfully", { id: toastId, duration: 2000 });
      console.log(res);
      navigate(`/login`); // Redirect to login page after successful registration
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
              <Label htmlFor="username">Username:</Label>
              <Input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="nid">nid:</Label>
              <Input
                type="text"
                id="nid"
                name="nid"
                value={formData.nid}
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
              <Label htmlFor="dateOfBirth">Date of Birth:</Label>
              <Input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="nationality">Nationality:</Label>
              <Input
                type="text"
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="residentialAddress">Residential Address:</Label>
              <Input
                type="text"
                id="residentialAddress"
                name="residentialAddress"
                value={formData.residentialAddress}
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
              <Label htmlFor="identificationType">Identification Type:</Label>
              <Input
                type="text"
                id="identificationType"
                name="identificationType"
                value={formData.identificationType}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="identificationNumber">
                Identification Number:
              </Label>
              <Input
                type="text"
                id="identificationNumber"
                name="identificationNumber"
                value={formData.identificationNumber}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="issueDate">Issue Date:</Label>
              <Input
                type="date"
                id="issueDate"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="expirationDate">Expiration Date:</Label>
              <Input
                type="date"
                id="expirationDate"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="signature">Signature:</Label>
              <Input
                type="text"
                id="signature"
                name="signature"
                value={formData.signature}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="photograph">Photograph:</Label>
              <Input
                type="text"
                id="photograph"
                name="photograph"
                value={formData.photograph}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="occupation">Occupation:</Label>
              <Input
                type="text"
                id="occupation"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="employer">Employer:</Label>
              <Input
                type="text"
                id="employer"
                name="employer"
                value={formData.employer}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="tin">TIN:</Label>
              <Input
                type="text"
                id="tin"
                name="tin"
                value={formData.tin}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="sourceOfFunds">Source of Funds:</Label>
              <Input
                type="text"
                id="sourceOfFunds"
                name="sourceOfFunds"
                value={formData.sourceOfFunds}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="purposeOfAccount">Purpose of Account:</Label>
              <Input
                type="text"
                id="purposeOfAccount"
                name="purposeOfAccount"
                value={formData.purposeOfAccount}
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

export default CustomerRegistration;

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

// const FormImage = styled.img`
//   width: 300px;
//   height: 300px;
//   object-fit: cover;
//   border-radius: 10px;
// `;
