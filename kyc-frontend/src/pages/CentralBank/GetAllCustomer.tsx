import { useEffect } from "react";
import { useGetCustomersQuery } from "../../redux/features/Customer/customerApi";
import Loader from "../../ui/Loader";
import GetAllCustomerCard from "../../components/card/GetAllCustomerCard";
import styled from "styled-components";
import NavigationBar from "../../components/layout/NavigationBar";

const GetAllCustomer = () => {
  const {
    data: customers,
    isLoading,
    isError,
    refetch,
  } = useGetCustomersQuery({});

  useEffect(() => {
    refetch();
  }, [refetch]);

  let content = null;

  if (isLoading) {
    content = <Loader />;
  }

  if (isLoading || !Array.isArray(customers?.data)) {
    content = <Loader />;
  }

  console.log(customers);
  if (!isLoading && !isError && customers?.data) {
    content = (
      <Container>
        <GetAllCustomerCard customers={customers.data} />
      </Container>
    );
  }

  return (
    <>
      <>
        <NavigationBar />
      </>
      {content}
    </>
  );
};

export default GetAllCustomer;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
