/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAppDispatch } from "../../redux/hooks";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { verifyToken } from "../../utils/verifyToken";
import { setUser } from "../../redux/features/auth/authSlice";
import styled from "styled-components";
import NavigationBar from "../../components/layout/NavigationBar";

const LoginContainer = styled.div`
  margin: 0 auto;
  max-width: 480px;
  margin-top: 80px;
`;

const LoginForm = styled.form`
  max-width: 100%;
  margin-top: 16px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  &:focus {
    border-color: #1890ff;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 16px;
`;

const RegisterLink = styled.p`
  margin-top: 8px;
`;

const CustomerLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [nid, setNid] = useState("1111");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);

  const [login] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const userInfo = {
      nid,
      password,
    };

    const toastId = toast.loading("Logging in");
    try {
      const res = await login(userInfo).unwrap();
      const user: any = verifyToken(res.data.token);
      dispatch(setUser({ user, token: res.data.token }));

      console.log("Logged in", user);
      console.log("Logged in", res.data.token);
      toast.success("Logged in", { id: toastId, duration: 2000 });
      navigate(`/${user.role}/customer-profile`);
    } catch (error) {
      toast.error("Error logging in");
    }
    setLoading(false);
  };

  return (
    <>
      <NavigationBar />
      <LoginContainer>
        <LoginForm onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nid">nid:</label>
            <InputField
              type="text"
              id="nid"
              value={nid}
              onChange={(e) => setNid(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <InputField
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <StyledButton
            htmlType="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
            loading={loading}
          >
            Login
          </StyledButton>
          <RegisterLink>
            if you are not registered yet, please{" "}
            <Link to="/register">register</Link>
          </RegisterLink>
        </LoginForm>
      </LoginContainer>
    </>
  );
};

export default CustomerLogin;
