import { useEffect } from "react";
import styled from "styled-components";
import { useGetInstitutesQuery } from "../../redux/features/FNInstitute/instituteApi";
import Loader from "../../ui/Loader";
import GetAllFnInstituteCard from "../../components/card/GetAllFnInstituteCard";
import { TInstitute } from "../../redux/features/FNInstitute/instituteSlice";
import NavigationBar from "../../components/layout/NavigationBar";

const GetAllFinancialInstitute = () => {
  const {
    data: institutes,
    isLoading,
    isError,
    refetch,
  } = useGetInstitutesQuery({});

  useEffect(() => {
    refetch();
  }, [refetch]);

  let content = null;

  if (isLoading) {
    content = <Loader />;
  }

  if (isLoading || !Array.isArray(institutes?.data)) {
    content = <Loader />;
  }

  if (!isLoading && !isError && institutes?.data) {
    content = (
      <Container>
        {institutes.data.map((institute: TInstitute) => (
          <GetAllFnInstituteCard key={institute._id} institute={institute} />
        ))}
      </Container>
    );
  }

  return (
    <>
      <NavigationBar />
      <Wrapper>{content}</Wrapper>
    </>
  );
};

export default GetAllFinancialInstitute;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;
